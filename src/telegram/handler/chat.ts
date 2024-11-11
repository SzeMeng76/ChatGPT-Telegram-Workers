import type { FilePart } from 'ai';
import type * as Telegram from 'telegram-bot-api-types';
import type { ChatStreamTextHandler, HistoryModifier, ImageResult, LLMChatRequestParams } from '../../agent/types';
import type { WorkerContext } from '../../config/context';
import type { AgentUserConfig } from '../../config/env';
import type { ChosenInlineSender } from '../utils/send';
import type { MessageHandler } from './types';
import { loadAudioLLM, loadChatLLM, loadImageGen } from '../../agent';
import { loadHistory, requestCompletionsFromLLM } from '../../agent/chat';
import { ENV } from '../../config/env';
import { clearLog, getLog } from '../../extra/log/logDecortor';
import { log } from '../../extra/log/logger';
import { imageToBase64String, renderBase64DataURI } from '../../utils/image';
import { createTelegramBotAPI } from '../api';
import { MessageSender, sendAction, TelegraphSender } from '../utils/send';
import { isTelegramChatTypeGroup, type UnionData, waitUntil } from '../utils/utils';

async function messageInitialize(sender: MessageSender): Promise<void> {
    if (!sender.context.message_id) {
        try {
            setTimeout(() => sendAction(sender.api.token, sender.context.chat_id, 'typing'), 0);
            if (!ENV.SEND_INIT_MESSAGE) {
                return;
            }
            log.info(`send init message`);
            const response = await sender.sendPlainText('...', 'chat');
            const msg = await response.json() as Telegram.ResponseWithMessage;
            log.info(`send init message done`);
            sender.update({
                message_id: msg.result.message_id,
            });
        } catch (e) {
            console.error('Failed to initialize message:', e);
        }
    }
}

export async function chatWithLLM(
    message: Telegram.Message,
    params: LLMChatRequestParams | null,
    context: WorkerContext,
    modifier: HistoryModifier | null,
): Promise<UnionData | Response> {
    const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
    const streamSender = OnStreamHander(sender, context, message.text || '');
    streamSender.sentPromise = messageInitialize(sender);

    const agent = loadChatLLM(context.USER_CONFIG);
    if (!agent) {
        return streamSender.end?.('LLM is not enabled');
    }

    try {
        log.info(`start chat with LLM`);
        const answer = await requestCompletionsFromLLM(params, context, agent, modifier, ENV.STREAM_MODE ? streamSender : null);
        log.info(`chat with LLM done`);
        if (answer === '') {
            return sender.sendPlainText('No response');
        }
        return streamSender.end?.(answer);
    } catch (e) {
        let errMsg = `Error: `;
        if ((e as Error).name === 'AbortError') {
            errMsg += 'Chat with LLM timeout';
        } else {
            errMsg += (e as Error).message.slice(0, 2048);
        }
        return streamSender.end?.(errMsg);
    }
}

export function findPhotoFileID(photos: Telegram.PhotoSize[], offset: number): string {
    let sizeIndex = offset >= 0 ? offset : photos.length + offset;
    sizeIndex = Math.max(0, Math.min(sizeIndex, photos.length - 1));
    return photos[sizeIndex].file_id;
}

export class ChatHandler implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        try {
            const mode = context.USER_CONFIG.CURRENT_MODE;
            const originalType = context.MIDDEL_CONTEXT.originalMessage.type;
            log.info(`message type: ${originalType}`);
            const flowDetail = context.USER_CONFIG?.MODES?.[mode]?.[originalType] || {};

            if (!flowDetail?.disableHistory) {
                await this.initializeHistory(context);
            }

            // 处理原始消息
            const params = await this.processOriginalMessage(message, context);
            // 执行工作流
            await workflow(context, flowDetail?.workflow || [{}], message, params);
            return null;
        } catch (e) {
            console.error('Error:', e);
            const sender = context.MIDDEL_CONTEXT.sender ?? MessageSender.from(context.SHARE_CONTEXT.botToken, message);
            return sender.sendPlainText(`Error: ${(e as Error).message}`);
        }
    };

    private async initializeHistory(context: WorkerContext): Promise<void> {
        // 初始化历史消息
        const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
        if (!historyKey) {
            throw new Error('History key not found');
        }
        context.MIDDEL_CONTEXT.history = await loadHistory(historyKey);
    }

    private async processOriginalMessage(
        message: Telegram.Message,
        context: WorkerContext,
    ): Promise<LLMChatRequestParams> {
        const { type, id, text } = context.MIDDEL_CONTEXT.originalMessage;

        const params: LLMChatRequestParams = {
            role: 'user',
            content: text || '',
        };

        if ((type === 'image' || type === 'audio') && id) {
            const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
            const files = await Promise.all(id.map(i => api.getFileWithReturns({ file_id: i })));
            const paths = files.map(f => f.result.file_path).filter(Boolean) as string[];
            const urls = paths.map(p => `https://api.telegram.org/file/bot${context.SHARE_CONTEXT.botToken}/${p}`);
            log.info(`File URLs:\n${urls.join('\n')}`);
            if (urls.length > 0) {
                params.content = [];
                if (text) {
                    params.content.push({
                        type: 'text',
                        text,
                    });
                }
                if (type === 'image') {
                    for (const url of urls) {
                        params.content.push({
                            type: 'image',
                            image: ENV.TELEGRAM_IMAGE_TRANSFER_MODE === 'url' ? url : renderBase64DataURI(await imageToBase64String(url)),
                        });
                    }
                } else if (type === 'audio') {
                    params.content.push({
                        type: 'file',
                        data: urls[0],
                        mimeType: 'audio/ogg',
                    });
                }
            }
        }

        return params;
    }
}

