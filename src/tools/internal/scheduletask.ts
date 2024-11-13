import { parseArray } from '../../config/merger';
import { log } from '../../log/logger';
import { createTelegramBotAPI } from '../../telegram/api';

interface ScheduledData {
    // [bot_name: string]: Record<string, Message[]>;
    [bot_name: string]: Chat;
}

interface Message {
    id: number[];
    ttl: number;
}

interface Chat {
    [chat_id: string]: Message[];
}

// type DeleteMessagesReturns = ResponseSuccess<any> | ResponseError;
interface DeleteMessagesReturns {
    ok: boolean;
    description?: string;
}

type ScheduleRespType = (ok: boolean, reason?: string) => Response;

interface SortMessagesType {
    rest: Chat;
    expired: {
        [chat_id: string]: number[];
    };
}

const scheduleResp: ScheduleRespType = (ok, reason = '') => {
    const result = {
        ok,
        ...((reason && { reason }) || {}),
    };
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
};

async function schedule_detele_message(ENV: any) {
    try {
        log.info('- Start task: schedule_detele_message');
        checkDATABASE(ENV);
        const botTokens: string[] = extractArrayData(ENV.TELEGRAM_AVAILABLE_TOKENS);
        const botNames: string[] = extractArrayData(ENV.TELEGRAM_BOT_NAME);
        const scheduleDeteleKey = 'schedule_detele_message';
        const scheduledData = await getData<ScheduledData>(ENV, scheduleDeteleKey);
        const taskPromises: Promise<DeleteMessagesReturns>[] = [];

        for (const [bot_name, chats] of Object.entries(scheduledData)) {
            const bot_token = checkBotIsVaild(bot_name, botNames, botTokens);
            if (!bot_token)
                continue;

            const api = createTelegramBotAPI(bot_token);
            const sortData = sortDeleteMessages(chats);
            scheduledData[bot_name] = sortData.rest;

            Object.entries(sortData.expired).forEach(([chat_id, messages]) => {
                log.info(`Start delete: chat: ${chat_id}, message ids: ${messages}`);
                // 每次最多只能删除100条
                for (let i = 0; i < messages.length; i += 100) {
                    taskPromises.push(api.deleteMessages({ chat_id, message_ids: messages.slice(i, i + 100) }));
                }
            });
        }
        if (taskPromises.length === 0) {
            log.info(`Rest ids: ${JSON.stringify(scheduledData)}\nNothing need to delete.`);
            return scheduleResp(true);
        }

        const resp: DeleteMessagesReturns[] = await Promise.all(taskPromises);
        log.info('all task result: ', resp.map(r => r.ok));
        await setData<ScheduledData>(ENV, scheduleDeteleKey, scheduledData);

        return scheduleResp(true);
    } catch (e: any) {
        console.error(e.message, e.stack);
        return scheduleResp(false, e.message);
    }
}

function checkBotIsVaild(bot_name: string, botNames: string[], botTokens: string[]): null | string {
    const bot_index = botNames.indexOf(bot_name);
    if (bot_index < 0) {
        console.error(`bot name: ${bot_name} is not exist.`);
        return null;
    }
    const bot_token = botTokens[bot_index];
    if (!bot_token) {
        console.error(`Cant find bot ${bot_name} - position ${bot_index + 1}'s token\nAll token list: ${botTokens}`);
        return null;
    }
    return bot_token;
}

function extractArrayData(data: string[] | string): string[] {
    const isArray = Array.isArray(data);
    return isArray ? data : parseArray(data);
}

async function getData<T>(ENV: any, key: string): Promise<T> {
    return JSON.parse((await ENV.DATABASE.get(key)) || '{}');
}

async function setData<T>(ENV: any, key: string, data: T): Promise<void> {
    await ENV.DATABASE.put(key, JSON.stringify(data));
}

function sortDeleteMessages(chats: Chat): SortMessagesType {
    const sortedMessages: SortMessagesType = { rest: {}, expired: {} };

    for (const [chat_id, messages] of Object.entries(chats)) {
        if (messages.length === 0)
            continue;

        sortedMessages.expired[chat_id] = messages
            .filter(msg => msg.ttl <= Date.now())
            .map(msg => msg.id)
            .flat();

        sortedMessages.rest[chat_id] = messages.filter(msg => msg.ttl > Date.now());
    }
    return sortedMessages;
}

function checkDATABASE(ENV: any) {
    if (!ENV.DATABASE) {
        throw new Error('DATABASE is not found');
    }
}

export default { schedule_detele_message };
