/* eslint-disable antfu/if-newline */
import type * as Telegram from 'telegram-bot-api-types';
import type { TelegramBotAPI } from '../api';
import type { ExpandParams } from './md2tgmd';
import { ENV } from '../../config/env';
import { log, tagMessageIds } from '../../log';
import { createTelegramBotAPI } from '../api';
import md2node from './md2node';
import { chunkDocument, escape } from './md2tgmd';
import { validateMarkdownV2 } from './render_fallback';
import { waitUntil } from './tg_utils';

class MessageContext implements Record<string, any> {
    chat_id: number;
    message_id: number | null = null; // 当前发送的消息，用于后续编辑
    reply_to_message_id: number | null;
    parse_mode: Telegram.ParseMode | null = null;
    allow_sending_without_reply: boolean | null = null;
    disable_web_page_preview: boolean | null = ENV.DISABLE_WEB_PREVIEW;
    message_thread_id: number | null = null;
    chatType: string; // 聊天类型
    message: Telegram.Message; // 原始消息 用于标记需要删除的id
    sentMessageIds: number[] = [];

    constructor(message: Telegram.Message) {
        this.chat_id = message.chat.id;
        this.chatType = message.chat.type;
        this.message = message;
        // this.messageId = message.message_id;
        if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
            // 是否回复被回复的消息
            if (message?.reply_to_message && ENV.EXTRA_MESSAGE_CONTEXT && !message.is_topic_message
                && ENV.ENABLE_REPLY_TO_MENTION && (ENV.ENABLE_BOT_TO_BOT || !message.reply_to_message.from?.is_bot)) {
                this.reply_to_message_id = message.reply_to_message.message_id;
            } else {
                this.reply_to_message_id = message.message_id;
            }

            this.allow_sending_without_reply = true;
            if (message.is_topic_message && message.message_thread_id) {
                this.message_thread_id = message.message_thread_id;
            }
        } else {
            this.reply_to_message_id = null;
        }
    }
}

export class MessageSender {
    api: TelegramBotAPI;
    context: MessageContext;

    constructor(token: string, context: MessageContext) {
        this.api = createTelegramBotAPI(token);
        this.context = context;
        this.sendRichText = this.sendRichText.bind(this);
        this.sendPlainText = this.sendPlainText.bind(this);
        this.sendPhoto = this.sendPhoto.bind(this);
        this.sendMediaGroup = this.sendMediaGroup.bind(this);
        this.sendDocument = this.sendDocument.bind(this);
        this.sendVoice = this.sendVoice.bind(this);
        this.editMessageMedia = this.editMessageMedia.bind(this);
    }

    static from(token: string, message: Telegram.Message): MessageSender {
        return new MessageSender(token, new MessageContext(message));
    }

    with(message: Telegram.Message): MessageSender {
        this.context = new MessageContext(message);
        return this;
    }

    update(context: MessageContext | Record<string, any>): MessageSender {
        if (!this.context) {
            this.context = context as any;
            return this;
        }
        for (const key in context) {
            (this.context as any)[key] = (context as any)[key];
        }
        return this;
    }

