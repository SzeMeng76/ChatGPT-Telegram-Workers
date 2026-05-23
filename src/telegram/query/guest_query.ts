import type { ModelMessage } from 'ai';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM } from '../../agent';
import { injectSystemMessage } from '../../agent/chat';
import { ENV } from '../../config/env';
import { ConfigMerger } from '../../config/merger';
import { log } from '../../log/logger';
import { createTelegramBotAPI } from '../api';
import { catchError } from '../handler';

export async function handleGuestMessage(token: string, guestMessage: any): Promise<Response | null> {
    log.info(`handleGuestMessage`, guestMessage);
    try {
        const queryId: string | undefined = guestMessage?.guest_query_id;
        const fromId: number | undefined = guestMessage?.from?.id;
        const text: string = (guestMessage?.text || guestMessage?.caption || '').trim();
        const replyTo = guestMessage?.reply_to_message;
        const replyText: string = (replyTo?.text || replyTo?.caption || '').trim();
        const replyAuthor: string = replyTo?.from?.username
            ? `@${replyTo.from.username}`
            : (replyTo?.from?.first_name || '');

        if (!queryId) {
            log.error('[GUEST] Missing guest_query_id');
            return new Response('missing guest_query_id', { status: 200 });
        }

        const api = createTelegramBotAPI(token);

        if (!ENV.CHAT_WHITE_LIST.includes(`${fromId}`)) {
            log.error(`[GUEST] User ${fromId} not in whitelist`);
            return await answerGuest(api, queryId, ENV.I18N.whitelist.not_in_user_whitelist.replace('{ID}', `${fromId}`));
        }

        let question = text.replace(/^@\w+\s*/, '').trim();

        if (replyText) {
            const quoted = replyAuthor ? `${replyAuthor}: ${replyText}` : replyText;
            question = question
                ? `Context (replied message):\n> ${quoted}\n\nUser asks: ${question}`
                : `Please respond to this message:\n> ${quoted}`;
        }

        if (!question) {
            return await answerGuest(api, queryId, 'Please include a question after the mention.');
        }

        const USER_CONFIG = { ...ENV.USER_CONFIG };
        const botId = Number.parseInt(token.split(':')[0]);
        const userConfigKey = `user_config:${fromId}${botId ? `:${botId}` : ''}`;
        try {
            const stored = await ENV.DATABASE.get(userConfigKey);
            if (stored) {
                const userConfig = JSON.parse(stored);
                ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
            }
        } catch (e) {
            console.warn(e);
        }

        const agent = loadChatLLM(USER_CONFIG);
        if (!agent) {
            return await answerGuest(api, queryId, 'Agent not configured');
        }

        const messages = injectSystemMessage(
            [{ role: 'user', content: question }],
            USER_CONFIG.SYSTEM_INIT_MESSAGE,
            USER_CONFIG.TIMEZONE,
        );

        const resp = await agent.request({
            messages: messages as ModelMessage[],
        }, USER_CONFIG, null);

        const answer = resp.content || 'Empty response';
        return await answerGuest(api, queryId, answer);
    } catch (e) {
        log.error('[GUEST] Error', e);
        return catchError(e as Error);
    }
}

async function answerGuest(api: ReturnType<typeof createTelegramBotAPI>, queryId: string, text: string): Promise<Response> {
    const result: Telegram.InlineQueryResultArticle = {
        type: 'article',
        id: queryId.slice(0, 64),
        title: text.slice(0, 80),
        input_message_content: {
            message_text: text.slice(0, 4000),
        },
    };
    const r = await api.answerGuestQuery({
        guest_query_id: queryId,
        result,
    }).then(r => r.json());
    log.info(`[GUEST] answerGuestQuery resp: ${JSON.stringify(r)}`);
    return new Response('success', { status: 200 });
}
