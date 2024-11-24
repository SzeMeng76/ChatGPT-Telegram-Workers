import type * as Telegram from 'telegram-bot-api-types';
import type { WorkerContext } from '../../config/context';
import type { UnionData } from '../utils/utils';
import type { MessageHandler } from './types';
import { ENV } from '../../config/env';
import { log } from '../../log/logger';
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
    // 旧的触发逻辑
    const oldTrigger = ENV.CHAT_MESSAGE_TRIGGER;
    if (Object.keys(oldTrigger).length > 0) {
        const triggered = Object.entries(oldTrigger).find(([key, _value]) => message.text?.startsWith(key));
        if (triggered) {
            message.text && (message.text = triggered[1] + message.text.substring(triggered[0].length));
            message.caption && (message.caption = triggered[1] + message.caption.substring(triggered[0].length));
            return true;
        } else {
            return false;
        }
    }

    let replacedString = '';
    const textBefore = message.text || message.caption || '';
    let text = textBefore.replace(new RegExp(`^${ENV.CHAT_TRIGGER_PERFIX}`), '').trim();
    const isTrigger = text !== textBefore;
    const replacer = { ...ENV.MESSAGE_REPLACER };
    do {
        const triggerKey = Object.keys(replacer).find(key =>
            // adjust the order of trigger words with the same prefix by yourself.
            text.startsWith(key),
        );
        if (triggerKey) {
            replacedString += `${replacer[triggerKey]} `;
            text = text.substring(triggerKey.length).trim();
            // remove the trigger key from replacer to avoid replace again
            delete replacer[triggerKey];
        } else {
            break;
        }
    } while (true);
    // log.info(`replacedString: ${replacedString || 'null'}, text: ${text}`);
    message.text ? (message.text = replacedString + text) : (message.caption = replacedString + text);
    return isTrigger;
}

export class GroupMention implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const substituteMention = SubstituteWords(message);
        // 非群组消息不作判断，交给下一个中间件处理
        if (!isTelegramChatTypeGroup(message.chat.type)) {
            return this.furtherChecker(message, context);
        }

        // 处理回复消息, 如果回复的是当前机器人的消息交给下一个中间件处理
        const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
        if (replyMe) {
            if (context.SHARE_CONTEXT.botName && message.text?.endsWith(`@${context.SHARE_CONTEXT.botName}`)) {
                message.text = message.text.slice(0, -context.SHARE_CONTEXT.botName.length - 1);
            }
            const data = this.furtherChecker(message, context);
            return data;
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
        // substituteMention
        if ((substituteMention || context.SHARE_CONTEXT.isForwarding) && !isMention) {
            isMention = true;
        }
        const finalCheckResult = await this.furtherChecker(message, context);
        if (finalCheckResult instanceof Response) {
            return finalCheckResult;
        }
        if (!isMention && !finalCheckResult) {
            log.error('Not mention');
            return new Response('Not mention');
        }
        // 开启引用消息，并且不是回复bot，则将引用消息和当前消息合并
        if (ENV.EXTRA_MESSAGE_CONTEXT && !replyMe && message.reply_to_message?.text) {
            message.text = `${message.text || message.caption || ''}\n> ${message.reply_to_message.text}`;
        }

        return null;
    };

    furtherChecker = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        let forwardCheckResult = null;
        if (message.media_group_id || message.reply_to_message?.media_group_id) {
            forwardCheckResult = await new HandleMediaGroupMessage().handle(message, context);
        } else if (message.text) {
            forwardCheckResult = await new HandleChunkMessage().handle(message, context);
        }
        if (forwardCheckResult instanceof Response) {
            return forwardCheckResult;
        }
        return null;
    };
}

// async function chunckMessageCheck(message: Telegram.Message, context: WorkerContext, isMention: boolean) {
//     const chunkMessageKeyPrefix = context.SHARE_CONTEXT?.chunkMessageKeyPrefix;
//     if (!chunkMessageKeyPrefix) {
//         return isMention;
//     }

//     const textFragmentThreshold = 4000;
//     // 第一条消息直接缓存
//     if (isMention && (message.text || '')?.length > textFragmentThreshold) {
//         return chunkMessageStore(message, chunkMessageKeyPrefix);
//     }
//     // polling模式下同时接收多条消息 等待100ms后读取
//     await new Promise(resolve => setTimeout(resolve, 50));
//     const checkAnyChunkMessage = await ENV.DATABASE.list(`${chunkMessageKeyPrefix}:*`);
//     if (checkAnyChunkMessage.length > 0) {
//         if ((message.text || '')?.length > textFragmentThreshold) {
//             return chunkMessageStore(message, chunkMessageKeyPrefix);
//         }
//         // 防止过快读取
//         await new Promise(resolve => setTimeout(resolve, 100));
//         const messageKeys = await ENV.DATABASE.list(`${chunkMessageKeyPrefix}:*`);
//         if (messageKeys.length > 0) {
//             const chuncks = await ENV.DATABASE.get(messageKeys.sort());
//             if (chuncks.length > 0) {
//                 message.text = chuncks.join('') + message.text;
//                 log.info(`[CHUNK MESSAGE] Merged message chunk, text: ${message.text}`);
//             }
//         }
//         return true;
//     }
//     return isMention;

