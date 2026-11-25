import type * as Telegram from 'telegram-bot-api-types';
import type { AgentUserConfig, WorkerContext } from '../../config/types';
import type { TelegramBotAPI } from '../api';
import type { InlineItem } from '../command/types';
import type { MessageHandler } from '../handler/types';
import type { CallbackQueryHandler } from './types';
import { WorkerContextBase } from '../../config/context';
import { ENV } from '../../config/env';
import { log } from '../../log/logger';
import { createTelegramBotAPI } from '../api';
import { InlineCommandHandler } from '../command/system';
import { catchError } from '../handler';
import { EnvChecker, InitUserConfig } from '../handler/handlers';
import { escape } from '../utils/md2tgmd';
import { chunkArray } from '../utils/tg_utils';
import { CallbackQueryContext } from './context';

class HandlerCallbackQuery implements CallbackQueryHandler<CallbackQueryContext> {
    handle = async (query: Telegram.CallbackQuery, context: CallbackQueryContext): Promise<Response | null> => {
        const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);

        // Handle inline_message_id case (new in Bot API 10.5)
        if (!query.message && query.inline_message_id) {
            log.warn('[CALLBACK QUERY] Callback from inline message is not supported yet');
            return this.sendAlert(api, context.query_id, `⚠️ Inline message callbacks not supported yet`, true);
        }

        // Check if message exists and is accessible
        if (!query.message || 'is_inaccessible' in query.message) {
            log.error('[CALLBACK QUERY] Message is not accessible or missing');
            return this.sendAlert(api, context.query_id, `⚠️ Message not accessible`, true);
        }

        const message = query.message as Telegram.Message;
        const keyboard = message.reply_markup?.inline_keyboard ?? [];
        const authorized = isAuthorized(query.from?.id ?? 0, keyboard);
        // 未授权
        if (!authorized) {
            log.error(`[CALLBACK QUERY] User ${context.from.first_name}, id: ${context.from.id} not in the white list`);
            return this.sendAlert(api, context.query_id, `⚠️ This is not your operation`, true);
        }
        // 不支持的回调查询类型
        if (!query.data || !message.reply_markup) {
            return new Response('Not supported callback query type', { status: 200 });
        }
        // 标题/页码
        if (query.data.startsWith(query.from.id.toString()) || query.data.startsWith('PAGE_INDEX:')) {
            return new Response('success', { status: 200 });
        }
        // 关闭内联键盘
        if (query.data === 'close') {
            return this.closeInlineKeyboard(api, message);
        }

        const [row = 5, col = 3] = ENV.CALLBACK_QUERY_RC.split('x').map(Number);
        const pageLength = row * col;
        console.log(`[DEBUG] CALLBACK_QUERY_RC=${ENV.CALLBACK_QUERY_RC}, row=${row}, col=${col}, pageLength=${pageLength}`);
        const queryHandler = new InlineCommandHandler();
        const defaltData = await queryHandler.defaultInlines(context.USER_CONFIG);
        console.log(`[DEBUG] defaltData.length=${defaltData.length}, callbackData=${query.data}`);
        const pageIndexData = keyboard.flat().find(i => i.callback_data?.startsWith('PAGE_INDEX:'))?.callback_data?.replace('PAGE_INDEX:', '');
        console.log(`[DEBUG] pageIndexData=${pageIndexData}`);
        const pathDetail = keyboard[0]?.[0]?.callback_data || '';
        let { path, data, pageIndex, pageNum, newCallBackData, configKey, label, callback } = getNextpage({ pathDetail, pageIndexData, callbackData: query.data, inlineList: defaltData, pageLength });
        console.log(`[DEBUG] After getNextpage: data.length=${data.length}, pageIndex=${pageIndex}, pageNum=${pageNum}, newCallBackData=${newCallBackData}`);

