import type { FilePart, ImagePart, TextPart, UserModelMessage } from 'ai';
import type * as Telegram from 'telegram-bot-api-types';
import type { ChatStreamTextHandler, HistoryModifier, ImageResult, LLMChatRequestParams } from '../../agent/types';
import type { WorkerContext } from '../../config/context';
import type { AgentUserConfig } from '../../config/env';
import type { ChosenInlineSender } from '../utils/send';
import type { UnionData } from '../utils/tg_utils';
import type { MessageHandler } from './types';
import { APICallError } from 'ai';
import { loadASRLLM, loadChatLLM, loadImageGen, loadTTSLLM, TTS_AGENTS } from '../../agent';
import { loadHistory, requestCompletionsFromLLM } from '../../agent/chat';
import { ENV } from '../../config/env';
import { clearLog, getLog, log } from '../../log';
import { imageToBase64String } from '../../utils/image';
import { convertAudio } from '../../utils/others/audio';
import { createTelegramBotAPI } from '../api';
import { escape, SEGMENTATION_MARK } from '../utils/md2tgmd';
import { validateMarkdownV2, markdownToHTML, stripFormatting } from '../utils/render_fallback';
import { MessageSender, sendAction, TelegraphSender } from '../utils/send';
import { getTelegramFile, isTelegramChatTypeGroup, waitUntil } from '../utils/tg_utils';
import { formatGroupCacheAsContext, loadGroupMessageCache } from './group';

/**
 * Get user identifier with fallback logic
 * Priority: username > full_name > first_name
 * Also includes user ID for better identification
 */
function getUserIdentifier(user?: Telegram.User): string | null {
    if (!user) {
        return null;
    }
    let identifier = '';

    // Priority 1: username with @ prefix
    if (user.username) {
        identifier = `@${user.username}`;
    }
    // Priority 2: full name (first_name + last_name)
    else if (user.last_name) {
        identifier = `${user.first_name} ${user.last_name}`;
    }
    // Priority 3: first_name only
    else {
        identifier = user.first_name;
    }

    // Always append user ID in parentheses for unique identification
    return `${identifier} (ID:${user.id})`;
}

async function messageInitialize(sender: MessageSender, context?: WorkerContext, message?: Telegram.Message): Promise<ChatStreamTextHandler> {
    setTimeout(() => sendAction(sender.api.token, sender.context.chat_id, 'typing'), 0);
    log.info(`send init message`);
    const streamSender = OnStreamHander(sender, context, message?.text || message?.caption || '');
    streamSender.send('...');
    return streamSender;
}

export async function chatWithLLM(
    message: Telegram.Message,
    params: LLMChatRequestParams | null,
    context: WorkerContext,
    modifier: HistoryModifier | null,
    sender?: ChatStreamTextHandler,
    isMiddle?: boolean,
): Promise<Response | string> {
    const streamSender = sender ?? OnStreamHander(MessageSender.from(context.SHARE_CONTEXT.botToken, message), context, message?.text || message?.caption || '');
    try {
        const agent = loadChatLLM(context.USER_CONFIG);
        log.info(`start chat with LLM`);
        const answer = await requestCompletionsFromLLM(params, context, agent, modifier, ENV.STREAM_MODE && !isMiddle ? streamSender : null);
        log.info(`chat with LLM done`);

        if (isMiddle) {
            return answer.content;
        }
        return streamSender.end!(answer.content);
    } catch (e) {
        log.error((e as Error).message, (e as Error).stack);
        if (APICallError.isInstance(e)) {
            log.error(e.responseBody);
        }
        let errMsg = '';
        if ((e as Error).name === 'AbortError') {
            errMsg += 'Chat with LLM timeout';
        } else {
            errMsg += (e as Error).message;
            if (e instanceof APICallError && e.responseBody && errMsg === '') {
                log.error(`error detail: ${e.responseBody}`);
                errMsg += `\n\n${e.responseBody}`;
            }
        }
        errMsg = errMsg.trim().replace(context.SHARE_CONTEXT.botToken, '[REDACTED]').substring(0, 2048);
        return streamSender.end!(`\`\`\`Error\n${errMsg}\n\`\`\``, false, 'error');
    }
}

export function findPhotoFileID(photos: Telegram.PhotoSize[], offset: number): string {
    let sizeIndex = offset >= 0 ? offset : photos.length + offset;
    sizeIndex = Math.max(0, Math.min(sizeIndex, photos.length - 1));
    return photos[sizeIndex].file_id;
}