//     async function chunkMessageStore(message: Telegram.Message, chunkMessageKeyPrefix: string) {
//         log.info(`[CHUNK MESSAGE] Stored message chunk, message_id: ${message.message_id}`);
//         return ENV.DATABASE.put(`${chunkMessageKeyPrefix}:${message.message_id}`, message.text!, { expirationTtl: 5 });
//     }
// }

class Lock {
    lockKey = '';
    quireLock = async () => {
        let retry = 0;
        while (retry < 5) {
            await new Promise(resolve => setTimeout(resolve, 200 * retry));
            const lock = await ENV.DATABASE.put(this.lockKey, '1', { expiration: Date.now() + 5000, condition: 'NX' });
            if (lock === true || lock === undefined) {
                return;
            }
            retry++;
        }
        throw new Error('Lock failed');
    };

    releaseLock = async () => {
        await ENV.DATABASE.delete(this.lockKey);
    };
}

class HandleChunkMessage extends Lock {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<any> => {
        const chunkMessageKey = context.SHARE_CONTEXT?.chunkMessageKey;
        if (!chunkMessageKey) {
            return null;
        }

        const textFragmentThreshold = 4000;
        if ((message.text || '')?.length > textFragmentThreshold) {
            this.lockKey = `${chunkMessageKey}:lock`;
            await this.quireLock();
            await this.chunkMessageStore(message, chunkMessageKey);
            await this.releaseLock();
            return new Response('ok');
        }
        // 异步会同时接收多条消息 等待50ms
        await new Promise(resolve => setTimeout(resolve, 50));
        log.info(`[CHUNK MESSAGE] handle chunk message, key: ${chunkMessageKey}`);
        const chuncks = JSON.parse(await ENV.DATABASE.get(chunkMessageKey) || '[]');
        if (chuncks.length > 0) {
            message.text = chuncks
                .sort((a: { message_id: number }, b: { message_id: number }) => a.message_id - b.message_id)
                .map(({ text }: { text: string }) => text)
                .join('\n') + message.text;
            log.info(`[CHUNK MESSAGE] Merged message chunk, text: ${message.text}`);
            await ENV.DATABASE.delete(chunkMessageKey);
            return true;
        }
        log.info('No chunk message');
        return false;
    };

    async chunkMessageStore(message: Telegram.Message, chunkMessageKey: string) {
        log.info(`[CHUNK MESSAGE] Stored message chunk, message_id: ${message.message_id} key: ${chunkMessageKey}`);
        const data = JSON.parse(await ENV.DATABASE.get(chunkMessageKey) || '[]');
        data.push({
            message_id: message.message_id,
            text: message.text,
        });
        return ENV.DATABASE.put(chunkMessageKey, JSON.stringify(data), { expirationTtl: 5000 });
    }
}

class HandleMediaGroupMessage extends Lock {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const storeMediaMessageKey = context.SHARE_CONTEXT?.storeMediaMessageKey;
        if (!storeMediaMessageKey) {
            return null;
        }
        const msgInfo = context.MIDDLE_CONTEXT.originalMessageInfo;
        if (message.media_group_id && ['photo', 'image'].includes(msgInfo.type) && Array.isArray(msgInfo.id)) {
            return this.storeMediaMessage(message, storeMediaMessageKey, msgInfo);
        } else if (message.reply_to_message?.media_group_id) {
            const data: Record<string, string[]> = JSON.parse(await ENV.DATABASE.get(storeMediaMessageKey) || '{}');
            const fileIds = data[message.reply_to_message.media_group_id];
            if (fileIds) {
                context.MIDDLE_CONTEXT.originalMessageInfo.id = fileIds;
            }
        }
        return null;
    };

    storeMediaMessage = async (message: Telegram.Message, storeMediaMessageKey: string, msgInfo: UnionData) => {
        const maxMediaGroupNum = 10;
        this.lockKey = `${storeMediaMessageKey}:lock`;
        await this.quireLock();
        const data: Record<string, string[]> = JSON.parse(await ENV.DATABASE.get(storeMediaMessageKey) || '{}');
        if (!data[msgInfo.media_group_id!]) {
            data[msgInfo.media_group_id!] = [];
        }
        const needStoreIds = msgInfo.id?.filter((id: string) => !data[msgInfo.media_group_id!].includes(id)) || [];
        if (needStoreIds.length === 0) {
            await this.releaseLock();
            log.info('no need store');
            return new Response('no need store');
        }
        data[msgInfo.media_group_id!].push(...needStoreIds);
        if (Object.keys(data).length > maxMediaGroupNum) {
            const groupIds = Object.keys(data).sort((a, b) => Number(a) - Number(b));
            groupIds.splice(0, groupIds.length - maxMediaGroupNum).forEach((key) => {
                delete data[key];
            });
        }
        await ENV.DATABASE.put(storeMediaMessageKey, JSON.stringify(data));
        await this.releaseLock();
        log.info(`[STORE MESSAGE] Store message media, group_id: ${msgInfo.media_group_id}, id: ${msgInfo.id}`);
        return new Response('ok');
    };
}