        try {
            if (query.data === 'fresh' || (configKey.endsWith('_MODEL') && data.length === 0)) {
                if (configKey === 'USE_MCP' && query.from?.id && !(ENV.CHAT_WHITE_LIST.includes(query.from.id.toString()))) {
                    throw new Error('This operation is only accessible to the white list');
                }
                data = await callback?.(context, configKey) || [];
                this.sendAlert(api, context.query_id, `✅ ${label} 数据更新成功`, false);
                ({ data, pageNum } = paging(data, 0, pageLength));
            } else if (typeof newCallBackData === 'number' && configKey !== 'ENVS') {
                await this.updateConfig(context, api, { data: data as unknown as string[], configKey, newCallBack: newCallBackData });
            }
        } catch (e) {
            return this.sendAlert(api, context.query_id, `❌ ${label} 数据刷新失败\n${(e as Error).message}`, true);
        }

        let inlineKeyboard: Telegram.InlineKeyboardButton[][] = [];
        inlineKeyboard = this.constructInlineList(
            {
                path,
                data,
                pageIndex,
                pageNum,
                col,
                label,
                key: configKey,
                config: context.USER_CONFIG,
                callbackData: newCallBackData,
                callback,
            },
        );
        const newData = await queryHandler.defaultInlines(context.USER_CONFIG);
        const settingMessage = queryHandler.settingsMessage(context.USER_CONFIG, newData, {
            key: configKey,
            callBack: typeof newCallBackData === 'number' ? data[newCallBackData] : '',
        });

        return this.sendCallBackMessage(api, message, settingMessage, inlineKeyboard);
    };

    private async sendAlert(api: TelegramBotAPI, query_id: string, text: string, show_alert?: boolean, cache_time?: number) {
        return api.answerCallbackQuery({
            callback_query_id: query_id,
            text,
            show_alert,
            cache_time,
        });
    }

    private async updateConfig(context: CallbackQueryContext, api: TelegramBotAPI, data: { data: string[]; configKey: string; newCallBack: number }) {
        const { data: dataList, configKey, newCallBack } = data;
        if (!Object.hasOwn(context.USER_CONFIG, configKey)) {
            return;
        }
        const oldValue = context.USER_CONFIG[configKey];
        const newValue = dataList[newCallBack];
        const type = Array.isArray(oldValue) ? 'array' : typeof oldValue;
        switch (type) {
            case 'string':
            case 'boolean':
            case 'undefined':
                if (oldValue === newValue) {
                    return;
                } else {
                    context.USER_CONFIG[configKey] = newValue;
                }
                break;
            case 'array':
                if (oldValue.includes(newValue)) {
                    oldValue.splice(oldValue.indexOf(newValue), 1);
                } else {
                    oldValue.push(newValue);
                }
                break;
            default:
                throw new TypeError('Not support config type');
        }

        if (!context.USER_CONFIG.DEFINE_KEYS.includes(configKey)) {
            context.USER_CONFIG.DEFINE_KEYS.push(configKey);
        }
        log.info(`[CALLBACK QUERY] Update config: ${configKey} = ${context.USER_CONFIG[configKey]}`);
        await ENV.DATABASE.put(context.SHARE_CONTEXT.configStoreKey, JSON.stringify(context.USER_CONFIG)).catch(console.error);
        this.sendAlert(api, context.query_id, '✅ Data update successful', false);
    }

    private async closeInlineKeyboard(api: TelegramBotAPI, message: Telegram.Message) {
        return api.deleteMessage({
            chat_id: message.chat.id,
            message_id: message.message_id,
        }).then(r => r.json());
    }

    private async sendCallBackMessage(api: TelegramBotAPI, message: Telegram.Message, text: string, inline_keyboard: Telegram.InlineKeyboardButton[][]) {
        return api.editMessageText({
            chat_id: message.chat.id,
            message_id: message.message_id,
            ...(message.chat.type === 'private' ? {} : { reply_to_message_id: message.message_id }),
            text: escape(text, { quoteExpandable: true, addQuote: true }),
            parse_mode: 'MarkdownV2',
            reply_markup: { inline_keyboard },
        });
    }

    private constructInlineList({ path, data, label, key, config, callbackData, pageIndex, pageNum, col, callback }: { path: number[]; data: (string | InlineItem)[]; label?: string; key?: string; config: AgentUserConfig; callbackData: number | string; pageIndex: number; pageNum: number; col: number; callback?: (...args: any[]) => Promise<string[]> }): Telegram.InlineKeyboardButton[][] {
        const isSelected = (item: string | InlineItem, index: number) => {
            // 单选
            if ((key && callbackData === index && !Array.isArray(config[key]))
                || (key && config[key] === item)
            // 多选
                || (key && (Array.isArray(config[key]) && (config[key].includes(item))))) {
                return '✅';
            }
            return '';
        };
        let inlineList: Telegram.InlineKeyboardButton[] = [];
        if (path.length > 1 && key) {
            inlineList = data.map((item, index) => ({
                text: `${isSelected(item, index)}${item}`,
                callback_data: index.toString(),
            }));
        } else {
            inlineList = data.map((item, index) => ({
                text: (item as InlineItem).label,
                callback_data: index.toString(),
            }));
        }

        const realCol = path.length === 1 || key === '' ? 3 : col;

        const chunkedList = chunkArray(inlineList, realCol) as Telegram.InlineKeyboardButton[][];
        chunkedList.unshift([{
            text: `请选择 ${label || key || '需要配置的选项'}`,
            callback_data: path.join('.') + (key === 'ENVS' ? ':set' : ''),
        }]);

        const page: Telegram.InlineKeyboardButton[] = [];
        if (pageNum > 1) {
            if (pageIndex > 0) {
                page.push({
                    text: 'PREV',
                    callback_data: `prev`,
                });
            }
            page.push({
                text: `${pageIndex + 1} / ${pageNum}`,
                callback_data: `PAGE_INDEX:${pageIndex}`,
            });
            if (pageIndex < pageNum - 1) {
                page.push({
                    text: 'NEXT',
                    callback_data: `next`,
                });
            }
            chunkedList.push(page);
        }

        const footer: Telegram.InlineKeyboardButton[] = [{
            text: '❌',
            callback_data: 'close',
        }];

        if (callback) {
            footer.unshift({
                text: '🔄',
                callback_data: 'fresh',
            });
        }
        if (path.length > 1) {
            footer.unshift({
                text: '↩️',
                callback_data: 'back',
            });
        }

        chunkedList.push(footer);

        return chunkedList;
    }
}