export class ChatHandler implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
        const streamSender = await messageInitialize(sender, context, message);
        try {
            log.info(`message type: ${context.MIDDLE_CONTEXT.messageInfo.type}`);
            await this.initializeHistory(context, message);

            // 处理原始消息
            const params = await this.processOriginalMessage(message, context);
            // 执行工作流
            await workflow(context, message, params, streamSender);
            return null;
        } catch (e) {
            streamSender.clearHeartbeat!();
            const sender = streamSender.sender as MessageSender;
            log.error((e as Error).stack);
            if ((e as Error).message.includes('524')) {
                return sender.sendRichText(`\`\`\`Error\nMaybe occur 524 error, see logs for more details.\n\`\`\``, undefined, 'tip');
            }
            const errMsg = (e as Error).message.replaceAll(context.SHARE_CONTEXT.botToken, '[REDACTED]').substring(0, 2048);
            return sender.sendRichText(`\`\`\`Error\n${errMsg}\n\`\`\``, undefined, 'tip');
        }
    };

    private async initializeHistory(context: WorkerContext, message: Telegram.Message): Promise<void> {
        // 初始化历史消息
        const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
        if (!historyKey) {
            throw new Error('History key not found');
        }
        if (ENV.STORE_HISTORY_LENGTH > 0) {
            context.MIDDLE_CONTEXT.history = await loadHistory(historyKey, ENV.STORE_HISTORY_LENGTH);
        }

        // 如果启用了群组消息监听模式，且当前在群组中，加载群组消息缓存
        // 注意：这里只加载缓存，不注入到 history，避免被 trimer 裁剪掉
        // 实际注入会在 requestCompletionsFromLLM 的 trimer 之后进行
        if (ENV.GROUP_MESSAGE_LISTEN_MODE && isTelegramChatTypeGroup(message.chat.type)) {
            const chatId = message.chat.id;
            const cachedMessages = await loadGroupMessageCache(chatId);

            if (cachedMessages.length > 0) {
                // 将缓存的群组消息格式化并保存到 context 中
                const groupContext = formatGroupCacheAsContext(cachedMessages);
                // 使用 MIDDLE_CONTEXT 保存群组缓存，稍后在发送给 LLM 前注入
                (context.MIDDLE_CONTEXT as any).groupChatCache = groupContext;
                log.info(`[GROUP CACHE] Loaded ${cachedMessages.length} cached messages, will inject after history trimming`);
            }
        }
    }

    private async processOriginalMessage(
        message: Telegram.Message,
        context: WorkerContext,
    ): Promise<LLMChatRequestParams> {
        const { type, id } = context.MIDDLE_CONTEXT.messageInfo;
        let messageText = message.text || message.caption || '';

        // Get user identifier for group chats
        // Skip if GROUP_MESSAGE_LISTEN_MODE is active (user info already in cache context)
        let userPrefix = '';
        if (ENV.GROUP_INCLUDE_USERNAME && !ENV.GROUP_MESSAGE_LISTEN_MODE && isTelegramChatTypeGroup(message.chat.type)) {
            const userIdentifier = getUserIdentifier(message.from);
            if (userIdentifier) {
                userPrefix = `${userIdentifier}: `;
                if (messageText) {
                    messageText = userPrefix + messageText;
                }
            }
        }

        const params: LLMChatRequestParams = {
            role: 'user',
            content: messageText,
        };

        if (!id)
            return params;

        const urls = await getTelegramFile(id, context.SHARE_CONTEXT.botToken, 'url') as string[];
        if (urls.length === 0)
            return params;

        params.content = [];
        if (message.text || message.caption) {
            params.content.push({
                type: 'text',
                text: messageText,
            });
        } else {
            // For media without caption, generate descriptive text
            let defaultText = '';
            if (type === 'sticker') {
                defaultText = 'User sent a sticker to respond to you';
            } else if (['audio', 'voice'].includes(type)) {
                defaultText = context.USER_CONFIG.AUDIO_PROMPT;
            } else {
                defaultText = `Please explain the ${type}`;
            }

            // Add user identifier prefix if in group chat
            if (userPrefix) {
                defaultText = userPrefix + defaultText;
            }

            params.content.push({
                type: 'text',
                text: defaultText,
            });
        }

        return fileUrlToBase64Message({
            urls,
            type,
            params,
            text: messageText,
            AUDIO_HANDLE_TYPE: context.USER_CONFIG.AUDIO_HANDLE_TYPE,
        });
    }
}

