import type { Message } from 'telegram-bot-api-types';
import type { CompletionData } from '../agent/types';
import type { WorkerContext } from '../config/context';
import type { AgentUserConfig } from '../config/env';

export const logSingleton = new WeakMap<AgentUserConfig, Logs>();
export const tagMessageIds = new WeakMap<Message, Set<number>>();

export function Log(
    value: any,
    context: ClassFieldDecoratorContext | ClassMethodDecoratorContext,
): any {
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
                        model = args[0]?.model || this.model(config, args[0]);
                        if (this.type === 'tool') {
                            logs.tool.model = model;
                        } else {
                            logs.chat.model = model;
                        }

                        const result: CompletionData = await initialValue.apply(this, args);
                        const endTime = Date.now();
                        const elapsed = ((endTime - startTime) / 1e3).toFixed(1);
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

    if (context.kind === 'method' && typeof value === 'function') {
        return async function (this: { context: WorkerContext }, ...args: any[]) {
            const config: AgentUserConfig = this.context.USER_CONFIG;
            const logs = getLogSingleton(config);
            const startTime = Date.now();

            const result = await value.apply(this, args);
            const endTime = Date.now();
            const elapsed = ((endTime - startTime) / 1e3).toFixed(1);
            logs.functionTime.push(elapsed);
            return result;
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
                model: '',
                time: [],
            },
            tokens: [],
            ongoingFunctions: [],
            error: '',
        });
    }
    return logSingleton.get(config)!;
}

// 获取日志
export function getLog(context: AgentUserConfig, onlyModel: boolean = false, isParagraph = false) {
    if (!context.ENABLE_SHOWINFO)
        return '';
    const logObj = logSingleton.get(context);
    if (!logObj)
        return '';
    if (onlyModel) {
        return logObj.chat.model?.at(-1) || logObj.tool.model || 'UNKNOWN';
    }
    const logList: string[] = [];
    const show = {
        model: context.SHOW_PARTS.includes('model'),
        model_time: context.SHOW_PARTS.includes('model_time'),
        token: context.SHOW_PARTS.includes('token'),
        tool: context.SHOW_PARTS.includes('tool'),
        tool_time: context.SHOW_PARTS.includes('tool_time'),
    };

    // tool
    if (logObj.tool.model && show.model) {
        let toolsLog = logObj.tool.model;
        if (logObj.tool.time.length > 0 && show.model_time) {
            toolsLog += ` c_t: ${logObj.tool.time.join('s ')}s`;
        }
        if (logObj.functionTime.length > 0 && show.tool_time) {
            toolsLog += ` f_t: ${logObj.functionTime.join('s ')}s`;
        }
        logList.push(toolsLog);
    }

    // function
    if (logObj.functions.length > 0 && show.tool) {
        const functionLogs = logObj.functions.map((log) => {
            const args = Object.values(log.arguments).join(', ');
            return `${log.name}: ${args}`.substring(0, 80);
        });
        logList.push(...functionLogs);
    }

    // error
    if (logObj.error) {
        logList.push(`${logObj.error}`);
    }

    // chat
    if (logObj.chat.model.length > 0 && show.model) {
        const chatLogs = `${logObj.chat.model}${logObj.chat.time.length > 0 && show.model_time ? ` ${logObj.chat.time.join('s ')}s` : ''}`;
        logList.push(chatLogs);
    }

    // ongoing
    logObj.ongoingFunctions.forEach((func) => {
        const elapsed = ((Date.now() - func.startTime) / 1e3).toFixed(1);
        logList.push(`[ongoing: ${func.name} ${elapsed}s]`);
    });

    // token
    if (logObj.tokens.length > 0 && show.token) {
        logList.push(`${logObj.tokens.join('|')}`);
    }

    return isParagraph
        ? logList.filter(Boolean).join()
        : `LOGSTART\n${logList.filter(Boolean).map(entry => `>\`${entry}\``).join('\n')}LOGEND`;
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
            ...result.tool_calls.map((tool: { function: { name: any; arguments: string } }) => ({
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
    chat: { model: string; time: string[] };
    tokens: string[];
    ongoingFunctions: { name: string; startTime: number }[];
    error: string;
}