    private async sendMessage(message: string, context: MessageContext, retryCount = 0): Promise<Response> {
        const maxRetries = 3;
        let resp: Response;

        try {
            if (context?.message_id) {
                const params: Telegram.EditMessageTextParams = {
                    chat_id: context.chat_id,
                    message_id: context.message_id,
                    parse_mode: context.parse_mode || undefined,
                    text: message,
                };
                if (context.disable_web_page_preview) {
                    params.link_preview_options = {
                        is_disabled: true,
                    };
                }
                resp = await this.api.editMessageText(params);
            } else {
                const params: Telegram.SendMessageParams = {
                    chat_id: context.chat_id,
                    message_thread_id: context.message_thread_id || undefined,
                    parse_mode: context.parse_mode || undefined,
                    text: message,
                };
                if (context.reply_to_message_id) {
                    params.reply_parameters = {
                        message_id: context.reply_to_message_id,
                        chat_id: context.chat_id,
                        allow_sending_without_reply: context.allow_sending_without_reply || undefined,
                    };
                }
                if (context.disable_web_page_preview) {
                    params.link_preview_options = {
                        is_disabled: true,
                    };
                }
                resp = await this.api.sendMessage(params);
            }

            // Handle 429 rate limit errors with retry
            if (resp.status === 429 && retryCount < maxRetries) {
                const errorBody = await resp.clone().json() as { parameters?: { retry_after?: number } };
                const retryAfter = errorBody.parameters?.retry_after || resp.headers.get('Retry-After');
                const waitTime = retryAfter ? Number.parseInt(retryAfter as string) : 5;
                log.error(`Status 429, need wait: ${waitTime}s (retry ${retryCount + 1}/${maxRetries})`);
                await waitUntil(Date.now() + waitTime * 1000);
                return this.sendMessage(message, context, retryCount + 1);
            }

            return resp;
        } catch (error: any) {
            // Handle network errors with retry
            if (retryCount < maxRetries && (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH' || error.message?.includes('fetch failed'))) {
                const waitTime = Math.pow(2, retryCount) * 2; // Exponential backoff: 2s, 4s, 8s
                log.error(`Network error (${error.code || error.message}), retrying in ${waitTime}s (retry ${retryCount + 1}/${maxRetries})`);
                await waitUntil(Date.now() + waitTime * 1000);
                return this.sendMessage(message, context, retryCount + 1);
            }

            // Log error and rethrow
            log.error(`Failed to send message after ${retryCount + 1} attempts: ${error.message}`);
            throw error;
        }
    }

    private async sendLongMessage(message: string, context: MessageContext, expandParams?: ExpandParams): Promise<Response> {
        const chatContext = { ...context };
        const messages = renderMessage(context.parse_mode, message, expandParams);
        let lastMessageResponse = null;
        let lastMessageRespJson = null;

        try {
            for (let i = 0; i < messages.length; i++) {
                if (ENV.LOG_POSITION_ON_TOP) {
                    // 不发送中间片段
                    if (i > 0 && i < context.sentMessageIds.length - 1) {
                        continue;
                    }
                } else if (context.sentMessageIds.length > 2 && i < context.sentMessageIds.length - 2) {
                    // 只发送最后两个: 由于日志原因可能被分割为两块
                    continue;
                }

                // 不发送空消息
                if (messages[i].trim() === '') {
                    continue;
                }

                chatContext.message_id = context.sentMessageIds[i] ?? null;
                // 存在reply_to_message_id 且 非第一个片段，回复消息的id为上一个片段的id
                context.reply_to_message_id && i > 0 && (chatContext.reply_to_message_id = context.sentMessageIds[i - 1]);
                log.info(`message id: ${chatContext.message_id}`);
                // log.debug(`chunk:\n${messages[i]}`);
                lastMessageResponse = await this.sendMessage(messages[i], chatContext);
                if (lastMessageResponse.status === 400) {
                    const errorBody = (await lastMessageResponse.clone().json() as Telegram.ResponseError);
                    const errorMessage = errorBody.description;
                    if (errorMessage.includes('not modified')) {
                        continue;
                    }
                    // Log the specific parse error for debugging
                    log.error(`Render failed with 400 error: ${errorMessage}. Clearing sentMessageIds to allow fresh messages.`);

                    // Clear sentMessageIds on render error to prevent future messages from trying to edit failed messages
                    context.sentMessageIds.length = 0;

                    // If it's a parse error, don't retry - the content is fundamentally broken
                    // Let the caller handle fallback to HTML/plain text
                    if (errorMessage.includes('parse entities') || errorMessage.includes('reserved') || errorMessage.includes('must be escaped')) {
                        log.error('[Render] MarkdownV2 parse error detected, content needs fallback rendering');
                    }
                    break;
                }
                if (lastMessageResponse.status !== 200) {
                    // Clear sentMessageIds on any error to prevent future messages from trying to edit failed messages
                    log.error(`Send failed with status ${lastMessageResponse.status}. Clearing sentMessageIds.`);
                    context.sentMessageIds.length = 0;
                    break;
                }
                lastMessageRespJson = await lastMessageResponse.clone().json() as Telegram.ResponseWithMessage;
                this.context.sentMessageIds[i] = lastMessageRespJson.result.message_id;
                // 用于后续发送媒体编辑
                this.context.message_id = lastMessageRespJson.result.message_id;
            }
            if (lastMessageResponse === null) {
                throw new Error('Send message failed');
            }
            return lastMessageResponse;
        } catch (error: any) {
            log.error(`Failed to send long message: ${error.message}`);
            throw error;
        }
    }

    sendRichText(
        message: string,
        parseMode: Telegram.ParseMode | null = ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode,
        type: 'tip' | 'chat' = 'chat',
        expandParams?: ExpandParams,
    ): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        return checkIsNeedTagIds(this.context, this.sendLongMessage(message, {
            ...this.context,
            parse_mode: parseMode,
        }, expandParams), type);
    }