export function OnStreamHander(sender: MessageSender | ChosenInlineSender, context?: WorkerContext, question?: string): ChatStreamTextHandler {
    const streamSender = {
        nextEnableTime: Date.now(),
        sentMessageIds: sender instanceof MessageSender && sender.context.message_id ? [sender.context.message_id] : [],
        sentPromise: null as Promise<Response> | null,
        send: null as ((text: string, isEnd: boolean, sendType?: 'chat' | 'telegraph') => Promise<any>) | null,
        end: null as ((text: string) => Promise<any>) | null,
    };
    streamSender.send = async (text: string, isEnd: boolean = false): Promise<any> => {
        try {
            if (sender instanceof MessageSender
                && isTelegramChatTypeGroup(sender.context.chatType)
                && ENV.TELEGRAPH_NUM_LIMIT > 0
                && text.length > ENV.TELEGRAPH_NUM_LIMIT
                && context) {
                return;
            }
            // 判断是否需要等待
            if (!isEnd && (streamSender.nextEnableTime || 0) > Date.now()) {
                log.info(`Need await: ${(streamSender.nextEnableTime || 0) - Date.now()}ms`);
                return;
            }

            // 设置最小流间隔
            if (ENV.TELEGRAM_MIN_STREAM_INTERVAL > 0) {
                streamSender.nextEnableTime = Date.now() + ENV.TELEGRAM_MIN_STREAM_INTERVAL;
            }

            const data = context ? `${getLog(context.USER_CONFIG)}\n${text}` : text;
            log.info(`send ${isEnd ? 'end' : 'stream'} message`);
            const resp = await sender.sendRichText(data, ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode, 'chat');
            // 判断429
            if (resp.status === 429) {
                // 获取重试时间
                const retryAfter = Number.parseInt(resp.headers.get('Retry-After') || '');
                if (retryAfter) {
                    streamSender.nextEnableTime = Date.now() + retryAfter * 1000;
                    log.info(`Status 429, need wait: ${streamSender.nextEnableTime - Date.now()}ms`);
                    return;
                }
            }

            if (resp.ok && sender instanceof MessageSender) {
                const respJson = await resp.json() as Telegram.ResponseWithMessage;
                sender.update({
                    message_id: respJson.result.message_id,
                });
                streamSender.sentMessageIds.push(respJson.result.message_id);
            } else if (!resp.ok) {
                log.error(`send message failed: ${resp.status} ${resp.statusText}`);
                return sender.sendPlainText(text);
            }
        } catch (e) {
            console.error(e);
        }
    };

    streamSender.end = async (text: string): Promise<any> => {
        await waitUntil((streamSender.nextEnableTime || 0) + 10);
        if (sender instanceof MessageSender
            && isTelegramChatTypeGroup(sender.context.chatType)
            && ENV.TELEGRAPH_NUM_LIMIT > 0
            && text.length > ENV.TELEGRAPH_NUM_LIMIT
            && context) {
            return sendTelegraph(context, sender, question || 'Redo Question', text);
        }
        const data = context ? `${getLog(context.USER_CONFIG)}\n${text}` : text;
        return sender.sendRichText(data, ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode, 'chat');
    };

    return streamSender as unknown as ChatStreamTextHandler;
}

async function sendTelegraph(context: WorkerContext, sender: MessageSender, question: string, text: string) {
    log.info(`send telegraph`);
    if (question.length > 600) {
        question = `${question.slice(0, 300)}...${question.slice(-300)}`;
    }
    const prefix = `#Question\n\`\`\`\n${question}\n\`\`\`\n---`;
    const botName = context.SHARE_CONTEXT.botName;

    const telegraph_prefix = `${prefix}\n#Answer\n🤖 **${getLog(context.USER_CONFIG, true)}**\n`;
    const debug_info = `debug info:\n${getLog(context.USER_CONFIG) as string}`
        .replace('LOGSTART', '')
        .replace('LOGEND', '')
        .replace('`', '')
        .trim();
    const telegraph_suffix = `\n---\n\`\`\`\n${debug_info}\n\`\`\``;
    const telegraphSender = new TelegraphSender(sender.context, botName, context.SHARE_CONTEXT.telegraphAccessTokenKey!);
    const resp = await telegraphSender.send(
        'Daily Q&A',
        telegraph_prefix + text + telegraph_suffix,
    );
    const url = `https://telegra.ph/${telegraphSender.teleph_path}`;
    const msg = `回答已经转换成完整文章，请及时查看~\n[🔗点击进行查看](${url})`;
    log.info(`send telegraph message: ${msg}`);
    await sender.sendRichText(msg);
    return resp;
}

