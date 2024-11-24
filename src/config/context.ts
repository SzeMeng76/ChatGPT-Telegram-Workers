import type * as Telegram from 'telegram-bot-api-types';
import type { HistoryItem } from '../agent/types';
import type { MessageSender } from '../telegram/utils/send';
import type { UnionData } from '../telegram/utils/utils';
import type { AgentUserConfig } from './env';
import { ENV } from './env';
import { ConfigMerger } from './merger';

export class ShareContext {
    botId: number;
    botToken: string;
    botName: string | null = null;

    // KV 保存的键
    chatHistoryKey: string;
    lastMessageKey: string;
    configStoreKey: string;
    groupAdminsKey?: string;
    telegraphAccessTokenKey?: string;
    readonly scheduleDeteleKey: string = 'schedule_detele_message';
    storeMediaMessageKey?: string;
    chunkMessageKey?: string;
    // mediaMessageLock?: string;
    // chunkMessageLock?: string;
    isForwarding: boolean = false;

    constructor(token: string, message: Telegram.Message) {
        const botId = Number.parseInt(token.split(':')[0]);

        const telegramIndex = ENV.TELEGRAM_AVAILABLE_TOKENS.indexOf(token);
        if (telegramIndex === -1) {
            throw new Error('Token not allowed');
        }
        if (ENV.TELEGRAM_BOT_NAME.length > telegramIndex) {
            this.botName = ENV.TELEGRAM_BOT_NAME[telegramIndex];
        }

        this.botToken = token;
        this.botId = botId;
        const id = message?.chat?.id;
        if (id === undefined || id === null) {
            throw new Error('Chat id not found');
        }
        // message_id每次都在变的。
        // 私聊消息中：
        //   message.chat.id 是发言人id
        // 群组消息中：
        //   message.chat.id 是群id
        //   message.from.id 是发言人id
        // 没有开启群组共享模式时，要加上发言人id
        //  chatHistoryKey = history:chat_id:bot_id:(from_id)
        //  configStoreKey =  user_config:chat_id:bot_id:(from_id)
        //  storeMediaMessageKey = store_media_message:chat_id:(from_id)
        //  chunkMessageKey = chunk_message:chat_id:(from_id)

        let historyKey = `history:${id}`;
        let configStoreKey = `user_config:${id}`;
        let chunkMessageKey = ENV.STORE_TEXT_CHUNK_MESSAGE ? `chunk_message:${id}` : undefined;
        let storeMediaMessageKey = ENV.STORE_MEDIA_MESSAGE ? `store_media_message:${id}` : undefined;

        if (botId) {
            historyKey += `:${botId}`;
            configStoreKey += `:${botId}`;
        }
        // 标记群组消息
        switch (message.chat.type) {
            case 'group':
            case 'supergroup':
                if (!ENV.GROUP_CHAT_BOT_SHARE_MODE && message.from?.id) {
                    historyKey += `:${message.from.id}`;
                    configStoreKey += `:${message.from.id}`;
                }
                this.groupAdminsKey = `group_admin:${id}`;
                if (message.from?.id) {
                    chunkMessageKey = chunkMessageKey ? `${chunkMessageKey}:${message.from.id}` : undefined;
                    storeMediaMessageKey = storeMediaMessageKey ? `${storeMediaMessageKey}:${message.from.id}` : undefined;
                }
                break;
            default:
                break;
        }

        // 判断是否为话题模式
        if (message?.chat.is_forum && message?.is_topic_message) {
            if (message?.message_thread_id) {
                historyKey += `:${message.message_thread_id}`;
                configStoreKey += `:${message.message_thread_id}`;
            }
        }

        this.chatHistoryKey = historyKey;
        this.lastMessageKey = `last_message_id:${historyKey}`;
        this.configStoreKey = configStoreKey;
        this.chunkMessageKey = chunkMessageKey;
        this.storeMediaMessageKey = storeMediaMessageKey;

        // 不区分是否开启群组共享模式

        if (ENV.TELEGRAPH_NUM_LIMIT > 0) {
            this.telegraphAccessTokenKey = `telegraph_access_token:${id}`;
        }
    };
}

export class MiddleContext {
    originalMessageInfo: UnionData = { type: 'text' };
    history: HistoryItem[] = [];
    sender: MessageSender | null = null;
}

export class WorkerContextBase {
    SHARE_CONTEXT: ShareContext;
    MIDDLE_CONTEXT: MiddleContext = new MiddleContext();