export async function handleCallbackQuery(token: string, callbackQuery: Telegram.CallbackQuery) {
    try {
        log.info('handleCallbackQuery');

        // Handle inline_message_id case (new in Bot API 10.5)
        if (!callbackQuery.message && callbackQuery.inline_message_id) {
            log.warn('[CALLBACK QUERY] Callback from inline message is not supported yet');
            const api = createTelegramBotAPI(token);
            return api.answerCallbackQuery({
                callback_query_id: callbackQuery.id,
                text: `⚠️ Inline message callbacks not supported yet`,
                show_alert: true,
            });
        }

        // Check if message exists and is accessible
        if (!callbackQuery.message || 'is_inaccessible' in callbackQuery.message) {
            log.error('[CALLBACK QUERY] Message is not accessible or missing');
            throw new Error('Message is not accessible');
        }

        const message = callbackQuery.message as Telegram.Message;
        if (!message?.reply_markup || !callbackQuery.data) {
            throw new Error('Not supported callback query type');
        }

        // if (!isAuthorized(callbackQuery.from?.id ?? 0, message.reply_markup.inline_keyboard)) {
        //     return new Response('Not authorized', { status: 403 });
        // }

        const workContext = new WorkerContextBase(token, message);

        const handlers: MessageHandler<any>[] = [
            new EnvChecker(),
            new InitUserConfig(),
        ];
        for (const handler of handlers) {
            const result = await handler.handle(message, workContext);
            if (result instanceof Response) {
                return result;
            }
        }

        const callbackQueryContext = new CallbackQueryContext(callbackQuery, workContext as WorkerContext);
        const result = await new HandlerCallbackQuery().handle(callbackQuery, callbackQueryContext);
        if (result instanceof Response) {
            return result;
        }
    } catch (e) {
        return catchError(e as Error);
    }
    return null;
}

