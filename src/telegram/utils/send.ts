/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable antfu/if-newline */
import type * as Telegram from 'telegram-bot-api-types';
import type { TelegramBotAPI } from '../api';
import { ENV } from '../../config/env';
import { sentMessageIds } from '../../extra/log/logDecortor';
import { log } from '../../extra/log/logger';
import { createTelegramBotAPI } from '../api';
import md2node from './md2node';
import { escape } from './md2tgmd';

class MessageContext implements Record<string, any> {
    chat_id: number;
    message_id: number | null = null; // 当前发生的消息，用于后续编辑
    reply_to_message_id: number | null;
    parse_mode: Telegram.ParseMode | null = null;
    allow_sending_without_reply: boolean | null = null;
    disable_web_page_preview: boolean | null = ENV.DISABLE_WEB_PREVIEW;
    message_thread_id: number | null = null;
    chatType: string; // 聊天类型
    message: Telegram.Message; // 原始消息 用于缓存需要删除的id

    constructor(message: Telegram.Message) {
        this.chat_id = message.chat.id;
        this.chatType = message.chat.type;
        this.message = message;
        // this.messageId = message.message_id;
        if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
            // 是否回复被回复的消息
            if (message?.reply_to_message && ENV.EXTRA_MESSAGE_CONTEXT
                && ENV.ENABLE_REPLY_TO_MENTION && !message.reply_to_message.from?.is_bot) {
                this.reply_to_message_id = message.reply_to_message.message_id;
            } else {
                this.reply_to_message_id = message.message_id;
            }

            this.allow_sending_without_reply = true;
            if (message.message_thread_id) {
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

    private async sendMessage(message: string, context: MessageContext): Promise<Response> {
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
            return this.api.editMessageText(params);
        } else {
            const params: Telegram.SendMessageParams = {
                chat_id: context.chat_id,
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
            return this.api.sendMessage(params);
        };
    }

    private renderMessage(parse_mode: Telegram.ParseMode | null, message: string): string {
        if (parse_mode === 'MarkdownV2') {
            return escape(message);
        }
        return message;
    }

    private async sendLongMessage(message: string, context: MessageContext): Promise<Response> {
        const chatContext = { ...context };
        const limit = 4096;
        if (message.length <= limit) {
            // 原始消息长度小于限制，直接使用当前parse_mode发送
            const resp = await this.sendMessage(this.renderMessage(context.parse_mode, message), chatContext);
            if (resp.status === 200) {
                // 发送成功，直接返回
                return resp;
            }
        }
        // 拆分消息后可能导致markdown格式错乱，所以采用纯文本模式发送,不使用任何parse_mode
        chatContext.parse_mode = null;
        let lastMessageResponse = null;
        for (let i = 0; i < message.length; i += limit) {
            const msg = message.slice(i, Math.min(i + limit, message.length));
            if (i > 0) {
                chatContext.message_id = null;
            }
            lastMessageResponse = await this.sendMessage(msg, chatContext);
            if (lastMessageResponse.status !== 200) {
                break;
            }
        }
        if (lastMessageResponse === null) {
            throw new Error('Send message failed');
        }
        return lastMessageResponse;
    }

    sendRichText(message: string, parseMode: Telegram.ParseMode | null = (ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode), type: 'tip' | 'chat' = 'chat'): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const resp = this.sendLongMessage(message, {
            ...this.context,
            parse_mode: parseMode,
        });
        return checkIsNeedTagIds(this.context, resp, type);
    }

    sendPlainText(message: string, type: 'tip' | 'chat' = 'tip'): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const resp = this.sendLongMessage(message, {
            ...this.context,
            parse_mode: null,
        });
        return checkIsNeedTagIds(this.context, resp, type);
    }