export function OnStreamHander(sender: MessageSender | ChosenInlineSender, context?: WorkerContext, question?: string): ChatStreamTextHandler {
    let sentPromise = null as Promise<Response | undefined> | null;
    let nextEnableTime: number | null = null;
    const isMessageSender = sender instanceof MessageSender;
    const sendInterval = isMessageSender ? ENV.TELEGRAM_MIN_STREAM_INTERVAL : ENV.INLINE_QUERY_SEND_INTERVAL;
    const isSendTelegraph = (text: string) => {
        return isMessageSender
            ? ENV.TELEGRAPH_SCOPE.includes(sender.context.chatType) && ENV.TELEGRAPH_NUM_LIMIT > 0 && text.length > ENV.TELEGRAPH_NUM_LIMIT
            : sender.context.inline_message_id && text.length > 4096;
    };

    const isSendDocument = (text: string) => {
        return ENV.FILE_SIZE_LIMIT > 0 && ENV.QUOTE_EXPANDABLE && text.length > ENV.ADD_QUOTE_LIMIT && text.length > ENV.FILE_SIZE_LIMIT;
    };
    const addQuotePrerequisites = ENV.ADD_QUOTE_LIMIT > 0 && ENV.ADD_QUOTE_SCOPE.includes(sender.context.chatType);
    const expandParams = { addQuote: false, quoteExpandable: ENV.QUOTE_EXPANDABLE };
    const botName = context?.SHARE_CONTEXT?.botName || 'AI';
    const telegraphAccessTokenKey = context?.SHARE_CONTEXT?.telegraphAccessTokenKey || '';
    const telegraphSender = new TelegraphSender(botName, telegraphAccessTokenKey);
    let hasSentTelegraphLink = false;
    let isSendDocumentTip = false;
    const telegraphContext = (isEnd: boolean, containRaw: boolean) => {
        return {
            context: context!,
            textSender: sender,
            telegraphSender,
            hasSentTelegraphLink,
            isEnd,
            containRaw,
        };
    };

    const immediatePromise = Promise.resolve('[PROMISE DONE]');

    let cache = '';
    let heartWaitedTime = 0;
    let heartbeatId: NodeJS.Timeout;
    const HEARTBEAT_INTERVAL = 10_000;

    const streamSender = {
        send: null as ((text: string, type?: 'chat' | 'error' | 'heartbeat') => Promise<any>) | null,
        end: null as ((text: string, needLog?: boolean, type?: 'chat' | 'error' | 'heartbeat') => Promise<any>) | null,
        sender,
        clearHeartbeat: () => {
            heartbeatId && clearInterval(heartbeatId);
        },
    };

    const updateHeartbeat = () => {
        heartbeatId && clearInterval(heartbeatId);
        heartbeatId = setInterval(async () => {
            heartWaitedTime += HEARTBEAT_INTERVAL / 1000;
            await sentPromise;
            sentPromise = streamSender.send!(`${cache}\n\nwaited for ${heartWaitedTime}s`, 'heartbeat');
        }, HEARTBEAT_INTERVAL);
    };

    streamSender.send = async (text: string, type = 'chat'): Promise<any> => {
        try {
            if (type === 'chat') {
                cache = text;
                heartWaitedTime = 0;
                updateHeartbeat();
            }
            // 判断是否需要等待
            if ((nextEnableTime || 0) > Date.now()) {
                log.info(`Need await: ${(nextEnableTime || 0) - Date.now()}ms`);
                return;
            }
            // 未完成不发送
            if (sentPromise && (await Promise.race([sentPromise, immediatePromise]) === '[PROMISE DONE]')) {
                return;
            }

            // 设置最小流间隔
            if (sendInterval > 0 && type === 'chat') {
                nextEnableTime = Date.now() + sendInterval;
            }

            if (isSendDocument(text)) {
                if (isSendDocumentTip) {
                    return;
                }
                isSendDocumentTip = true;
                text += '\n\n**Hold on, answer will be sent as a document.**';
            }

            if (isSendTelegraph(text)) {
                sentPromise = sendTelegraph(telegraphContext(false, false), question || 'Redo Question', text);
                hasSentTelegraphLink = true;
                return;
            }

            const data = mergeLogMessages(text, context?.USER_CONFIG);
            expandParams.addQuote = addQuotePrerequisites && data.length > ENV.ADD_QUOTE_LIMIT;

            // Validate MarkdownV2 format and log warnings
            const validation = validateMarkdownV2(data);
            if (!validation.valid) {
                log.warn('[Render] MarkdownV2 validation issues detected:', validation.issues.join(', '));
            }

            log.info(`sent message ids: ${isMessageSender ? sender.context.sentMessageIds : sender.context.inline_message_id}`);
            isMessageSender && sendAction(sender.api.token, sender.context.chat_id, 'typing');
            sentPromise = sender.sendRichText(data, undefined, 'chat', expandParams);
            const resp = await sentPromise as Response;
            // 判断429
            if (resp.status === 429) {
                // 获取重试时间
                const retryAfter = Number.parseInt(resp.headers.get('Retry-After') || '');
                if (retryAfter) {
                    nextEnableTime = Date.now() + retryAfter * 1000;
                    log.error(`Status 429, need wait: ${nextEnableTime - Date.now()}ms`);
                    return;
                }
            }

            if (!resp.ok) {
                log.error(`send message failed: ${resp.status} ${await resp.json().then(j => j.description)}`);
                // Clear sentMessageIds on render error to prevent future messages from trying to edit failed messages
                if (isMessageSender) {
                    (sender as MessageSender).context.sentMessageIds.length = 0;
                }
                // return sentPromise = sender.sendPlainText(text, 'chat');
            }
        } catch (e) {
            log.error((e as Error).stack);
        }
    };

    streamSender.end = async (text: string, needLog = true, type = 'chat'): Promise<any> => {
        log.info('--- start end ---');
        streamSender.clearHeartbeat();
        await sentPromise;
        if ((nextEnableTime || 0) > Date.now()) {
            log.info(`Need await: ${(nextEnableTime || 0) - Date.now()}ms`);
            await waitUntil(nextEnableTime! + 10);
        }
        if (type === 'error') {
            // Add separator to prevent blockquote from interfering with code block
            // Use a zero-width space or explicit separator to break blockquote context
            text = `${cache}\n\n${SEGMENTATION_MARK}\n\n${text}`;
        }
        if (isSendDocument(text)) {
            return sendDocument(sender as MessageSender, { question: question || 'Redo Question', answer: text, log: getLog(context?.USER_CONFIG || {} as AgentUserConfig, { onlyModel: false, isParagraph: true }) });
        }
        if (isSendTelegraph(text)) {
            return sendTelegraph(telegraphContext(true, false), question || 'Redo Question', text);
        }
        const data = context && needLog ? mergeLogMessages(text, context.USER_CONFIG) : text;
        log.info(`sent message ids: ${isMessageSender ? sender.context.sentMessageIds : sender.context.inline_message_id}`);
        expandParams.addQuote = addQuotePrerequisites && data.length > ENV.ADD_QUOTE_LIMIT;
        let maxFetchFailedTimes = 3;
        while (true) {
            try {
                const finalResp = await sender.sendRichText(data, undefined, 'chat', expandParams);
                if (finalResp.status === 429) {
                    const retryAfter = Number.parseInt(finalResp.headers.get('Retry-After') || '') ?? 10;
                    log.error(`Status 429, need wait: ${retryAfter}s`);
                    await waitUntil(Date.now() + retryAfter * 1000 + 10);
                    continue;
                }
                if (!finalResp.ok) {
                    (sender as MessageSender).context.sentMessageIds.length = 0;
                    const errorData = await finalResp.json();
                    const errorDesc = errorData.description || '';
                    log.error(`send message failed: ${finalResp.status} ${errorDesc}`);

                    // Try fallback strategies before Telegraph
                    if (errorDesc.includes('parse') || errorDesc.includes('entities') || errorDesc.includes('markdown')) {
                        log.info('[Render] Attempting HTML fallback...');
                        try {
                            const htmlText = markdownToHTML(data);
                            const htmlResp = await sender.sendRichText(htmlText, 'HTML', 'chat', expandParams);
                            if (htmlResp.ok) {
                                log.info('[Render] HTML fallback succeeded');
                                return htmlResp;
                            }
                        } catch (htmlError) {
                            log.warn('[Render] HTML fallback failed:', (htmlError as Error).message);
                        }

                        log.info('[Render] Attempting plain text fallback...');
                        try {
                            const plainText = stripFormatting(data);
                            const plainResp = await sender.sendRichText(plainText, undefined, 'chat', { ...expandParams, addQuote: false });
                            if (plainResp.ok) {
                                log.info('[Render] Plain text fallback succeeded');
                                return plainResp;
                            }
                        } catch (plainError) {
                            log.warn('[Render] Plain text fallback failed:', (plainError as Error).message);
                        }
                    }

                    // All fallbacks failed, use Telegraph
                    await sendTelegraph(telegraphContext(true, true), question || 'Redo Question', text);
                    return;
                }
                return finalResp;
            } catch (e) {
                log.error((e as Error).stack);
                if (e instanceof TypeError && e.message.includes('fetch failed')) {
                    maxFetchFailedTimes--;
                    if (maxFetchFailedTimes <= 0) {
                        throw e;
                    }
                    continue;
                }
                throw e;
            }
        }
    };

    return streamSender as unknown as ChatStreamTextHandler;
}