export function isAuthorized(fromId: number, inline_keyboard: Array<Array<Telegram.InlineKeyboardButton>>) {
    const [id, _] = (inline_keyboard?.[0]?.[0]?.callback_data ?? '').split('.');
    return id === fromId.toString();
    // const authorizedId = [id, ...ENV.CHAT_WHITE_LIST];
    // return authorizedId.includes(fromId.toString());
}

function getNextpage({ pathDetail, pageIndexData, callbackData, inlineList, pageLength }: { pathDetail: string; pageIndexData: string | undefined; callbackData: number | string; inlineList: InlineItem[]; pageLength: number }) {
    // 移除set
    const pathData = pathDetail.replace(':set', '');
    let pageIndex = pageIndexData ? Number(pageIndexData) : 0;
    const path = pathData.split('.').map(Number);
    (callbackData === 'back') && path.pop();
    let data = inlineList;
    let configKey = '';
    let label;
    let pageNum = 1;
    let callback;
    for (const i of path.slice(1)) {
        if (!data[i]) {
            throw new Error(`Invalid path: index ${i} not found in data array of length ${data.length}`);
        }
        // 安全检查：确保 data[i] 存在且有必要的属性
        if (!data[i].label || !data[i].config_key) {
            throw new Error(`Invalid data at index ${i}: missing label or config_key`);
        }
        ({ label, config_key: configKey } = data[i]);
        callback = data[i].callback;
        data = data[i].value as InlineItem[];
    }

    switch (callbackData) {
        case 'prev':
            pageIndex -= 1;
            ({ data, pageNum } = paging(data, pageIndex, pageLength));
            break;
        case 'next':
            pageIndex += 1;
            ({ data, pageNum } = paging(data, pageIndex, pageLength));
            break;
        case 'back':
            callbackData = '';
            break;
        case 'fresh':
            pageIndex = 0;
            ({ data, pageNum } = paging(data, pageIndex, pageLength));
            break;
        default:
            callbackData = Number(callbackData);
            console.log(`[DEBUG] In default case: callbackData=${callbackData}, data.length BEFORE paging=${data.length}, configKey='${configKey}', pageIndex=${pageIndex}, pageLength=${pageLength}`);
            // 存在child - 如果没有configKey说明还在导航到子菜单，需要先访问完整数组再分页
            if (!configKey) {
                // 安全检查：确保索引有效（使用完整数组）
                if (!data[callbackData]) {
                    throw new Error(`Invalid callback index: ${callbackData} not found in data array of length ${data.length}`);
                }
                if (!data[callbackData].label || !data[callbackData].config_key) {
                    throw new Error(`Invalid data at callback index ${callbackData}: missing label or config_key`);
                }
                path.push(callbackData);
                label = data[callbackData].label;
                configKey = data[callbackData].config_key;
                callback = data[callbackData].callback;
                data = data[callbackData].value as InlineItem[] || [];
                pageIndex = 0;
                ({ data, pageNum } = paging(data, pageIndex, pageLength));
                callbackData = '';
            } else {
                // 已经在最终菜单，对当前数据分页
                ({ data, pageNum } = paging(data, pageIndex ?? 0, pageLength));
            }
    }
    return { path, data, pageIndex, pageNum, newCallBackData: callbackData, configKey, label, callback };
}

function paging(data: any[], pageIndex: number, pageLength: number) {
    let pageNum = 1; ;
    if (pageLength < data.length) {
        pageNum = Math.ceil(data.length / pageLength);
    }
    pageNum > 1 && (data = data.slice(pageIndex * pageLength, (pageIndex + 1) * pageLength));
    return { data, pageNum };
}