    sendPhoto(photo: string | Blob, caption?: string | undefined, parse_mode?: Telegram.ParseMode): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendPhotoParams = {
            chat_id: this.context.chat_id,
            photo,
            // fourm模式发送时带message_thread_id会报错
            // message_thread_id: this.context.message_thread_id || undefined,
            ...(caption ? { caption: this.renderMessage(parse_mode || null, caption) } : {}),
            parse_mode,
        };
        if (this.context.reply_to_message_id) {
            params.reply_parameters = {
                message_id: this.context.reply_to_message_id,
                chat_id: this.context.chat_id,
                allow_sending_without_reply: this.context.allow_sending_without_reply || undefined,
            };
        }
        const resp = this.api.sendPhoto(params);
        return checkIsNeedTagIds(this.context, resp, 'chat');
    }

    sendMediaGroup(media: Telegram.InputMedia[]): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendMediaGroupParams = {
            chat_id: this.context.chat_id,
            media,
            message_thread_id: this.context.message_thread_id || undefined,
        };

        const resp = this.api.sendMediaGroup(params);
        return checkIsNeedTagIds(this.context, resp, 'chat');
    }

    sendDocument(document: string | Blob, caption?: string | undefined, parse_mode?: Telegram.ParseMode): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendDocumentParams = {
            chat_id: this.context.chat_id,
            document,
            message_thread_id: this.context.message_thread_id || undefined,
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
        return this.api.sendDocument(params);
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
    context: MessageContext;
    readonly telegraphAccessTokenKey: string;
    telegraphAccessToken?: string;
    teleph_path?: string;
    author: Author = {
        short_name: 'Mewo',
        author_name: 'A Cat',
        author_url: ENV.TELEGRAPH_AUTHOR_URL,
    };

    constructor(context: MessageContext, botName: string | null, telegraphAccessTokenKey: string) {
        this.context = context;
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
            return resp.result.access_token;
        } else {
            throw new Error('create telegraph account failed');
        }
    }

    private async createOrEditPage(url: string, title: string, content: string): Promise<CreateOrEditPageResponse> {
        const body = {
            access_token: this.telegraphAccessToken,
            teleph_path: this.teleph_path ?? undefined,
            title: title || 'Daily Q&A',
            content: md2node(content),
            ...this.author,
        };
        const headers = { 'Content-Type': 'application/json' };
        return fetch(url, {
            method: 'post',
            headers,
            body: JSON.stringify(body),
        }).then(r => r.json());
    }

    async send(title: string, content: string): Promise<CreateOrEditPageResponse> {
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
            const c_resp = await this.createOrEditPage(endPoint, title, content);
            if (c_resp.ok) {
                this.teleph_path = c_resp.result!.path;
                log.info('telegraph url:', c_resp.result!.url);
                return c_resp;
            } else {
                console.error(c_resp.error);
                throw new Error(c_resp.error);
            }
        } else {
            return this.createOrEditPage(endPoint, title, content);
        }
    }
}

export function sendAction(botToken: string, chat_id: number, action: Telegram.ChatAction = 'typing') {
    const api = createTelegramBotAPI(botToken);
    setTimeout(() => api.sendChatAction({
        chat_id,
        action,
    }).catch(console.error), 0);
}

async function checkIsNeedTagIds(context: MessageContext, resp: Promise<Response>, msgType: 'tip' | 'chat') {
    const { chatType } = context;
    let message_id = null;
    const original_resp = await resp;
    do {
        if (ENV.EXPIRED_TIME <= 0 || context.message_id) break;
        const clone_resp = await original_resp.clone().json() as Telegram.SendMediaGroupResponse | Telegram.SendMessageResponse;
        if (Array.isArray(clone_resp.result)) {
            message_id = clone_resp?.result?.map((i: { message_id: any }) => i.message_id);
        } else {
            message_id = [clone_resp?.result?.message_id];
        }
        if (message_id.filter(Boolean).length === 0) {
            log.error('resp', JSON.stringify(clone_resp));
            throw new Error('Message send failed, see logs for more details');
        }
        const isGroup = ['group', 'supergroup'].includes(chatType);
        const isNeedTag
            = (isGroup && ENV.SCHEDULE_GROUP_DELETE_TYPE.includes(msgType))
            || (!isGroup && ENV.SCHEDULE_PRIVATE_DELETE_TYPE.includes(msgType));
        if (isNeedTag) {
            if (!sentMessageIds.has(context.message)) {
                sentMessageIds.set(context.message, []);
            }
            message_id.forEach(id => sentMessageIds.get(context.message)?.push(id));
            log.debug('taged message id', sentMessageIds.get(context.message)?.join(','));
        }
    } while (false);

    return original_resp;
}

