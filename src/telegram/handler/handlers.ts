/* eslint-disable unused-imports/no-unused-vars */
import type * as Telegram from 'telegram-bot-api-types';
import type { ImageResult } from '../../agent/types';
import type { WorkerContextBase } from '../../config/context';
import type { UnionData } from '../utils/tg_utils';
import type { MessageHandler } from './types';
import { WorkerContext } from '../../config/context';
import { ENV } from '../../config/env';
import { log, tagMessageIds } from '../../log';
import { Rerank } from '../../utils/data_calculation/rerank';
import { createTelegramBotAPI } from '../api';
import { handleCommandMessage } from '../command';
import { isAuthorized } from '../query';
import { MessageSender } from '../utils/send';
import { extractMessageInfo, isAnonymousGroupSender, isTelegramChatTypeGroup } from '../utils/tg_utils';
import { HandleChunkMessage, HandleMediaGroupMessage, substituteMessage } from './msg_trimer';
import { recordUserActivity } from '../../utils/stats';

export class SaveLastMessage implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        if (!ENV.DEBUG_MODE) {
            return null;
        }
        const lastMessageKey = `last_message:${context.SHARE_CONTEXT.chatHistoryKey}`;
        await ENV.DATABASE.put(lastMessageKey, JSON.stringify(message));
        return null;
    };
}

export class OldMessageFilter implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        if (!ENV.SAFE_MODE || context.SHARE_CONTEXT.isForwarding) {
            return null;
        }
        let idList = [];
        try {
            idList = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => '[]')) || [];
        } catch (e) {
            console.error(e);
        }
        // 保存最近的100条消息，如果存在则忽略，如果不存在则保存
        if (idList.includes(message.message_id)) {
            throw new Error('Ignore old message');
        } else {
            idList.push(message.message_id);
            if (idList.length > 100) {
                idList.shift();
            }
            await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
        }
        return null;
    };
}

export class EnvChecker implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        if (!ENV.DATABASE) {
            return MessageSender
                .from(context.SHARE_CONTEXT.botToken, message)
                .sendPlainText('DATABASE Not Set');
        }
        return null;
    };
}

export class BotToBotFilter implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        if (!message.from?.is_bot) {
            return null;
        }
        // 群匿名管理员: from 是 GroupAnonymousBot 但其实是真人在群里发言, 必须放行
        if (isAnonymousGroupSender(message)) {
            return null;
        }
        if (!ENV.ENABLE_BOT_TO_BOT) {
            log.info(`[BOT-TO-BOT] Ignored message from bot ${message.from.username ?? message.from.id} (disabled)`);
            return new Response('success', { status: 200 });
        }
        const senderBotId = `${message.from.id}`;
        if (`${message.from.id}` === `${context.SHARE_CONTEXT.botId}`) {
            log.info(`[BOT-TO-BOT] Ignored self-message to prevent loop`);
            return new Response('success', { status: 200 });
        }
        const allowAll = ENV.ALLOWED_BOT_IDS.includes('*');
        if (!allowAll && !ENV.ALLOWED_BOT_IDS.includes(senderBotId)) {
            log.info(`[BOT-TO-BOT] Bot ${message.from.username ?? senderBotId} not in ALLOWED_BOT_IDS`);
            return new Response('success', { status: 200 });
        }
        return null;
    };
}

export class WhiteListFilter implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        if (ENV.I_AM_A_GENEROUS_PERSON) {
            return null;
        }
        const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);

        // 判断私聊消息
        if (message.chat.type === 'private') {
            // 白名单判断
            if (!ENV.CHAT_WHITE_LIST.includes(`${message.chat.id}`)) {
                log.error(`[WHITE LIST] ${message.chat.id} ${message.from?.username ?? message.from?.first_name ?? ''} not in white list`);
                const text = ENV.I18N.whitelist.not_in_user_whitelist.replace('{ID}', `${message.chat.id}`);
                return sender.sendPlainText(text);
            }
            return null;
        }

        // 判断群组消息
        if (isTelegramChatTypeGroup(message.chat.type)) {
            // 未打开群组机器人开关,直接忽略
            if (!ENV.GROUP_CHAT_BOT_ENABLE) {
                throw new Error('Not support');
            }
            // 白名单判断
            if (!ENV.CHAT_GROUP_WHITE_LIST.includes(`${message.chat.id}`)) {
                log.error(`[WHITELIST] ${message.chat.id} ${message.chat.username ?? ''} not in whitelist`);
                const text = ENV.I18N.whitelist.not_in_group_whitelist.replace('{ID}', `${message.chat.id}`);
                return sender.sendPlainText(text);
            }
            return null;
        }

        return sender.sendPlainText(
            `Not support chat type: ${message.chat.type}`,
        );
    };
}

