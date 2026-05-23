import type { ModelMessage, UserModelMessage } from 'ai';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM, loadImageGen } from '../../agent';
import { injectSystemMessage } from '../../agent/chat';
import { ENV } from '../../config/env';
import { ConfigMerger } from '../../config/merger';
import { clearLog, log } from '../../log';
import { createTelegramBotAPI } from '../api';
import { catchError } from '../handler';
import { fileUrlToBase64Message, OnStreamHander } from '../handler/chat';
import { substituteMessage } from '../handler/msg_trimer';
import { SetCommandHandler } from '../command/system';
import { ChosenInlineContext, ChosenInlineSender } from '../utils/send';
import { escape } from '../utils/md2tgmd';
import { extractMessageInfo, getTelegramFile } from '../utils/tg_utils';

export async function handleGuestMessage(token: string, guestMessage: Telegram.Message): Promise<Response | null> {
    log.info(`handleGuestMessage`, guestMessage);
    try {
        const queryId: string | undefined = (guestMessage as any)?.guest_query_id;
        const fromId: number | undefined = guestMessage?.from?.id;

        if (!queryId) {
            log.error('[GUEST] Missing guest_query_id');
            return new Response('missing guest_query_id', { status: 200 });
        }

        const api = createTelegramBotAPI(token);
        const botId = Number.parseInt(token.split(':')[0]);

        if (!ENV.CHAT_WHITE_LIST.includes(`${fromId}`)) {
            log.error(`[GUEST] User ${fromId} not in whitelist`);
            return await answerGuestPlain(api, queryId, ENV.I18N.whitelist.not_in_user_whitelist.replace('{ID}', `${fromId}`));
        }

        const USER_CONFIG = { ...ENV.USER_CONFIG };
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
        USER_CONFIG.ENABLE_SHOWINFO = (ENV as any).INLINE_QUERY_SHOW_INFO ?? USER_CONFIG.ENABLE_SHOWINFO;
        clearLog(USER_CONFIG);

        const agent = loadChatLLM(USER_CONFIG);
        if (!agent) {
            return await answerGuestPlain(api, queryId, 'Agent not configured');
        }

        // Strip @bot prefix BEFORE applying MESSAGE_REPLACER, since substituteMessage
        // only matches trigger words at the start of message.text.
        if (guestMessage.text) {
            guestMessage.text = guestMessage.text.trim().replace(/^@\w+\s*/, '').trim();
        } else if (guestMessage.caption) {
            guestMessage.caption = guestMessage.caption.trim().replace(/^@\w+\s*/, '').trim();
        }

        // Apply MESSAGE_REPLACER trigger words
        if (USER_CONFIG.MESSAGE_REPLACER && (guestMessage.text || guestMessage.caption)) {
            substituteMessage(guestMessage, USER_CONFIG.MESSAGE_REPLACER);
        }

        // Extract base text + reply context (but don't fold them yet — /set runs first)
        const messageInfo = extractMessageInfo(guestMessage, botId);
        let text = (guestMessage.text || guestMessage.caption || '').trim();
        const replyTo = guestMessage.reply_to_message;
        const replyText = (replyTo?.text || replyTo?.caption || '').trim();
        const replyAuthor = replyTo?.from?.username
            ? `@${replyTo.from.username}`
            : (replyTo?.from?.first_name || '');

        // Send placeholder via answerGuestQuery to obtain inline_message_id
        const placeholderResp: any = await api.answerGuestQuery({
            guest_query_id: queryId,
            result: {
                type: 'article',
                id: queryId.slice(0, 64),
                title: 'Thinking...',
                input_message_content: { message_text: 'Thinking...' },
            } as Telegram.InlineQueryResultArticle,
        }).then(r => r.json());

        const inlineMessageId: string | undefined = placeholderResp?.result?.inline_message_id;
        if (!inlineMessageId) {
            log.error(`[GUEST] No inline_message_id from answerGuestQuery: ${JSON.stringify(placeholderResp)}`);
            return new Response('failed to get inline_message_id', { status: 200 });
        }

        // Build sender + stream handler around inline_message_id
        const guestContext = ChosenInlineContext.forGuest(inlineMessageId, text, fromId!);
        // Defensive: OnStreamHander error path (chat.ts L389) unconditionally accesses
        // sender.context.sentMessageIds; pre-seed an empty array so it can't crash.
        (guestContext as any).sentMessageIds = [];
        const sender = new ChosenInlineSender(token, guestContext);
        const fakeContext = {
            USER_CONFIG,
            botToken: token,
            SHARE_CONTEXT: {
                botName: 'AI',
                botToken: token,
                botId,
                telegraphAccessTokenKey: `telegraph_access_token:${fromId}`,
            },
            MIDDLE_CONTEXT: { messageInfo: { type: 'text' } },
        } as any;
        const onStream = OnStreamHander(sender as any, fakeContext, text);

        try {
            // /img command — generate an image and replace the placeholder via editMessageMedia.
            // Inline messages cannot multipart-upload, so the image agent MUST return a public URL.
            if (text.startsWith('/img ') || text === '/img') {
                const prompt = text.slice(4).trim();
                if (!prompt) {
                    return await onStream.end!(ENV.I18N.command.help.img);
                }
                return await handleGuestImg(prompt, messageInfo, token, sender, onStream, USER_CONFIG);
            }

            // /set command support — runs BEFORE reply context is folded into prompt
            if (text.startsWith('/set ')) {
                const setMsg = { text } as unknown as Telegram.Message;
                const setResp = await new SetCommandHandler().handle(setMsg, text.substring(5).trim(), fakeContext, sender as any);
                if (setResp instanceof Response && !replyText) {
                    // Config-only change with nothing else to do — response already sent via sender
                    return setResp;
                }
                text = setMsg.text || '';
            }

            // Fold reply context into prompt
            let promptText = text;
            if (replyText && !messageInfo.id) {
                const quoted = replyAuthor ? `${replyAuthor}: ${replyText}` : replyText;
                promptText = text
                    ? `Context (replied message):\n> ${quoted}\n\nUser asks: ${text}`
                    : `Please respond to this message:\n> ${quoted}`;
            }

            let userParams: UserModelMessage = {
                role: 'user',
                content: promptText || `Please explain the ${messageInfo.type}`,
            };

            if (messageInfo.id && messageInfo.id.length > 0) {
                const urls = await getTelegramFile(messageInfo.id, token, 'url') as string[];
                if (urls.length > 0) {
                    userParams.content = [{
                        type: 'text',
                        text: promptText || (messageInfo.type === 'voice' || messageInfo.type === 'audio'
                            ? (USER_CONFIG.AUDIO_PROMPT || 'Please transcribe and respond to this audio')
                            : `Please explain the ${messageInfo.type}`),
                    }];
                    userParams = await fileUrlToBase64Message({
                        urls,
                        type: messageInfo.type,
                        params: userParams,
                        text: promptText,
                        AUDIO_HANDLE_TYPE: USER_CONFIG.AUDIO_HANDLE_TYPE,
                    });
                }
            }

            if (!userParams.content || (Array.isArray(userParams.content) && userParams.content.length === 0)) {
                return await onStream.end!('Please include a question after the mention.');
            }

            const messages = injectSystemMessage(
                [userParams as ModelMessage],
                USER_CONFIG.SYSTEM_INIT_MESSAGE,
                USER_CONFIG.TIMEZONE,
            );

            const resp = await agent.request({
                messages: messages as ModelMessage[],
            }, USER_CONFIG, ENV.STREAM_MODE ? onStream : null);

            const answer = resp.content || 'Empty response';
            return await onStream.end!(answer);
        } catch (e) {
            onStream.clearHeartbeat!();
            const filtered = (e as Error).message.replace(token, '[REDACTED]');
            return await onStream.sender!.sendRichText(`<pre><code class="language-error">${filtered.substring(0, 2048)}</code></pre>`, 'HTML', 'tip');
        }
    } catch (e) {
        log.error('[GUEST] Error', e);
        return catchError(e as Error);
    }
}