async function sendTelegraph(sendContext: {
    context: WorkerContext;
    textSender: MessageSender | ChosenInlineSender;
    telegraphSender: TelegraphSender;
    hasSentTelegraphLink?: boolean;
    isEnd?: boolean;
    containRaw?: boolean;
}, question: string, text: string) {
    log.info(`start send telegraph`);
    const { context, textSender, telegraphSender, hasSentTelegraphLink, isEnd, containRaw } = sendContext;
    let trimedQuestion = question;
    if (question.length > 600) {
        trimedQuestion = `${question.slice(0, 300)}...${question.slice(-300)}`;
    }
    const prefix = `#Question\n\`\`\`\n${trimedQuestion}\n\`\`\`\n---`;

    const telegraph_prefix = `${prefix}\n#Answer\n🤖 **${getLog(context.USER_CONFIG, { onlyModel: true, isParagraph: true })}**\n`;
    const debug_info = `${getLog(context.USER_CONFIG, { onlyModel: false, isParagraph: true })}`;
    const telegraph_suffix = `\n---\n\`\`\`\n${debug_info}\n\`\`\``;
    const textLength = (telegraph_prefix + text + telegraph_suffix).length;
    try {
        if (textLength >= 10917 * 6) {
            throw new Error('Telegraph message too long');
        }
        const resp = await telegraphSender.send(
            'Daily Q&A',
            telegraph_prefix + text + telegraph_suffix,
            containRaw ? text : undefined,
        );

        if (!hasSentTelegraphLink) {
            const url = `https://telegra.ph/${telegraphSender.teleph_path}`;
            const msg = `${containRaw ? '由于渲染出现错误 ' : ''}回答已经转换成文章。\n[🔗点击进行查看](${url})`.trim();
            log.info(`send telegraph message: ${msg}`);
            return textSender.sendRichText(msg);
        }
        return resp;
    } catch (error) {
        if (isEnd) {
            return sendDocument(textSender as MessageSender, { question, answer: text, log: debug_info });
        }
    }
}
interface DocumentText {
    question: string;
    answer: string;
    log: string;
}