class CallbackQueryContext {
    id: string;
    from: Telegram.User;
    message?: Telegram.Message;
    inline_message_id?: string;
    data?: string;
    constructor(query: Telegram.CallbackQuery) {
        this.id = query.id;
        this.from = query.from;
        this.message = query.message;
        this.inline_message_id = query.inline_message_id;
        this.data = query.data;
    }
}

class AnswerCallbackQuerySender {
    api: TelegramBotAPI;
    context: CallbackQueryContext;
    constructor(token: string, context: CallbackQueryContext) {
        this.api = createTelegramBotAPI(token);
        this.context = context;
    }

    answerCallbackQuery(text: string, show_alert?: boolean, url?: string, cache_time?: number): Promise<Response> {
        return this.api.answerCallbackQuery({
            callback_query_id: this.context.id,
            text,
            show_alert,
            url,
            cache_time,
        });
    }
}

class InlineQueryContext {
    id: string;
    from: Telegram.User;
    query: string;
    offset: string;
    chat_type?: string;
    constructor(query: Telegram.InlineQuery) {
        this.id = query.id;
        this.from = query.from;
        this.query = query.query;
        this.offset = query.offset;
        this.chat_type = query.chat_type;
    }
}

class InlineQuerySender {
    api: TelegramBotAPI;
    context: InlineQueryContext;
    constructor(token: string, context: InlineQueryContext) {
        this.api = createTelegramBotAPI(token);
        this.context = context;
    }

    answerInlineQuery(results: Telegram.InlineQueryResult[], button?: Telegram.InlineQueryResultsButton, cache_time?: number): Promise<Response> {
        return this.api.answerInlineQuery({
            inline_query_id: this.context.id,
            results,
            button,
            cache_time,
        });
    }
}

class ChosenInlineContext {
    result_id: string;
    from: Telegram.User;
    inline_message_id?: string;
    query: string;
    parse_mode: Telegram.ParseMode | null = null;
    constructor(result: Telegram.ChosenInlineResult) {
        this.result_id = result.result_id;
        this.from = result.from;
        this.inline_message_id = result.inline_message_id;
        this.query = result.query;
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

    sendRichText(text: string, parseMode: Telegram.ParseMode = ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode, type: string = 'chat'): Promise<Response> {
        return this.editMessageText(text, parseMode);
    }

    sendPlainText(text: string): Promise<Response> {
        return this.editMessageText(text);
    }

    editMessageText(text: string, parse_mode?: Telegram.ParseMode): Promise<Response> {
        return this.api.editMessageText({
            inline_message_id: this.context.inline_message_id,
            text: this.renderMessage(parse_mode || null, text),
            parse_mode,
            link_preview_options: {
                is_disabled: ENV.DISABLE_WEB_PREVIEW,
            },
        });
    }

    editMessageMedia(media: string, type: 'photo' | 'video' | 'audio' | 'document', caption?: string | undefined, parse_mode?: Telegram.ParseMode): Promise<Response> {
        return this.api.editMessageMedia({
            inline_message_id: this.context.inline_message_id,
            media: {
                type,
                media,
                ...(caption ? { caption: this.renderMessage(parse_mode || null, caption) } : {}),
            },
        });
    }

    private renderMessage(parse_mode: Telegram.ParseMode | null, message: string): string {
        if (parse_mode === 'MarkdownV2') {
            return escape(message);
        }
        return message;
    }
}
