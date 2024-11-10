import type { WorkerContext } from '../config/context';
import type { ChatAgent, HistoryItem, HistoryModifier, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { ENV } from '../config/env';

/**
 * @returns {(function(string): number)}
 */
function tokensCounter(): (text: string) => number {
    return (text) => {
        return text.length;
    };
}

export async function loadHistory(key: string): Promise<HistoryItem[]> {
    // 加载历史记录
    let history = [];
    try {
        history = JSON.parse(await ENV.DATABASE.get(key));
    } catch (e) {
        console.error(e);
    }
    if (!history || !Array.isArray(history)) {
        history = [];
    }

    const counter = tokensCounter();

    const trimHistory = (list: HistoryItem[], initLength: number, maxLength: number, maxToken: number) => {
    // 历史记录超出长度需要裁剪, 小于0不裁剪
        if (maxLength >= 0 && list.length > maxLength) {
            list = list.splice(list.length - maxLength);
        }
        // 处理token长度问题, 小于0不裁剪
        if (maxToken > 0) {
            let tokenLength = initLength;
            for (let i = list.length - 1; i >= 0; i--) {
                const historyItem = list[i];
                let length = 0;
                if (historyItem.content) {
                    if (typeof historyItem.content === 'string') {
                        length = counter(historyItem.content);
                    } else if (Array.isArray(historyItem.content)) {
                        for (const content of historyItem.content) {
                            if (Object.prototype.hasOwnProperty.call(content, 'text')) {
                                length += counter((content as any).text as string);
                            }
                        }
                    }
                } else {
                    historyItem.content = '';
                }
                // 如果最大长度超过maxToken,裁剪history
                tokenLength += length;
                if (tokenLength > maxToken) {
                    list = list.splice(i + 1);
                    break;
                }
            }
        }
        return list;
    };

    // 裁剪
    if (ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH > 0) {
        history = trimHistory(history, 0, ENV.MAX_HISTORY_LENGTH, ENV.MAX_TOKEN_LENGTH);
        // 裁剪开始的tool call 以避免报错
        let validStart = 0;
        for (const h of history) {
            if (h.role === 'tool') {
                validStart++;
                continue;
            }
            break;
        }
        history = history.slice(validStart);
    }

    return history;
}

export type StreamResultHandler = (text: string) => Promise<any>;

export async function requestCompletionsFromLLM(params: LLMChatRequestParams | null, context: WorkerContext, agent: ChatAgent, modifier: HistoryModifier | null, onStream: StreamResultHandler | null): Promise<string> {
    let history = context.MIDDEL_CONTEXT.history;
    const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
    // const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
    if (modifier) {
        const modifierData = modifier(history, params);
        history = modifierData.history;
        params = modifierData.message;
    }
    if (params === null) {
        throw new Error('Message is null');
    }
    const messages = [...history, params];
    if (context.USER_CONFIG.SYSTEM_INIT_MESSAGE) {
        messages.unshift({
            role: 'system',
            content: context.USER_CONFIG.SYSTEM_INIT_MESSAGE,
        });
    }
    const llmParams: LLMChatParams = {
        messages,
    };
    const answer = await agent.request(llmParams, context.USER_CONFIG, onStream);
    const { messages: raw_messages, content } = answer;

    if (!historyDisable) {
        // only push valid chat history
        if (raw_messages.at(-1)?.role === 'assistant') {
            history.push(params);
            history.push(...raw_messages);
        }
    }
    return content;
}

export async function requestText2Image(url: string, headers: Record<string, any>, body: any, render: (arg: Response) => Promise<ImageResult>) {
    console.log('start generate image.');
    const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    const result = await render(resp);
    if (result.message) {
        throw new Error(result.message);
    }
    return result;
}