async function sendDocument(textSender: MessageSender, document: DocumentText) {
    const { question, answer, log } = document;
    const text = `🆀 ${question}\n🅻 ${log}\n\n🅰${answer}\n`;
    const file = new File([text], 'answer.md', { type: 'text/markdown' });
    return textSender.sendDocument(file, '>`Answer is cooked, check the document`', 'MarkdownV2');
}

type WorkflowHandler = (
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
    streamSender: ChatStreamTextHandler,
    handleKey: string,
) => Promise<Response | Blob | string>;

function workflowHandlers(type: string): WorkflowHandler {
    switch (type) {
        case 'text:image':
            return handleTextToImage;
        case 'audio:audio':
        case 'audio:text':
        case 'stt:text':
        case 'stt:audio':
            return handleAudio;
        default:
            return handleText;
    }
}

async function workflow(
    context: WorkerContext,
    message: Telegram.Message,
    params: LLMChatRequestParams,
    streamSender: ChatStreamTextHandler,
): Promise<Response | Blob | string> {
    const msgType = context.MIDDLE_CONTEXT.messageInfo.type;
    let handlerKey = `${msgType}:`;
    if (msgType === 'text') {
        handlerKey = `${context.USER_CONFIG.TEXT_HANDLE_TYPE}:${context.USER_CONFIG.TEXT_OUTPUT}`;
    } else if (msgType === 'audio' || msgType === 'voice') {
        handlerKey = `${context.USER_CONFIG.AUDIO_HANDLE_TYPE}:${context.USER_CONFIG.AUDIO_OUTPUT}`;
    } else {
        handlerKey += 'text';
    }
    if ((!['audio', 'stt', 'chat'].includes(context.USER_CONFIG.AUDIO_HANDLE_TYPE)) && ['audio', 'voice'].includes(msgType)) {
        handlerKey = 'stt:text';
    } else if ((!['tts', 'text', 'chat'].includes(context.USER_CONFIG.TEXT_HANDLE_TYPE)) && msgType === 'text') {
        handlerKey = 'text:text';
    }
    const handler = workflowHandlers(handlerKey);
    return handler(message, params, context, streamSender, handlerKey);
}