export class MessageFilter implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        if (ENV.IGNORE_TEXT_PREFIX && (message.text || message.caption || '').startsWith(ENV.IGNORE_TEXT_PREFIX)) {
            log.info(`[IGNORE MESSAGE] Ignore message`);
            return new Response('success', { status: 200 });
        }
        const messageInfo = extractMessageInfo(message, context.SHARE_CONTEXT.botId);
        const supportMessageType = ENV.ENABLE_FILE === false ? ['text'] : ENV.SUPPORT_FORMAT;
        const types = [messageInfo.original_type, messageInfo.type];
        if (!types.every(type => supportMessageType.includes(type!))) {
            log.info(`[MESSAGE FILTER] Not supported message type: ${types.join(', ')}`);
            return new Response('success', { status: 200 });
        }
        context.MIDDLE_CONTEXT.messageInfo = messageInfo;
        return null;
    };
}

export class CommandHandler implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | UnionData | ImageResult | null> => {
        if (message.text || message.caption) {
            return await handleCommandMessage(message, context);
        }
        // 非文本消息不作处理
        return null;
    };
}

export class InitUserConfig implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        Object.assign(context, { USER_CONFIG: (await WorkerContext.from(context.SHARE_CONTEXT, context.MIDDLE_CONTEXT)).USER_CONFIG });

        // 兼容旧的DROPS_OPENAI_PARAMS
        const paramsModifier = new Set((context as WorkerContext).USER_CONFIG.PARAMS_MODIFIER);
        for (const [model, params] of Object.entries((context as WorkerContext).USER_CONFIG.DROPS_OPENAI_PARAMS)) {
            paramsModifier.add(`${model}:${params.split(',').map(param => `-${param}`).join('|')}`);
        }
        (context as WorkerContext).USER_CONFIG.PARAMS_MODIFIER = Array.from(paramsModifier);
        return null;
    };
}

export class SubstituteHandler implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (context.USER_CONFIG.MESSAGE_REPLACER && (message.text || message.caption)) {
            substituteMessage(message, context.USER_CONFIG.MESSAGE_REPLACER);
        }
        return null;
    };
}

export class TagNeedDelete implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        // 未记录消息
        if ((tagMessageIds.get(message) ?? new Set()).size === 0) {
            return null;
        }
        const botName = context.SHARE_CONTEXT?.botName;
        if (!botName) {
            throw new Error('Cannot find Bot Name, cannot set scheduled deletion.');
        }

        const chatId = message.chat.id;
        const scheduleDeteleKey = context.SHARE_CONTEXT.scheduleDeteleKey;
        const scheduledData = JSON.parse((await ENV.DATABASE.get(scheduleDeteleKey)) || '{}');
        if (!scheduledData[botName]) {
            scheduledData[botName] = {};
        }
        if (!scheduledData[botName][chatId]) {
            scheduledData[botName][chatId] = [];
        }
        const offsetInMillisenconds = ENV.EXPIRED_TIME * 60 * 1000;
        scheduledData[botName][chatId].push({
            id: [...(tagMessageIds.get(message) || [])],
            ttl: Date.now() + offsetInMillisenconds,
        });

        await ENV.DATABASE.put(scheduleDeteleKey, JSON.stringify(scheduledData));
        log.info(`[TAG MESSAGE] Record chat ${chatId}, message ids: ${[...(tagMessageIds.get(message) || [])]}`);
        return null;
    };
}