    sendPlainText(message: string, type: 'tip' | 'chat' = 'tip'): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        return checkIsNeedTagIds(this.context, this.sendLongMessage(message, {
            ...this.context,
            parse_mode: null,
        }), type);
    }

    sendPhoto(photo: string | Blob, caption?: string | undefined, parse_mode?: Telegram.ParseMode): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendPhotoParams = {
            chat_id: this.context.chat_id,
            message_thread_id: this.context.message_thread_id || undefined,
            photo,
            ...(caption ? { caption: renderMessage(parse_mode || null, caption)[0] } : {}),
            parse_mode,
        };
        if (this.context.reply_to_message_id) {
            params.reply_parameters = {
                message_id: this.context.reply_to_message_id,
                chat_id: this.context.chat_id,
                allow_sending_without_reply: this.context.allow_sending_without_reply || undefined,
            };
        }
        return checkIsNeedTagIds(this.context, this.api.sendPhoto(params), 'chat');
    }

    sendMediaGroup(media: Telegram.InputMedia[], files?: File[]): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendMediaGroupParams = {
            chat_id: this.context.chat_id,
            message_thread_id: this.context.message_thread_id || undefined,
            media,
        };
        if (this.context.reply_to_message_id) {
            params.reply_parameters = {
                message_id: this.context.reply_to_message_id,
                chat_id: this.context.chat_id,
                allow_sending_without_reply: this.context.allow_sending_without_reply || undefined,
            };
        }

        if (files) {
            params.media.forEach((media, index) => {
                media.media = `attach://file${index}`;
                (params as unknown as Record<string, unknown>)[`file${index}`] = files[index];
            });
        }

        return checkIsNeedTagIds(this.context, this.api.sendMediaGroup(params), 'chat');
    }

    sendDocument(document: string | Blob, caption?: string | undefined, parse_mode?: Telegram.ParseMode): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendDocumentParams = {
            chat_id: this.context.chat_id,
            message_thread_id: this.context.message_thread_id || undefined,
            document,
            caption,
            parse_mode,
        };
        if (this.context.reply_to_message_id) {
            params.reply_parameters = {
                message_id: this.context.reply_to_message_id,
                chat_id: this.context.chat_id,
                allow_sending_without_reply: this.context.allow_sending_without_reply || undefined,
            };
        }
        return checkIsNeedTagIds(this.context, this.api.sendDocument(params), 'chat');
    }

    editMessageMedia(media: Telegram.InputMedia, parse_mode?: Telegram.ParseMode, file?: File): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        if (!this.context.message_id) {
            throw new Error('Message id is null');
        }
        const params: Telegram.EditMessageMediaParams = {
            chat_id: this.context.chat_id,
            message_id: this.context.message_id,
            media: {
                ...media,
                parse_mode,
                ...(file && { media: `attach://file` }),
            },
            ...(file && { file }),
        };

        return checkIsNeedTagIds(this.context, this.api.request('editMessageMedia', { ...params, file }), 'chat');
    }

    sendVoice(voice: Blob, caption?: string | undefined): Promise<Response> {
        const params: Telegram.SendVoiceParams = {
            chat_id: this.context.chat_id,
            voice,
            caption,
        };
        if (caption && ['spoiler', 'bold', 'italic', 'underline', 'strikethrough', 'code', 'pre'].includes(ENV.AUDIO_TEXT_FORMAT || '')) {
            params.caption_entities = [{
                type: ENV.AUDIO_TEXT_FORMAT as Telegram.MessageEntityType,
                offset: 0,
                length: caption.length,
            }];
        }
        if (this.context.reply_to_message_id) {
            params.reply_parameters = {
                message_id: this.context.reply_to_message_id,
                chat_id: this.context.chat_id,
                allow_sending_without_reply: this.context.allow_sending_without_reply || undefined,
            };
        }
        return checkIsNeedTagIds(this.context, this.api.sendVoice(params), 'chat');
    }
}