async function handleText(
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
    streamSender: ChatStreamTextHandler,
    handleKey: string,
): Promise<Response | string> {
    switch (handleKey) {
        case 'tts:audio':
        case 'tts:text':
        case 'text:audio':
            return handleTextToAudio(message, params, context, streamSender, handleKey);
        default:
            return chatWithLLM(message, params, context, null, streamSender);
    }
}

async function handleTextToImage(
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
    streamSender: ChatStreamTextHandler,
    handleKey: string,
): Promise<Response> {
    streamSender.clearHeartbeat!();
    const agent = loadImageGen(context.USER_CONFIG);
    const sender = streamSender.sender!;
    if (!agent) {
        return sender.sendPlainText('ERROR: Image generator not found');
    }
    sendAction(context.SHARE_CONTEXT.botToken, message.chat.id);
    await sender.sendPlainText('Please wait a moment...', 'tip').then(r => r.json());
    const result = await agent.request(message.text || message.caption || '', context.USER_CONFIG);
    log.info('imageresult', JSON.stringify(result));
    await sendImages(result, ENV.SEND_IMAGE_AS_FILE, sender, context.USER_CONFIG);
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    return api.deleteMessage({ chat_id: sender.context.chat_id, message_id: sender.context.message_id! });
}

async function handleAudio(
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
    streamSender: ChatStreamTextHandler,
    handleKey: string,
): Promise<Response | string> {
    const url = (params.content as FilePart[]).at(-1)?.data as string;
    const audio = await fetch(url).then(b => b.blob());
    const text = await asr(audio, context.USER_CONFIG);
    context.MIDDLE_CONTEXT.history.push({ role: 'user', content: text });
    const sender = streamSender.sender!;
    if (handleKey.endsWith('text') || !ENV.HIDE_MIDDLE_MESSAGE) {
        await streamSender.end!(mergeLogMessages(text, context.USER_CONFIG));
    }
    if (handleKey.startsWith('stt')) {
        streamSender.clearHeartbeat!();
        return new Response('audio handle done');
    }
    clearLog(context.USER_CONFIG);
    !ENV.HIDE_MIDDLE_MESSAGE && (sender.context.sentMessageIds = []);
    const isMiddle = handleKey === 'audio:audio';
    const otherText = (params.content as TextPart[]).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    const resp = await chatWithLLM(message, { role: 'user', content: `[AUDIO TRANSCRIPTION]: ${text}\n${otherText}` }, context, null, streamSender, isMiddle);
    streamSender.clearHeartbeat!();
    if (isMiddle) {
        const audio = await tts(resp as unknown as string, context.USER_CONFIG);
        console.log(`audio size: ${(audio.size / 1024 / 1024).toFixed(3)}mb`);
        ENV.HIDE_MIDDLE_MESSAGE && sender.api.deleteMessage({ chat_id: sender.context.chat_id, message_id: sender.context.message_id! });
        sendAction(context.SHARE_CONTEXT.botToken, sender.context.chat_id, 'upload_voice');
        return sender.sendVoice(audio);
    }
    return resp;
}

