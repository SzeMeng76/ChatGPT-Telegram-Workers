/* eslint-disable unused-imports/no-unused-vars */
import type * as Telegram from 'telegram-bot-api-types';
import type { ChatStreamTextHandler, HistoryModifier, ImageResult, LLMChatRequestParams } from '../../agent/types';
import type { WorkerContext } from '../../config/context';
import type { AgentUserConfig } from '../../config/env';
import type { ChosenInlineSender } from '../utils/send';
import type { UnionData } from '../utils/utils';
import type { MessageHandler } from './types';
import { APICallError, type FilePart, type TextPart, type ToolResultPart } from 'ai';
import { loadASRLLM, loadChatLLM, loadImageGen, loadTTSLLM } from '../../agent';
import { loadHistory, requestCompletionsFromLLM } from '../../agent/chat';
import { ENV } from '../../config/env';
import { clearLog, getLog } from '../../log/logDecortor';
import { log } from '../../log/logger';
import { sendToolResult } from '../../tools';
import { imageToBase64String } from '../../utils/image';
import { convertOgaToMp3 } from '../../utils/others/audio';
import { createTelegramBotAPI } from '../api';
import { escape } from '../utils/md2tgmd';
import { MessageSender, sendAction, TelegraphSender } from '../utils/send';
import { waitUntil } from '../utils/utils';

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
    const agent = loadChatLLM(context.USER_CONFIG);
    const streamSender = sender ?? OnStreamHander(MessageSender.from(context.SHARE_CONTEXT.botToken, message), context, message?.text || message?.caption || '');
    if (!agent) {
        return streamSender.end!('LLM is not enabled', false);
    }

    try {
        log.info(`start chat with LLM`);
        const answer = await requestCompletionsFromLLM(params, context, agent, modifier, ENV.STREAM_MODE && !isMiddle ? streamSender : null);
        log.info(`chat with LLM done`);
        if (answer.messages.at(-1)?.role === 'tool') {
            await sendToolResult(answer.messages.at(-1)?.content as ToolResultPart[], streamSender.sender!, context.USER_CONFIG);
            return new Response('Success');
        }

        if (isMiddle) {
            return answer.content;
        }
        return streamSender.end!(answer.content);
    } catch (e) {
        log.error((e as Error).message, (e as Error).stack);
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
        return streamSender.end!(`\`\`\`Error\n${errMsg}\n\`\`\``, false);
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
            await this.initializeHistory(context);

            // 处理原始消息
            const params = await this.processOriginalMessage(message, context);
            // 执行工作流
            await workflow(context, message, params, streamSender);
            return null;
        } catch (e) {
            log.error((e as Error).stack);
            const errMsg = (e as Error).message.replace(context.SHARE_CONTEXT.botToken, '[REDACTED]').substring(0, 2048);
            return streamSender.end!(`\`\`\`Error\n${errMsg}\n\`\`\``, false);
        }
    };

    private async initializeHistory(context: WorkerContext): Promise<void> {
        // 初始化历史消息
        const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
        if (!historyKey) {
            throw new Error('History key not found');
        }
        const length = context.USER_CONFIG.MAX_HISTORY_LENGTH;
        if (length > 0) {
            context.MIDDLE_CONTEXT.history = await loadHistory(historyKey, length);
        }
    }

    private async processOriginalMessage(
        message: Telegram.Message,
        context: WorkerContext,
    ): Promise<LLMChatRequestParams> {
        const { type, id } = context.MIDDLE_CONTEXT.messageInfo;
        const params: LLMChatRequestParams = {
            role: 'user',
            content: message.text || message.caption || '',
        };

        if (id) {
            const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
            const files = await Promise.all(id.map(i => api.getFileWithReturns({ file_id: i })));
            const paths = files.map(f => f.result?.file_path).filter(Boolean) as string[];
            if (paths.length === 0) {
                throw new Error(files.map(f => (f as any).description).join('\n'));
            }
            const urls = paths.map(p => `https://api.telegram.org/file/bot${context.SHARE_CONTEXT.botToken}/${p}`);
            log.info(`File URLs:\n${urls.join('\n')}`);
            if (urls.length > 0) {
                params.content = [];
                if (message.text || message.caption) {
                    params.content.push({
                        type: 'text',
                        text: message.text || message.caption || '',
                    });
                } else {
                    params.content.push({
                        type: 'text',
                        text: type === 'sticker' ? 'User sent a sticker to respond to you' : `Please explain the ${type}`,
                    });
                }
                switch (type) {
                    case 'image':
                    case 'photo':
                    {
                        const isUrl = ENV.TELEGRAM_IMAGE_TRANSFER_MODE === 'url';
                        for (const url of urls) {
                            const { data, format } = isUrl ? { data: url, format: `image/${url.split('.').pop()}` } : await imageToBase64String(url);
                            params.content.push({
                                type: 'image',
                                image: data,
                                mimeType: format,
                            });
                        }
                        break;
                    }
                    case 'sticker':
                    {
                        const isUrl = ENV.TELEGRAM_IMAGE_TRANSFER_MODE === 'url';
                        const format = urls[0].split('.').pop();
                        if (format === 'webm') {
                            params.content.push({
                                type: 'file',
                                data: urls[0],
                                mimeType: 'video/webm',
                            });
                        } else {
                            const { data, format: mimeType } = isUrl ? { data: urls[0], format: `image/${format}` } : await imageToBase64String(urls[0]);
                            params.content.push({
                                type: 'image',
                                image: data,
                                mimeType,
                            });
                        }
                        break;
                    }
                    case 'audio':
                    case 'voice':
                    {
                        const isChat = context.USER_CONFIG.AUDIO_HANDLE_TYPE === 'chat';
                        let audioData = urls[0];
                        if (isChat && context.USER_CONFIG.AI_PROVIDER === 'openai') {
                            const response = await fetch(urls[0]);
                            if (!response.body) {
                                throw new Error('Failed to fetch audio data');
                            }
                            audioData = await convertOgaToMp3(response, 'base64') as string;
                        }
                        params.content.push({
                            type: 'file',
                            data: audioData,
                            mimeType: `audio/${audioData.split('.').pop()}`,
                        });
                        break;
                    }
                    case 'text':
                    {
                        const text = await Promise.all(urls.map(url => fetch(url).then(r => r.text()))).then(t => t.join('\n'));
                        params.content = [
                            {
                                type: 'text',
                                text: `${message.text || message.caption}\n${text}`.trim(),
                            },
                        ];
                        break;
                    }
                    case 'video':
                        params.content.push({
                            type: 'file',
                            data: urls[0],
                            mimeType: `video/${urls[0].split('.').pop()}`,
                        });
                        break;
                }
            }
        }

        return params;
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
    const addQuotePrerequisites = ENV.ADD_QUOTE_LIMIT > 0 && ENV.ADD_QUOTE_SCOPE.includes(sender.context.chatType);
    const expandParams = { addQuote: false, quoteExpandable: ENV.QUOTE_EXPANDABLE };
    const botName = context?.SHARE_CONTEXT?.botName || 'AI';
    const telegraphAccessTokenKey = context?.SHARE_CONTEXT?.telegraphAccessTokenKey || '';
    const telegraphSender = new TelegraphSender(botName, telegraphAccessTokenKey);
    let hasSentTelegraphLink = false;
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

    const streamSender = {
        send: null as ((text: string, isEnd: boolean) => Promise<any>) | null,
        end: null as ((text: string) => Promise<any>) | null,
        sender,
    };
    streamSender.send = async (text: string): Promise<any> => {
        try {
            // 判断是否需要等待
            if ((nextEnableTime || 0) > Date.now()) {
                log.info(`Need await: ${(nextEnableTime || 0) - Date.now()}ms`);
                return;
            }

            await sentPromise;

            // 设置最小流间隔
            if (sendInterval > 0) {
                nextEnableTime = Date.now() + sendInterval;
            }

            if (isSendTelegraph(text)) {
                sentPromise = sendTelegraph(telegraphContext(false, false), question || 'Redo Question', text);
                hasSentTelegraphLink = true;
                return;
            }

            const data = context ? mergeLogMessages(text, context.USER_CONFIG) : text;
            expandParams.addQuote = addQuotePrerequisites && data.length > ENV.ADD_QUOTE_LIMIT;
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
                return sentPromise = sender.sendPlainText(text, 'chat');
            }
        } catch (e) {
            log.error((e as Error).stack);
        }
    };

    streamSender.end = async (text: string, needLog = true): Promise<any> => {
        log.info('--- start end ---');
        await sentPromise;
        if (isSendTelegraph(text)) {
            return sendTelegraph(telegraphContext(true, false), question || 'Redo Question', text);
        }
        const data = context && needLog ? mergeLogMessages(text, context.USER_CONFIG) : text;
        log.info(`sent message ids: ${isMessageSender ? sender.context.sentMessageIds : sender.context.inline_message_id}`);
        expandParams.addQuote = addQuotePrerequisites && data.length > ENV.ADD_QUOTE_LIMIT;
        while (true) {
            const finalResp = await sender.sendRichText(data, undefined, 'chat', expandParams);
            if (finalResp.status === 429) {
                const retryAfter = Number.parseInt(finalResp.headers.get('Retry-After') || '');
                if (retryAfter) {
                    log.error(`Status 429, need wait: ${retryAfter}s`);
                    await waitUntil(Date.now() + retryAfter * 1000 + 10);
                    continue;
                } else {
                    await waitUntil(Date.now() + 10_000);
                    continue;
                }
            }
            if (!finalResp.ok) {
                (sender as MessageSender).context.sentMessageIds.length = 0;
                log.error(`send message failed: ${finalResp.status} ${await finalResp.json().then(j => j.description)}`);
                await sendTelegraph(telegraphContext(true, true), question || 'Redo Question', text);
                return;
            }
            return finalResp;
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
    if (question.length > 600) {
        question = `${question.slice(0, 300)}...${question.slice(-300)}`;
    }
    const prefix = `#Question\n\`\`\`\n${question}\n\`\`\`\n---`;

    const telegraph_prefix = `${prefix}\n#Answer\n🤖 **${getLog(context.USER_CONFIG, true)}**\n`;
    const debug_info = `${getLog(context.USER_CONFIG, false, true)}`;
    const telegraph_suffix = `\n---\n\`\`\`\n${debug_info}\n\`\`\``;
    try {
        if ((telegraph_prefix + text + telegraph_suffix).length >= 10917 * 6) {
            const file = new File([text], 'answer.txt', { type: 'text/plain' });
            return (textSender as MessageSender).sendDocument(file, getLog(context.USER_CONFIG), 'MarkdownV2');
        }
        const resp = await telegraphSender.send(
            'Daily Q&A',
            telegraph_prefix + text + telegraph_suffix,
            containRaw ? text : undefined,
        );

        if (!hasSentTelegraphLink) {
            const url = `https://telegra.ph/${telegraphSender.teleph_path}`;
            const msg = `${containRaw ? '由于渲染出现错误 ' : ''}回答已经转换成完整文章。\n[🔗点击进行查看](${url})`.trim();
            log.info(`send telegraph message: ${msg}`);
            return textSender.sendRichText(msg);
        }
        return resp;
    } catch (error) {
        if (isEnd) {
            const file = new File([text], 'answer.txt', { type: 'text/plain' });
            return (textSender as MessageSender).sendDocument(file, getLog(context.USER_CONFIG), 'MarkdownV2');
        }
    }
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
    if (handleKey === 'audio:text' || !ENV.HIDE_MIDDLE_MESSAGE) {
        await sender.sendRichText(mergeLogMessages(text, context.USER_CONFIG));
    }
    if (handleKey.startsWith('stt')) {
        return new Response('audio handle done');
    }
    clearLog(context.USER_CONFIG);
    !ENV.HIDE_MIDDLE_MESSAGE && (sender.context.sentMessageIds.length = 0);
    const isMiddle = handleKey === 'audio:audio';
    const otherText = (params.content as TextPart[]).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    const resp = await chatWithLLM(message, { role: 'user', content: `[AUDIO TRANSCRIPTION]: ${text}\n${otherText}` }, context, null, streamSender, isMiddle);
    if (isMiddle) {
        const voice = await tts(resp as unknown as string, context.USER_CONFIG);
        ENV.HIDE_MIDDLE_MESSAGE && sender.api.deleteMessage({ chat_id: sender.context.chat_id, message_id: sender.context.message_id! });
        sendAction(context.SHARE_CONTEXT.botToken, sender.context.chat_id, 'upload_voice');
        return sender.sendVoice(voice);
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
    sendAction(context.SHARE_CONTEXT.botToken, sender.context.chat_id, 'upload_voice');
    const resp = await sender.sendVoice(audio, context.USER_CONFIG.AUDIO_CONTAINS_TEXT ? text : undefined);
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

    const caption = img.caption?.map(t => `>${t}`?.slice(0, 800)?.trim()) || [img.text || 'No prompt'];
    if (img.url?.length === 1 || img.raw?.length === 1) {
        return sender.editMessageMedia({
            type: sendAsFile ? 'document' : 'photo',
            media: img.url?.[0] || '',
            caption: escape(mergeLogMessages(caption[0], config), { quoteExpandable: false, addQuote: true }),
        }, ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode, img.raw?.[0] && new File([img.raw[0]], 'image.png', { type: 'image/png' }));
    } else {
        const medias = (img.url || img.raw)!.map((media: string | Blob, index: number) => ({
            type: sendAsFile ? 'document' : 'photo',
            media: typeof media === 'string' ? media : '',
            caption: caption[index] && escape((index === 0 ? mergeLogMessages(caption[index], config) : caption[index]), { quoteExpandable: true, addQuote: true }),
            parse_mode: ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode,
        })) as Telegram.InputMedia[];

        if (img.raw && img.raw.length > 0) {
            const files = img.raw.map((_, i) => new File([img.raw![i]], 'image.png', { type: 'image/png' }));
            return sender.sendMediaGroup(medias, files);
        }
        return sender.sendMediaGroup(medias);
    }
}

function injectHistory(context: WorkerContext, result: UnionData, nextType: string = 'text') {
    if (context.MIDDLE_CONTEXT.history.at(-1)?.role === 'user' || nextType !== 'text')
        return;
    context.MIDDLE_CONTEXT.history.push({ role: 'user', content: result.text || '', ...(result.url && result.url.length > 0 && { images: result.url }) });
}

function tts(text: string, config: AgentUserConfig) {
    const agent = loadTTSLLM(config);
    if (!agent) {
        throw new Error('TTS agent not found');
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
        audio = await convertOgaToMp3(audio, 'blob') as Blob;
        log.info(`transform audio time: ${((Date.now() - start) / 1000).toFixed(2)}s`);
    }
    return agent.request(audio, config);
}

function mergeLogMessages(text: string, config: AgentUserConfig) {
    if (ENV.LOG_POSITION_ON_TOP) {
        return `${getLog(config)}\n\n${text.trim()}`.trim();
    }
    return `${text.trim()}\n\n${getLog(config)}`;
}