interface Author {
    short_name: string;
    author_name: string;
    author_url?: string;
}

interface CreateOrEditPageResponse {
    ok: boolean;
    result?: {
        path: string;
        url: string;
    };
    error?: string;
};

export class TelegraphSender {
    readonly telegraphAccessTokenKey: string;
    telegraphAccessToken?: string;
    teleph_path?: string;
    author: Author = {
        short_name: 'Mewo',
        author_name: 'A Cat',
        author_url: ENV.TELEGRAPH_AUTHOR_URL,
    };

    constructor(botName: string | null, telegraphAccessTokenKey: string) {
        this.telegraphAccessTokenKey = telegraphAccessTokenKey;
        if (botName) {
            this.author = {
                short_name: botName,
                author_name: botName,
                author_url: ENV.TELEGRAPH_AUTHOR_URL,
            };
        }
    }

    private async createAccount(): Promise<string> {
        const { short_name, author_name } = this.author;
        const url = `https://api.telegra.ph/createAccount?short_name=${short_name}&author_name=${author_name}`;
        const resp = await fetch(url).then(r => r.json());
        if (resp.ok) {
            console.log('create telegraph account success:', resp.result.access_token);
            return resp.result.access_token;
        } else {
            throw new Error('create telegraph account failed');
        }
    }

    private async createOrEditPage(url: string, title: string, content: string, raw?: string): Promise<Response> {
        const contentNode = md2node(content);
        if (raw) {
            contentNode.push(...[
                { tag: 'hr' },
                {
                    tag: 'blockquote',
                    children: ['RAW DATA'],
                },
                {
                    tag: 'pre',
                    children: [
                        {
                            tag: 'code',
                            attrs: { class: 'language-plaintext' },
                            children: [raw.trim()],
                        },
                    ],
                },
            ]);
        }
        const body = {
            access_token: this.telegraphAccessToken,
            path: this.teleph_path ?? undefined,
            title: title || 'Daily Q&A',
            content: contentNode,
            ...this.author,
        };
        const headers = { 'Content-Type': 'application/json' };
        return fetch(url, {
            method: 'post',
            headers,
            body: JSON.stringify(body),
        });
    }