async function answerGuestPlain(api: ReturnType<typeof createTelegramBotAPI>, queryId: string, text: string): Promise<Response> {
    const result: Telegram.InlineQueryResultArticle = {
        type: 'article',
        id: queryId.slice(0, 64),
        title: text.slice(0, 80),
        input_message_content: { message_text: text.slice(0, 4000) },
    };
    const r = await api.answerGuestQuery({ guest_query_id: queryId, result }).then(r => r.json());
    log.info(`[GUEST] answerGuestQuery resp: ${JSON.stringify(r)}`);
    return new Response('success', { status: 200 });
}

async function handleGuestImg(
    prompt: string,
    messageInfo: ReturnType<typeof extractMessageInfo>,
    token: string,
    sender: ChosenInlineSender,
    onStream: ReturnType<typeof OnStreamHander>,
    USER_CONFIG: typeof ENV.USER_CONFIG,
): Promise<Response> {
    const agent = loadImageGen(USER_CONFIG);
    const extraParams: Record<string, any> = {};
    if (['google', 'vertex', 'openai', 'xai', 'bfl'].includes(agent.name)
        && ['image', 'photo'].includes(messageInfo.type)
        && (messageInfo.id?.length || 0) > 0) {
        extraParams.referenceImages = await getTelegramFile(messageInfo.id!, token, ENV.TELEGRAM_IMAGE_TRANSFER_MODE as any);
    }

    const img = await agent.request(prompt, USER_CONFIG, extraParams);
    log.info(`[GUEST] /img generated: url=${JSON.stringify(img.url)} raw_count=${img.raw?.length || 0} text=${img.text}`);

    const url = img.url?.[0];
    if (!url) {
        // Inline messages can't multipart-upload Blobs. If the agent only returned raw bytes,
        // we can't deliver an image — surface a clear error instead of silently failing.
        const msg = img.raw && img.raw.length > 0
            ? `Image agent "${agent.name}" returned raw bytes; guest/inline mode requires a public URL. Configure a URL-returning provider (e.g. bfl, kling) for guest /img.`
            : `${img.text || 'ERROR: No image found'}`;
        return await onStream.end!(msg);
    }

    const captionRaw = (img.caption?.[0] || img.text || prompt).slice(0, 800);
    const caption = escape(captionRaw, { quoteExpandable: true, addQuote: true });

    onStream.clearHeartbeat!();
    return await sender.editMessageMedia({
        type: ENV.SEND_IMAGE_AS_FILE ? 'document' : 'photo',
        media: url,
        caption,
    } as Telegram.InputMedia, ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode);
}
