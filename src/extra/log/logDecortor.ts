/* eslint-disable no-useless-catch */
import type { Message } from 'telegram-bot-api-types';
import type { CompletionData } from '../../agent/types';
import type { AgentUserConfig } from '../../config/env';
import type { WorkerContext } from '../../config/context';

// 使用 WeakMap 来存储每个 AgentUserConfig 对应的 Logs 实例
export const logSingleton: WeakMap<AgentUserConfig, Logs> = new WeakMap();
export const sentMessageIds = new WeakMap<Message, number[]>();

// 日志装饰器
export function Log(
    value: any,
    context: ClassFieldDecoratorContext | ClassMethodDecoratorContext,
): any {
    // 处理属性装饰器
    if (context.kind === 'field') {
        const configIndex = 1; // config 的索引
        return function (initialValue: any) {
            if (typeof initialValue === 'function') {
                return async function (this: any, ...args: any[]) {
                    const config: AgentUserConfig = args[configIndex];
                    const logs = getLogSingleton(config);
                    const startTime = Date.now();

                    // 未完成的模型对话
                    logs.ongoingFunctions.push({
                        name: initialValue.name || 'anonymous',
                        startTime,
                    });

                    let model: string;
                    try {
                        model = args[0]?.model || this.model(config);
                        if (this.type === 'tool') {
                            logs.tool.model = model;
                        } else {
                            logs.chat.model.push(model);
                        }

                        const result: CompletionData = await initialValue.apply(this, args);
                        const endTime = Date.now();
                        const elapsed = `${((endTime - startTime) / 1e3).toFixed(1)}s`;
                        // 移除ongoing
                        logs.ongoingFunctions = logs.ongoingFunctions.filter(
                            func => func.startTime !== startTime,
                        );

                        handleLlmLog(logs, result, elapsed, this.type);

                        if (!result.content && !result.tool_calls) {
                            return result;
                        }

                        if (result.usage) {
                            logs.tokens.push(`${result.usage.prompt_tokens},${result.usage.completion_tokens}`);
                        }

                        return { content: result.content, tool_calls: result.tool_calls };
                    } catch (error) {
                        logs.ongoingFunctions = logs.ongoingFunctions.filter(
                            func => func.startTime !== startTime,
                        );
                        throw error;
                    }
                };
            } else {
                return initialValue;
            }
        };
    }

    // 处理方法装饰器
    if (context.kind === 'method' && typeof value === 'function') {
        return async function (this: { context: WorkerContext }, ...args: any[]) {
            const config: AgentUserConfig = this.context.USER_CONFIG;
            const logs = getLogSingleton(config);
            const startTime = Date.now();

            // logs.ongoingFunctions.push({
            //     name: value.name || 'anonymous',
            //     startTime,
            // });

            try {
                const result = await value.apply(this, args);
                const endTime = Date.now();
                const elapsed = `${((endTime - startTime) / 1e3).toFixed(1)}s`;

                logs.functionTime.push(elapsed);

                return result;
            } catch (error) {
                // logs.ongoingFunctions = logs.ongoingFunctions.filter(
                //     func => func.startTime !== startTime,
                // );
                throw error;
            }
        };
    }

    return value;
}

export function getLogSingleton(config: AgentUserConfig): Logs {
    if (!logSingleton.has(config)) {
        logSingleton.set(config, {
            functions: [],
            functionTime: [],
            tool: {
                model: '',
                time: [],
            },
            chat: {
                model: [],
                time: [],
            },
            tokens: [],
            ongoingFunctions: [],
        });
    }
    return logSingleton.get(config)!;
}

// 获取日志字符串
export function getLog(context: AgentUserConfig, returnModel: boolean = false): any {
    if (!context.ENABLE_SHOWINFO)
        return '';

    const showToken = context.ENABLE_SHOWTOKEN;
    const logList: string[] = [];
    const logObj = logSingleton.get(context);

    if (!logObj)
        return '';
    if (returnModel) {
        return logObj.chat.model?.at(-1) || logObj.tool.model || 'UNKNOWN';
    }

    // console.log('logObj:\n', JSON.stringify(logObj, null, 2));
    // tool
    if (logObj.tool.model) {
        let toolsLog = `${logObj.tool.model}`;
        if (logObj.tool.time.length > 0) {
            toolsLog += ` c_t: ${logObj.tool.time.join(' ')}`;
        }
        if (logObj.functionTime.length > 0) {
            toolsLog += ` f_t: ${logObj.functionTime.join(' ')}`;
        }
        logList.push(toolsLog);
    }

    // function
    if (logObj.functions.length > 0) {
        const functionLogs = logObj.functions.map((log) => {
            const args = Object.values(log.arguments).join(', ');
            return `${log.name}: ${args}`.substring(0, 50);
        });
        logList.push(...functionLogs);
    }

    // chat
    if (logObj.chat.model.length > 0) {
        const chatLogs = logObj.chat.model
            .map((m, i) => {
                const time = logObj.chat.time[i] || '';
                return `${m} ${time}`;
            })
            .join('|');
        logList.push(chatLogs);
    }

    // ongoing
    logObj.ongoingFunctions.forEach((func) => {
        const elapsed = `${((Date.now() - func.startTime) / 1e3).toFixed(1)}s`;
        logList.push(`[ongoing: ${func.name} ${elapsed}]`);
    });

    // token
    if (logObj.tokens.length > 0 && showToken) {
        logList.push(`${logObj.tokens.join('|')}`);
    }

    return logList.map(entry => `> \`${entry}\``).join('\n');
}

export function clearLog(context: AgentUserConfig) {
    logSingleton.delete(context);
}

function handleLlmLog(logs: Logs, result: CompletionData, time: string, type: 'tool' | 'chat') {
    if (type === 'tool') {
        logs.tool.time.push(time);
    } else {
        logs.chat.time.push(time);
    }

    if (type === 'tool' && result.tool_calls && result.tool_calls.length > 0) {
        logs.functions.push(
            ...result.tool_calls.map(tool => ({
                name: tool.function.name,
                arguments: JSON.parse(tool.function.arguments),
            })),
        );
    }
}

interface Logs {
    functions: { name: string; arguments: any }[];
    functionTime: string[];
    tool: { model: string; time: string[] };
    chat: { model: string[]; time: string[] };
    tokens: string[];
    ongoingFunctions: { name: string; startTime: number }[];
}