    async send(title: string, content: string, raw?: string): Promise<Response> {
        let endPoint = 'https://api.telegra.ph/editPage';
        if (!this.telegraphAccessToken) {
            this.telegraphAccessToken = await ENV.DATABASE.get(this.telegraphAccessTokenKey);
            if (!this.telegraphAccessToken) {
                this.telegraphAccessToken = await this.createAccount();
                await ENV.DATABASE.put(this.telegraphAccessTokenKey, this.telegraphAccessToken).catch(console.error);
            }
        }

        if (!this.teleph_path) {
            endPoint = 'https://api.telegra.ph/createPage';
        }
        const resp = await this.createOrEditPage(endPoint, title, content, raw);
        if (resp.ok) {
            const data = await resp.json() as CreateOrEditPageResponse;
            if (!data.ok) {
                console.error('telegraph send error:', JSON.stringify(data));
                throw new Error(JSON.stringify(data));
            }
            this.teleph_path = data.result?.path;
        } else if (resp.status === 429) {
            const retryAfter = Number.parseInt(resp.headers.get('Retry-After') || '');
            log.error(`Send telegraph page failed, Status 429, need wait: ${retryAfter || 10}s`);
            if (retryAfter) {
                await waitUntil(Date.now() + retryAfter * 1000);
            } else {
                await waitUntil(Date.now() + 5_000);
            }
            return this.send(title, content, raw);
        } else if (!resp.ok) {
            log.error('Send telegraph page failed:', resp.status);
            throw new Error(await resp.text());
        }
        return resp;
    }
}

export function sendAction(botToken: string, chat_id: number, action: Telegram.ChatAction = 'typing') {
    const api = createTelegramBotAPI(botToken);
    setTimeout(() => api.sendChatAction({
        chat_id,
        action,
    }).catch(console.error), 0);
}

export async function checkIsNeedTagIds(context: { chatType: string; message: Telegram.Message }, resp: Promise<Response>, msgType: 'tip' | 'chat') {
    const { chatType, message } = context;
    let message_id: number[] = [];
    const original_resp = await resp;
    do {
        if (ENV.EXPIRED_TIME <= 0) break;
        const clone_resp = await original_resp.clone().json() as Telegram.SendMediaGroupResponse | Telegram.SendMessageResponse;
        if (Array.isArray(clone_resp.result)) {
            message_id = clone_resp?.result?.map((i: { message_id: any }) => i.message_id);
        } else {
            message_id = [clone_resp?.result?.message_id];
        }
        if (message_id.filter(Boolean).length === 0) {
            log.error('resp:', JSON.stringify(clone_resp));
            break;
            // throw new Error('Message send failed, see logs for more details');
        }
        const isGroup = ['group', 'supergroup'].includes(chatType);
        const isNeedTag
            = (isGroup && ENV.SCHEDULE_GROUP_DELETE_TYPE.includes(msgType))
                || (!isGroup && ENV.SCHEDULE_PRIVATE_DELETE_TYPE.includes(msgType));
        if (isNeedTag) {
            if (!tagMessageIds.has(message)) {
                tagMessageIds.set(message, new Set());
            }
            message_id.forEach(id => tagMessageIds.get(message)?.add(id));
        }
    } while (false);

    return original_resp;
}

// class CallbackQueryContext {
//     id: string;
//     from: Telegram.User;
//     message?: Telegram.Message;
//     inline_message_id?: string;
//     data?: string;
//     constructor(query: Telegram.CallbackQuery) {
//         this.id = query.id;
//         this.from = query.from;
//         this.message = query.message;
//         this.inline_message_id = query.inline_message_id;
//         this.data = query.data;
//     }
// }

// class AnswerCallbackQuerySender {
//     api: TelegramBotAPI;
//     context: CallbackQueryContext;
//     constructor(token: string, context: CallbackQueryContext) {
//         this.api = createTelegramBotAPI(token);
//         this.context = context;
//     }

//     answerCallbackQuery(text: string, show_alert?: boolean, url?: string, cache_time?: number): Promise<Response> {
//         return this.api.answerCallbackQuery({
//             callback_query_id: this.context.id,
//             text,
//             show_alert,
//             url,
//             cache_time,
//         });
//     }
// }

// class InlineQueryContext {
//     id: string;
//     from: Telegram.User;
//     query: string;
//     offset: string;
//     chat_type?: string;
//     constructor(query: Telegram.InlineQuery) {
//         this.id = query.id;
//         this.from = query.from;
//         this.query = query.query;
//         this.offset = query.offset;
//         this.chat_type = query.chat_type;
//     }
// }

