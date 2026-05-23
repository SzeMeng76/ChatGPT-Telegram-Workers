import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { WorkerContextBase } from '../../config/context';
import { log } from '../../log/logger';
import { handleCallbackQuery, handleChosenInlineQuery, handleInlineQuery } from '../query';
import { ChatHandler } from './chat';
import { GroupMention } from './group';
import {
    BlocklistFilter,
    BotToBotFilter,
    CheckForwarding,
    ChunkMessageHandler,
    CommandHandler,
    EnvChecker,
    InitUserConfig,
    IntelligentModelProcess,
    MergeQuote,
    MessageFilter,
    OldMessageFilter,
    RecordStatsHandler,
    ReplyInlineHandler,
    SaveLastMessage,
    SubstituteHandler,
    TagNeedDelete,
    WhiteListFilter,
} from './handlers';

function loadMessage(body: Telegram.Update, isForwarding: boolean) {
    switch (true) {
        case !!body.message:
            return (token: string) => handleMessage(token, body.message!, isForwarding);
        case !!body.inline_query:
            return (token: string) => handleInlineQuery(token, body.inline_query!);
        case !!body.callback_query:
            return (token: string) => handleCallbackQuery(token, body.callback_query!);
        case !!body.chosen_inline_result:
            return (token: string) => handleChosenInlineQuery(token, body.chosen_inline_result!);
        case !!body.edited_message:
            log.info('Ignore edited message');
            return null;
        default:
            log.info(`Not support message type: ${JSON.stringify(body, null, 2)}`);
            return null;
    }
}

const exitHanders: MessageHandler<any>[] = [new TagNeedDelete()];

export async function handleUpdate(token: string, update: Telegram.Update, headers?: Headers): Promise<Response | null> {
    log.debug(`handleUpdate`, update.message?.chat ?? `callback_query: ${JSON.stringify(update.callback_query?.from, null, 2)}`);
    const isForwarding = headers?.get('User-Agent') === 'Upstash-QStash';
    const messageHandler = loadMessage(update, isForwarding);
    return messageHandler ? messageHandler(token) : null;
}

async function handleMessage(token: string, message: Telegram.Message, isForwarding: boolean) {
    // 消息处理中间件
    const SHARE_HANDLER: MessageHandler<any>[] = [
        // 检查环境是否准备好: DATABASE
        new EnvChecker(),
        // 过滤其他 bot 消息 (Bot API 10.0 Bot-to-Bot)，防止死循环
        new BotToBotFilter(),
        // 过滤非白名单群组/用户, 提前过滤减少KV消耗
        new WhiteListFilter(),
        // 过滤不支持的消息 抽离文件ID
        new MessageFilter(),
        // 忽略旧消息
        new OldMessageFilter(),
        // 处理回复内联消息
        new ReplyInlineHandler(),
        // 处理群消息，判断是否需要响应此条消息
        new GroupMention(),
        // 处理消息分块
        new ChunkMessageHandler(),
        // DEBUG: 保存最后一条消息,按照需求自行调整此中间件位置
        new SaveLastMessage(),
        // 合并引用消息
        new MergeQuote(),
        // 初始化用户配置
        new InitUserConfig(),
        // 记录使用统计
        new RecordStatsHandler(),
        // 过滤被屏蔽的用户
        new BlocklistFilter(),
        // 替换消息
        new SubstituteHandler(),
        // 动态模型处理
        new IntelligentModelProcess(),
        // 处理命令消息
        new CommandHandler(),
        // 检查是否是转发消息
        new CheckForwarding(),
        // 与llm聊天
        new ChatHandler(),
    ];
    // 延迟初始化用户配置
    const context = new WorkerContextBase(token, message);
    context.SHARE_CONTEXT.isForwarding = isForwarding;
    try {
        for (const handler of SHARE_HANDLER) {
            const result = await handler.handle(message, context);
            if (result instanceof Response) {
                break;
            }
        }

        for (const handler of exitHanders) {
            const result = await handler.handle(message, context);
            if (result && result instanceof Response) {
                return result;
            }
        }
    } catch (e) {
        return catchError(e as Error);
    }

    return null;
}

export function catchError(e: Error) {
    console.error(e.message);
    return new Response(JSON.stringify({
        message: e.message,
        stack: e.stack,
    }), { status: 500 });
}