function clearMessageContext(context: WorkerContext) {
    clearLog(context.USER_CONFIG);
    context.MIDDEL_CONTEXT.sender = null;
}

type WorkflowHandler = (
    eMsg: any,
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext
) => Promise<UnionData | Response | void>;

const workflowHandlers: Record<string, WorkflowHandler> = {
    'text:text': handleTextToText,
    'image:text': handleTextToText,
    'text:image': handleTextToImage,
    'audio:text': handleAudioToText,
    // 'image:image': handleImageToImage,
};

async function workflow(
    context: WorkerContext,
    flows: Record<string, any>[],
    message: Telegram.Message,
    params: LLMChatRequestParams,
): Promise<Response | void> {
    const MiddleResult = context.MIDDEL_CONTEXT.middleResult;

    for (let i = 0; i < flows.length; i++) {
        const eMsg = i === 0 ? context.MIDDEL_CONTEXT.originalMessage : MiddleResult[i - 1];

        const handlerKey = `${eMsg?.type || 'text'}:${flows[i]?.type || 'text'}`;
        const handler = workflowHandlers[handlerKey];

        if (!handler) {
            throw new Error(`Unsupported type: ${handlerKey}`);
        }

        const result = await handler(eMsg, message, params, context) as UnionData | Response;

        if (result instanceof Response) {
            return result;
        }

        if (i < flows.length - 1 && ['image', 'text'].includes(result?.type)) {
            injectHistory(context, result, flows[i + 1].type);
        }

        MiddleResult.push(result);
        clearMessageContext(context);
    }
}

async function handleTextToText(
    eMsg: any,
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
): Promise<UnionData | Response> {
    return chatWithLLM(message, params, context, null);
}

async function handleTextToImage(
    eMsg: any,
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
): Promise<UnionData | Response> {
    const agent = loadImageGen(context.USER_CONFIG);
    const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
    if (!agent) {
        return sender.sendPlainText('ERROR: Image generator not found');
    }
    sendAction(context.SHARE_CONTEXT.botToken, message.chat.id);
    const { message_id } = await sender.sendPlainText('Please wait a moment...', 'tip').then(r => r.json());
    sender.update({ message_id });
    const result = await agent.request(eMsg.text, context.USER_CONFIG);
    log.info('imageresult', JSON.stringify(result));
    await sendImages(result, ENV.SEND_IMAGE_FILE, sender, context.USER_CONFIG);
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    await api.deleteMessage({ chat_id: sender.context.chat_id, message_id });
    return result as UnionData;
}

async function handleAudioToText(
    eMsg: any,
    message: Telegram.Message,
    params: LLMChatRequestParams,
    context: WorkerContext,
): Promise<UnionData | Response> {
    const agent = loadAudioLLM(context.USER_CONFIG);
    const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
    if (!agent) {
        return sender.sendPlainText('ERROR: Audio agent not found');
    }
    const url = (params.content as FilePart[])[0].data as string;
    const audio = await fetch(url).then(b => b.blob());
    const result = await agent.request(audio, context.USER_CONFIG);
    context.MIDDEL_CONTEXT.history.push({ role: 'user', content: result.text || '' });
    await sender.sendRichText(`${getLog(context.USER_CONFIG)}\n> \`${result.text}\``, 'MarkdownV2', 'chat');
    return result;
}

export async function sendImages(img: ImageResult, SEND_IMAGE_FILE: boolean, sender: MessageSender, config: AgentUserConfig) {
    const caption = img.text ? `${getLog(config)}\n> \`${img.text}\`` : getLog(config);
    if (img.url && img.url.length > 1) {
        const images = img.url.map((url: string) => ({
            type: (SEND_IMAGE_FILE ? 'document' : 'photo'),
            media: url,
        })) as Telegram.InputMedia[];
        images[0].caption = caption;
        images[0].parse_mode = ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode;
        return await sender.sendMediaGroup(images);
    } else if (img.url && img.url.length === 1) {
        return sender.editMessageMedia({
            type: 'photo',
            media: img.url[0],
        }, caption, ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode);
    } else if (img.url || img.raw) {
        return sender.sendPhoto((img.url || img.raw)![0], caption, 'MarkdownV2');
    } else {
        return sender.sendPlainText('ERROR: No image found');
    }
}

function injectHistory(context: WorkerContext, result: UnionData, nextType: string = 'text') {
    if (context.MIDDEL_CONTEXT.history.at(-1)?.role === 'user' || nextType !== 'text')
        return;
    context.MIDDEL_CONTEXT.history.push({ role: 'user', content: result.text || '', ...(result.url && result.url.length > 0 && { images: result.url }) });
}
