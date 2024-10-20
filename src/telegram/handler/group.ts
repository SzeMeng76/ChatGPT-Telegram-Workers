import type * as Telegram from 'telegram-bot-api-types';
import type { WorkerContext } from '../../config/context';
import type { MessageHandler } from './types';
import { ENV } from '../../config/env';
import { createTelegramBotAPI } from '../api';
import { isTelegramChatTypeGroup } from '../utils/utils';

function checkMention(content: string, entities: Telegram.MessageEntity[], botName: string, botId: number): {
    isMention: boolean;
    content: string;
} {
    let isMention = false;
    for (const entity of entities) {
        const entityStr = content.slice(entity.offset, entity.offset + entity.length);
        switch (entity.type) {
            case 'mention': // "mention"适用于有用户名的普通用户
                if (entityStr === `@${botName}`) {
                    isMention = true;
                    content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
                }
                break;
            case 'text_mention': // "text_mention"适用于没有用户名的用户或需要通过ID提及用户的情况
                if (`${entity.user?.id}` === `${botId}`) {
                    isMention = true;
                    content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
                }
                break;
            case 'bot_command': // "bot_command"适用于命令
                if (entityStr.endsWith(`@${botName}`)) {
                    isMention = true;
                    const newEntityStr = entityStr.replace(`@${botName}`, '');
                    content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
                }
                break;
            default:
                break;
        }
    }
    return {
        isMention,
        content,
    };
}

/**
 * 处理替换词
 *
 * @param {Telegram.Message} message
 * @returns {boolean} 如果找到触发词，返回 true；否则 false
 */
export function SubstituteWords(message: Telegram.Message): boolean {
    if (Object.keys(ENV.CHAT_MESSAGE_TRIGGER).length === 0) {
        return false;
    }
    // 检查替换词
    const triggerKeyValue = Object.entries(ENV.CHAT_MESSAGE_TRIGGER).find(([key]) =>
        (message?.text || message?.caption || '').startsWith(key),
    ) as [string, string] | undefined;
    if (triggerKeyValue) {
        if (message.text) {
            message.text = message.text.replace(...triggerKeyValue);
        } else if (message.caption) {
            message.caption = message.caption.replace(...triggerKeyValue);
        }
    }
    return !!triggerKeyValue;
}

export class GroupMention implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const substituteMention = SubstituteWords(message);
        // 非群组消息不作判断，交给下一个中间件处理
        if (!isTelegramChatTypeGroup(message.chat.type)) {
            // 缓存修整后的消息
            context.MIDDEL_CONTEXT.originalMessage.text = message.text || message.caption || '';
            return null;
        }

        // 处理回复消息, 如果回复的是当前机器人的消息交给下一个中间件处理
        const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
        if (replyMe) {
            context.MIDDEL_CONTEXT.originalMessage.text = message.text || message.caption || '';
            return null;
        }

        // 处理群组消息，过滤掉AT部分
        let botName = context.SHARE_CONTEXT.botName;
        if (!botName) {
            const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
            botName = res.result.username || null;
            context.SHARE_CONTEXT.botName = botName;
        }
        if (!botName) {
            throw new Error('Not set bot name');
        }
        let isMention = false;
        // 检查text中是否有机器人的提及
        if (message.text && message.entities) {
            const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention;
            message.text = res.content.trim();
        }
        // 检查caption中是否有机器人的提及
        if (message.caption && message.caption_entities) {
            const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention || isMention;
            message.caption = res.content.trim();
        }
        // substituteMention 强制触发
        if (substituteMention && !isMention) {
            isMention = true;
        }
        if (!isMention) {
            throw new Error('Not mention');
        }
        // 开启引用消息，并且不是回复bot，则将引用消息和当前消息合并
        if (ENV.EXTRA_MESSAGE_CONTEXT && !replyMe && message.reply_to_message?.text) {
            message.text = `${message.text || message.caption || ''}\n> ${message.reply_to_message.text}`;
        }
        // 缓存修整后的消息
        context.MIDDEL_CONTEXT.originalMessage.text = message.text;

        return null;
    };
}