export class CheckForwarding implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (ENV.QSTASH_PUBLISH_URL && ENV.QSTASH_TOKEN && ENV.QSTASH_TRIGGER_PREFIX && !context.SHARE_CONTEXT.isForwarding) {
            let text = (message.text || message.caption || '').trim();
            if (text.startsWith(ENV.QSTASH_TRIGGER_PREFIX)) {
                text = text.slice(ENV.QSTASH_TRIGGER_PREFIX.length);
                if (message.text) {
                    message.text = text;
                } else {
                    message.caption = text;
                }
                const QSTASH_REQUEST_URL = `${ENV.QSTASH_URL}/v2/publish/${ENV.QSTASH_PUBLISH_URL}/telegram/${context.SHARE_CONTEXT.botToken}/webhook`;
                log.info(`[FORWARD] Forward message to Qstash`);
                const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
                await sender.sendRichText('`Forwarding message to Qstash`', 'MarkdownV2', 'tip');
                return await fetch(QSTASH_REQUEST_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ENV.QSTASH_TOKEN}`,
                        'Upstash-Timeout': `${ENV.QSTASH_TIMEOUT}`,
                        // no retry
                        'Upstash-Retries': '0',
                    },
                    body: JSON.stringify({
                        message,
                    }),
                });
            }
        }
        return null;
    };
}

export class IntelligentModelProcess implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (!context.USER_CONFIG.ENABLE_INTELLIGENT_MODEL) {
            return null;
        }

        const regex = /^\s*\/\/([cvts])\s*(\S+)/;
        const text = new RegExp(regex).exec((message.text || message.caption || '').trim());

        if (!text?.[1] || !text[2])
            return null;

        const rerank = new Rerank();
        const sendTipPromise = this.sendTip(context, message);
        try {
            const agentModelKey = `${context.USER_CONFIG.AI_CHAT_PROVIDER.toUpperCase()}_MODELS`;
            const models = context.USER_CONFIG[agentModelKey] || [];
            if (models.length === 0) {
                throw new Error('Don\'t have any model, please set/refresh model list first.');
            }
            const similarityModel = (await rerank.rank(context.USER_CONFIG, [text[2], ...models], 1))[0].value;
            if (!similarityModel) {
                return this.editTip(context, (await sendTipPromise).result, 'No similarity model found');
            }
            log.info(`[INTELLIGENT MODEL] find similarity model: ${similarityModel}`);
            const mode = text[1];
            let textReplace = `/set `;
            switch (mode) {
                case 'c':
                    textReplace += `-CHAT_MODEL`;
                    break;
                case 'v':
                    textReplace += `-VISION_MODEL`;
                    break;
                case 't':
                    textReplace += `-TOOL_MODEL`;
                    break;
                case 's':
                    textReplace += `-TTS_MODEL`;
                    break;
            }
            textReplace += ` ${similarityModel}`;
            if (message.text) {
                message.text = textReplace + message.text.slice(text[0].length);
            } else if (message.caption) {
                message.caption = textReplace + message.caption.slice(text[0].length);
            }
            this.deleteTip(context, (await sendTipPromise).result);
        } catch (error) {
            return this.editTip(context, (await sendTipPromise).result, (error as Error).message, 'Error');
        }
        return null;
    };

    sendTip = (context: WorkerContext, message: Telegram.Message) => {
        const tip = 'Searching for similarity result...';
        const sendeParams: Telegram.SendMessageParams = {
            chat_id: message.chat.id,
            text: tip,
            message_thread_id: message.is_topic_message && message.message_thread_id ? message.message_thread_id : undefined,
            entities: [{
                type: 'italic',
                offset: 0,
                length: tip.length,
            }],
        };
        return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessageWithReturns(sendeParams);
    };

    deleteTip = (context: WorkerContext, message: Telegram.Message) => {
        const delParams: Telegram.DeleteMessageParams = {
            message_id: message.message_id,
            chat_id: message.chat.id,
        };
        log.info('delete similarity tip.');
        return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).deleteMessage(delParams);
    };

    editTip = async (context: WorkerContext, message: Telegram.Message, tip: string, type = 'Tip') => {
        const editParams: Telegram.EditMessageTextParams = {
            chat_id: message.chat.id,
            message_id: message.message_id,
            text: tip,
            entities: [{
                type: 'pre',
                offset: 0,
                length: tip.length,
                language: type,
            }],
        };
        return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).editMessageText(editParams);
    };
}

export class ReplyInlineHandler implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const isMyInlineSetMessage = this.isMyInlineSetMessage(message, context);
        const authorized = isAuthorized(message?.from?.id ?? 0, message.reply_to_message?.reply_markup?.inline_keyboard ?? []);
        if (!isMyInlineSetMessage || !authorized) {
            return null;
        }
        const inlineKeyboard = message.reply_to_message!.reply_markup!.inline_keyboard.flat();
        const variable = inlineKeyboard.find(i => i.text.startsWith('✅'))?.text.split('✅')[1];
        if (variable) {
            message.text = `/set -${variable} ${message.text}`;
        } else {
            return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage({
                chat_id: message.chat.id,
                text: '```Tip\n选中变量后再进行回复\n```',
                parse_mode: 'MarkdownV2',
            });
        }
        return null;
    };

    isMyInlineSetMessage = (message: Telegram.Message, context: WorkerContext) => {
        const isMyMessage = message.reply_to_message?.from?.id === Number(context.SHARE_CONTEXT.botId);
        const isInlineSetMessage = (message.reply_to_message?.reply_markup?.inline_keyboard?.[0]?.[0]?.callback_data ?? '').endsWith(':set');
        return isMyMessage && isInlineSetMessage;
    };
}

export class MergeQuote implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const isReplyMe = message.reply_to_message?.from?.id === Number(context.SHARE_CONTEXT.botId);
        const quoteText = message.quote?.text || '';
        const replyText = message.reply_to_message?.text || message.reply_to_message?.caption || '';

        // 检查是否是回复媒体消息（即使没有文字）
        const hasReplyMedia = message.reply_to_message?.photo ||
                             message.reply_to_message?.video ||
                             message.reply_to_message?.voice ||
                             message.reply_to_message?.audio ||
                             message.reply_to_message?.document ||
                             message.reply_to_message?.sticker ||
                             message.reply_to_message?.animation;

        // 开启引用消息且
        // 不是回复bot且包含回复消息（文字或媒体） 或 是引用消息 则将回复/引用消息和当前消息合并
        if (ENV.EXTRA_MESSAGE_CONTEXT && ((!isReplyMe && (replyText || hasReplyMedia)) || quoteText)) {
            // Get the user identifier of the person being replied to
            let attributedQuote = quoteText || replyText;

            // 如果是媒体但没有文字，添加媒体类型说明
            if (!attributedQuote && hasReplyMedia) {
                if (message.reply_to_message?.photo) {
                    attributedQuote = '[photo]';
                } else if (message.reply_to_message?.video) {
                    attributedQuote = '[video]';
                } else if (message.reply_to_message?.voice) {
                    attributedQuote = '[voice message]';
                } else if (message.reply_to_message?.audio) {
                    attributedQuote = '[audio]';
                } else if (message.reply_to_message?.document) {
                    attributedQuote = '[document]';
                } else if (message.reply_to_message?.sticker) {
                    attributedQuote = '[sticker]';
                } else if (message.reply_to_message?.animation) {
                    attributedQuote = '[GIF]';
                }
            }

            if (!isReplyMe && message.reply_to_message?.from) {
                const replyUser = message.reply_to_message.from;
                let replyUserInfo = '';
                if (replyUser.username) {
                    replyUserInfo = `@${replyUser.username} (ID:${replyUser.id})`;
                } else if (replyUser.last_name) {
                    replyUserInfo = `${replyUser.first_name} ${replyUser.last_name} (ID:${replyUser.id})`;
                } else {
                    replyUserInfo = `${replyUser.first_name} (ID:${replyUser.id})`;
                }
                // Add user attribution at the END of the quoted message
                attributedQuote = `${attributedQuote} — ${replyUserInfo}`;
            }
            message.text = `${message.text || message.caption || ''}\n> ${attributedQuote}`;
        }
        return null;
    };
}

export class ChunkMessageHandler implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (message.media_group_id || message.reply_to_message?.media_group_id) {
            return HandleMediaGroupMessage.handle(message, context);
        } else if (message.text) {
            return HandleChunkMessage.handle(message, context);
        }
        return null;
    };
}

export class BlocklistFilter implements MessageHandler<WorkerContext> {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const blocklist = context.USER_CONFIG.BLOCKLIST;
        const userId = message.from?.id?.toString() ?? '';
        // if user in global whitelist, not block
        if (!ENV.CHAT_WHITE_LIST.includes(userId) && blocklist.includes(userId)) {
            log.info(`[BLOCK] ${message.from?.id} ${message.from?.username ?? message.from?.first_name ?? ''} in blocklist`);
            return new Response('success', { status: 200 });
        }
        return null;
    };
}

export class RecordStatsHandler implements MessageHandler<WorkerContextBase> {
    handle = async (message: Telegram.Message, context: WorkerContextBase): Promise<Response | null> => {
        // 异步记录统计，不阻塞主流程
        recordUserActivity(context, message).catch(e => console.error('Stats error:', e));
        return null;
    };
}