    constructor(token: string, message: Telegram.Message) {
        this.SHARE_CONTEXT = new ShareContext(token, message);
    }
}

export class WorkerContext implements WorkerContextBase {
    // 用户配置
    USER_CONFIG: AgentUserConfig;
    SHARE_CONTEXT: ShareContext;
    MIDDLE_CONTEXT: MiddleContext;

    constructor(USER_CONFIG: AgentUserConfig, SHARE_CONTEXT: ShareContext, MIDDLE_CONTEXT: MiddleContext) {
        this.USER_CONFIG = USER_CONFIG;
        this.SHARE_CONTEXT = SHARE_CONTEXT;
        this.MIDDLE_CONTEXT = MIDDLE_CONTEXT;
    }

    static async from(SHARE_CONTEXT: ShareContext, MIDDLE_CONTEXT: MiddleContext): Promise<WorkerContext> {
        const USER_CONFIG = { ...ENV.USER_CONFIG };
        try {
            const userConfig: AgentUserConfig = JSON.parse(await ENV.DATABASE.get(SHARE_CONTEXT.configStoreKey));
            ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
        } catch (e) {
            console.warn(e);
        }
        return new WorkerContext(USER_CONFIG, SHARE_CONTEXT, MIDDLE_CONTEXT);
    }
}

export class CallbackQueryContext {
    data: string;
    query_id: string;
    from: Telegram.User;
    USER_CONFIG: AgentUserConfig;
    SHARE_CONTEXT: ShareContext;

    constructor(callbackQuery: Telegram.CallbackQuery, workContext: WorkerContext) {
        this.data = callbackQuery.data!;
        this.query_id = callbackQuery.id;
        this.from = callbackQuery.from!;
        this.USER_CONFIG = workContext.USER_CONFIG;
        this.SHARE_CONTEXT = workContext.SHARE_CONTEXT;
    }
}

export class InlineQueryContext {
    token: string;
    query_id: string;
    from_id: number;
    chat_type: string | undefined;
    query: string;

    constructor(token: string, inlineQuery: Telegram.InlineQuery) {
        this.token = token;
        this.query_id = inlineQuery.id;
        this.from_id = inlineQuery.from.id;
        this.chat_type = inlineQuery.chat_type;
        this.query = inlineQuery.query;
    }
}

export class ChosenInlineContext {
    token: string;
    from_id: number;
    query: string;
    result_id: string;
    inline_message_id: string;
    constructor(token: string, choosenInlineQuery: Telegram.ChosenInlineResult) {
        this.token = token;
        this.from_id = choosenInlineQuery.from.id;
        this.query = choosenInlineQuery.query;
        this.result_id = choosenInlineQuery.result_id;
        this.inline_message_id = choosenInlineQuery.inline_message_id || '';
    }
}

export class ChosenInlineWorkerContext {
    USER_CONFIG: AgentUserConfig;
    botToken: string;
    MIDDLE_CONTEXT: Record<string, any>;
    SHARE_CONTEXT: Record<string, any>;
    constructor(chosenInline: Telegram.ChosenInlineResult, token: string, USER_CONFIG: AgentUserConfig) {
        this.USER_CONFIG = USER_CONFIG;
        this.botToken = token;
        // 模拟私聊消息
        this.MIDDLE_CONTEXT = {
            originalMessageInfo: { type: 'text' },
        };
        this.SHARE_CONTEXT = {
            botName: 'AI',
            telegraphAccessTokenKey: `telegraph_access_token:${chosenInline.from.id}`,
        };
    }

    static async from(token: string, chosenInline: Telegram.ChosenInlineResult): Promise<ChosenInlineWorkerContext> {
        const USER_CONFIG = { ...ENV.USER_CONFIG };
        // Same as private chat
        let userConfigKey = `user_config:${chosenInline.from.id}`;
        const botId = Number.parseInt(token.split(':')[0]);
        if (botId) {
            userConfigKey += `:${botId}`;
        }
        try {
            const userConfig: AgentUserConfig = JSON.parse(await ENV.DATABASE.get(userConfigKey));
            ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
            USER_CONFIG.ENABLE_SHOWINFO = ENV.INLINE_QUERY_SHOW_INFO;
            // 过于频繁的请求不会被Telegram接受
            ENV.TELEGRAM_MIN_STREAM_INTERVAL = ENV.INLINE_QUERY_SEND_INTERVAL;
        } catch (e) {
            console.warn(e);
        }
        return new ChosenInlineWorkerContext(chosenInline, token, USER_CONFIG);
    }
}