async function handleTextToAudio(
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
    streamSender: ChatStreamTextHandler,
    handleKey: string,
): Promise<Response> {
    let text = params.content as string;
    const sender = streamSender.sender!;
    if (handleKey === 'text:audio') {
        !ENV.HIDE_MIDDLE_MESSAGE && streamSender.send('Chat with LLM in progress');
        text = await chatWithLLM(message, params, context, null, streamSender, true) as string;
        !ENV.HIDE_MIDDLE_MESSAGE && streamSender.send('Chat with LLM done');
    }
    const audio = await tts(text, context.USER_CONFIG);
    console.log(`audio size: ${(audio.size / 1024 / 1024).toFixed(3)}mb`);
    sendAction(context.SHARE_CONTEXT.botToken, sender.context.chat_id, 'upload_voice');
    const resp = await sender.sendVoice(audio, context.USER_CONFIG.AUDIO_CONTAINS_TEXT ? text : undefined);
    streamSender.clearHeartbeat!();
    if (resp.ok) {
        return sender.api.deleteMessage({ chat_id: sender.context.chat_id, message_id: sender.context.message_id! });
    }
    // log.error(`Failed to send voice message: ${resp.status} ${await resp.text()}`);
    throw new Error(`Failed to send voice message: ${resp.status} ${await resp.json().then(j => j.description)}`);
}

export async function sendImages(img: ImageResult, sendAsFile: boolean, sender: MessageSender, config: AgentUserConfig) {
    if (img.url?.length === 0 && img.raw?.length === 0) {
        return sender.sendPlainText('ERROR: No image found');
    }

    const caption = img.caption?.map(t => t?.slice(0, 800)?.trim()) || [img.text?.slice(0, 800) || ''];
    if ((img.url?.length === 1 || img.raw?.length === 1) && sender.context.message_id) {
        return sender.editMessageMedia({
            type: sendAsFile ? 'document' : 'photo',
            media: img.url?.[0] || '',
            caption: escape(mergeLogMessages(caption[0], config), { quoteExpandable: true, addQuote: true }),
        }, ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode, img.raw?.[0] && new File([img.raw[0]], 'image.png', { type: 'image/png' }));
    }
    const medias = (img.url || img.raw)!.map((media: string | Blob, index: number) => ({
        type: sendAsFile ? 'document' : 'photo',
        media: typeof media === 'string' ? media : '',
        caption: caption[index] && escape(caption[index], { quoteExpandable: true, addQuote: true }),
        parse_mode: ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode,
    })) as Telegram.InputMedia[];

    if (img.raw && img.raw.length > 0) {
        const files = img.raw.map((_, i) => new File([img.raw![i]], 'image.png', { type: 'image/png' }));
        return sender.sendMediaGroup(medias, files);
    }
    return sender.sendMediaGroup(medias);
}

function injectHistory(context: WorkerContext, result: UnionData, nextType: string = 'text') {
    if (context.MIDDLE_CONTEXT.history.at(-1)?.role === 'user' || nextType !== 'text')
        return;
    context.MIDDLE_CONTEXT.history.push({ role: 'user', content: result.text || '', ...(result.url && result.url.length > 0 && { images: result.url }) });
}

export async function tts(text: string, config: AgentUserConfig): Promise<Blob> {
    const agent = loadTTSLLM(config);
    if (!agent) {
        throw new Error(`TTS agent ${config.AI_TTS_PROVIDER} not found, available: ${TTS_AGENTS.map(a => a.name).join(', ')}`);
    }
    return agent.request(text, config);
}

async function asr(audio: Blob, config: AgentUserConfig) {
    const agent = loadASRLLM(config);
    if (!agent) {
        throw new Error('ASR agent not found');
    }
    if (agent.name === 'oailike') {
        const start = Date.now();
        audio = await convertAudio({ file: audio, target: 'blob' }) as Blob;
        log.info(`transform audio time: ${((Date.now() - start) / 1000).toFixed(2)}s`);
    }
    return agent.request(audio, config);
}

function mergeLogMessages(text: string, config: AgentUserConfig | undefined): string {
    if (ENV.LOG_POSITION_ON_TOP) {
        return `${config ? getLog(config) : ''}\n${SEGMENTATION_MARK}\n${text.trim()}`;
    }
    return `${text.trim()}\n${SEGMENTATION_MARK}\n${config ? getLog(config) : ''}`;
}

// MIME type mapping for common file extensions
const MIME_TYPE_MAP: Record<string, string> = {
    // Video
    mp4: 'video/mp4',
    webm: 'video/webm',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    aac: 'audio/aac',
    flac: 'audio/flac',
    // Image
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
};