// class InlineQuerySender {
//     api: TelegramBotAPI;
//     context: InlineQueryContext;
//     constructor(token: string, context: InlineQueryContext) {
//         this.api = createTelegramBotAPI(token);
//         this.context = context;
//     }

//     answerInlineQuery(results: Telegram.InlineQueryResult[], button?: Telegram.InlineQueryResultsButton, cache_time?: number): Promise<Response> {
//         return this.api.answerInlineQuery({
//             inline_query_id: this.context.id,
//             results,
//             button,
//             cache_time,
//         });
//     }
// }

class ChosenInlineContext {
    result_id: string;
    inline_message_id?: string;
    query: string;
    parse_mode: Telegram.ParseMode | null = null;
    telegraphAccessTokenKey?: string;
    chatType = 'private';
    constructor(result: Telegram.ChosenInlineResult) {
        this.result_id = result.result_id;
        this.inline_message_id = result.inline_message_id;
        this.query = result.query;
        if (ENV.TELEGRAPH_NUM_LIMIT > 0) {
            this.telegraphAccessTokenKey = `telegraph_access_token:${result.from.id}`;
        }
    }
}

export class ChosenInlineSender {
    api: TelegramBotAPI;
    context: ChosenInlineContext;
    constructor(token: string, context: ChosenInlineContext) {
        this.api = createTelegramBotAPI(token);
        this.context = context;
    }

    static from(token: string, result: Telegram.ChosenInlineResult): ChosenInlineSender {
        return new ChosenInlineSender(token, new ChosenInlineContext(result));
    }

    sendRichText(
        text: string,
        parseMode: Telegram.ParseMode = ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode,
        _type: 'tip' | 'chat' = 'chat',
        expandParams?: ExpandParams,
    ): Promise<Response> {
        return this.editMessageText(text, parseMode, expandParams);
    }

    sendPlainText(text: string): Promise<Response> {
        return this.editMessageText(text);
    }

    editMessageText(text: string, parse_mode?: Telegram.ParseMode, expandParams?: ExpandParams): Promise<Response> {
        return this.api.editMessageText({
            inline_message_id: this.context.inline_message_id,
            text: renderMessage(parse_mode || null, text, expandParams)[0],
            parse_mode,
            link_preview_options: {
                is_disabled: ENV.DISABLE_WEB_PREVIEW,
            },
        });
    }

    editMessageMedia(media: Telegram.InputMedia, parse_mode?: Telegram.ParseMode): Promise<Response> {
        return this.api.editMessageMedia({
            inline_message_id: this.context.inline_message_id,
            media: {
                ...media,
                parse_mode,
            },
        });
    }
}

function renderMessage(parse_mode: Telegram.ParseMode | null, message: string, expandParams?: ExpandParams): string[] {
    // Remove Grok rendering tags (xAI web UI internal tags that may leak into API responses)
    // These tags like <grok:render type="renderinlinecitation"> are used in Grok web interface
    // but should not appear in bot responses
    const cleanedMessage = message.replace(/<grok:[^>]*>/g, '').replace(/<\/grok:[^>]*>/g, '');

    const chunkMessage = chunkDocument(cleanedMessage);
    if (parse_mode === 'MarkdownV2') {
        return chunkMessage.map((lines) => {
            const escaped = escape(lines, expandParams);

            // Validate and auto-fix MarkdownV2 issues before sending
            const validation = validateMarkdownV2(escaped);
            if (!validation.valid) {
                log.warn(`[Render] MarkdownV2 validation issues detected:\n${validation.issues.join('\n')}`);

                // Use auto-fixed version if available
                if (validation.fixed) {
                    log.info('[Render] Applied auto-fix to MarkdownV2 content');
                    return validation.fixed;
                }
            }

            return escaped;
        });
    }
    return chunkMessage;
}
