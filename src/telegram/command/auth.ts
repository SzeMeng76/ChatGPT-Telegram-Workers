import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '../../config/env';
import { createTelegramBotAPI } from '../api';
import { isAnonymousGroupSender } from '../utils/tg_utils';

export async function loadChatRoleWithContext(message: Telegram.Message, context: any, isCallbackQuery: boolean = false): Promise<string | null> {
    const { groupAdminsKey } = context.SHARE_CONTEXT;

    const chatId = message.chat.id;
    const speakerId = isCallbackQuery ? context?.from?.id : message.from?.id || chatId;

    if (!groupAdminsKey) {
        return null;
    }

    // 匿名管理员/owner: from 是 GroupAnonymousBot, 在 getChatAdministrators 里查不到.
    // Telegram 规则: 只有被授予 is_anonymous 权限的管理员/owner 才能匿名发言,
    // 因此匿名身份本身就等同于至少 administrator 级别.
    if (!isCallbackQuery && isAnonymousGroupSender(message)) {
        return 'administrator';
    }

    let groupAdmin: Telegram.ChatMember[] | null = null;
    try {
        groupAdmin = JSON.parse(await ENV.DATABASE.get(groupAdminsKey));
    } catch (e) {
        console.error(e);
    }
    if (groupAdmin === null || !Array.isArray(groupAdmin) || groupAdmin.length === 0) {
        const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
        const result = await api.getChatAdministratorsWithReturns({ chat_id: chatId });
        if (result == null) {
            return null;
        }
        groupAdmin = result.result;
        // 缓存120s
        await ENV.DATABASE.put(
            groupAdminsKey,
            JSON.stringify(groupAdmin),
            { expiration: (Date.now() / 1000) + 120 },
        );
    }
    for (const user of groupAdmin) {
        if (`${user.user?.id}` === `${speakerId}`) {
            return user.status;
        }
    }
    return 'member';
}