function getMediaType(url: string, defaultType: string): string {
    const urlWithoutQuery = url.split('?')[0];
    const extension = urlWithoutQuery.split('.').pop()?.toLowerCase() || '';
    const mimeType = MIME_TYPE_MAP[extension] || `${defaultType}/${extension}`;
    log.info(`[getMediaType] url: ${url}, extension: ${extension}, mimeType: ${mimeType}`);
    return mimeType;
}

// v5: Breaking change in file type extraction logic.
// Manual download and explicit MIME type specification are now required.
export async function fileUrlToBase64Message({ urls, type, params, AUDIO_HANDLE_TYPE = 'chat', text }: { urls: string[]; type: string; params: UserModelMessage; AUDIO_HANDLE_TYPE: string; text: string }): Promise<any> {
    async function urlToBase64Message(type = 'image') {
        log.info(`[urlToBase64Message] type: ${type}, urls: ${JSON.stringify(urls)}`);
        const responses = await Promise.all(urls.map(url => fetch(url))).then(r => r.filter(r => r.ok));
        const mediaTypes = urls.map(url => getMediaType(url, type));
        log.info(`[urlToBase64Message] mediaTypes: ${JSON.stringify(mediaTypes)}`);
        let files: string[] = [];
        if (!responses.length) {
            throw new Error('Failed to fetch file data');
        }
        if (type === 'image') {
            const imageData = await Promise.all(urls.map(url => imageToBase64String(url)));
            imageData.forEach(({ data, format }, i) => {
                mediaTypes[i] = format;
                files[i] = data;
            });
        }
        if (type === 'audio') {
            files = await Promise.all(responses.map(r => convertAudio({ file: r, target: 'base64' }))) as string[];
        }
        if (type === 'video') {
            files = await Promise.all(responses.map(r => r.arrayBuffer().then(buffer => Buffer.from(buffer).toString('base64'))));
        }
        return files.map((f, i) => ({
            type: type === 'image' || type === 'photo' ? 'image' : 'file',
            [type === 'image' ? 'image' : 'data']: f,
            mediaType: mediaTypes[i],
        })) as unknown as (FilePart | ImagePart)[];
    }
    switch (type) {
        case 'image':
        case 'photo':
        case 'sticker':
        {
            const isUrl = ENV.TELEGRAM_IMAGE_TRANSFER_MODE === 'url';
            if (isUrl) {
                // 为每个 URL 检测其格式
                (params.content as any[]).push(...urls.map((url) => {
                    const format = url.split('?')[0].split('.').pop()?.toLowerCase();
                    const type = format === 'webm' ? 'file' : 'image';
                    const mediaTypePrefix = format === 'webm' ? 'video' : 'image';
                    return { type, [format === 'webm' ? 'data' : 'image']: url, mediaType: getMediaType(url, mediaTypePrefix) } as unknown as FilePart | ImagePart;
                }));
            } else {
                // base64 模式：为每个 URL 检测格式并转换
                const images = await Promise.all(urls.map(async (url) => {
                    const format = url.split('?')[0].split('.').pop()?.toLowerCase();
                    const mediaTypePrefix = format === 'webm' ? 'video' : 'image';
                    const parts = await urlToBase64Message(mediaTypePrefix);
                    return parts;
                }));
                (params.content as any[]).push(...images.flat());
            }
            break;
        }
        case 'video':
        case 'audio':
        case 'voice':
        {
            const t = type === 'video' ? 'video' : 'audio';
            const isChat = AUDIO_HANDLE_TYPE === 'chat';
            if (isChat || type === 'video') {
                const files = await urlToBase64Message(t);
                (params.content as any[]).push(...files);
            } else {
                const mediaTypes = urls.map(url => getMediaType(url, t));
                (params.content as any[]).push(...urls.map((audio, i) => ({
                    type: 'file' as const,
                    data: audio,
                    mediaType: mediaTypes[i],
                })));
            }
            break;
        }
        case 'text':
        {
            const fileText = await Promise.all(urls.map(url => fetch(url).then(r => r.text()))).then(t => t.join('\n'));
            params.content = [
                {
                    type: 'text',
                    text: `${text}\n${fileText}`.trim(),
                },
            ];
            break;
        }
    }
    return params;
}
