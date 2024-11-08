import type {
    LanguageModelV1,
    Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware,
    StepResult,
} from 'ai';
import type { AgentUserConfig } from '../config/env';
import { getLogSingleton } from '../extra/log/logDecortor';
import { log } from '../extra/log/logger';

export function AIMiddleware({ config, _models, activeTools }: { config: AgentUserConfig; _models: Record<string, LanguageModelV1>; activeTools: string[] }): LanguageModelV1Middleware & { onChunk: (data: any, sendToolCall: boolean, onStream: (text: string) => Promise<any>, log: any) => boolean; onStepFinish: (data: StepResult<any>, onStream: (text: string) => Promise<any>, context: AgentUserConfig) => void } {
    let startTime: number | undefined;
    return {
        wrapGenerate: async ({ doGenerate, params, model }) => {
            log.info('doGenerate called');
            log.debug(`params: ${JSON.stringify(params, null, 2)}`);
            log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
            const logs = getLogSingleton(config);
            activeTools.length > 0 ? logs.tool.model = model.modelId : logs.chat.model.push(model.modelId);
            const result = await doGenerate();
            log.info(`generated text: ${result.text}`);
            return result;
        },

        wrapStream: async ({ doStream, params, model }) => {
            log.info('doStream called');
            log.debug(`params: ${JSON.stringify(params, null, 2)}`);
            log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
            const logs = getLogSingleton(config);
            if (activeTools.length > 0) {
                logs.tool.model = model.modelId;
            } else {
                logs.chat.model.push(model.modelId);
            }
            return doStream();
        },

        transformParams: async ({ type, params }) => {
            log.info(`start ${type} call`);
            startTime = Date.now();
            const logs = getLogSingleton(config);
            logs.ongoingFunctions.push({ name: 'chat_start', startTime });
            if (params.prompt.at(-1)?.role === 'tool') {
                const content = params.prompt.at(-1)!.content;
                if (Array.isArray(content) && content.length > 0) {
                    content.forEach((i: any) => {
                        delete i.result.time;
                    });
                }
            }
            // 能修改的参数有限
            // switch (params.prompt.at(-1)?.role) {
            //     case 'assistant':
            //         // 上一次是工具内容
            //         // if (params.prompt.at(-2)?.role === 'tool') {
            //         // TODO: 无法修改模型 必须中断 generate 再次处理
            //         // }
            //         break;
            //     case 'tool':
            //         break;
            //     default:
            //         break;
            // }
            return params;
        },

        onChunk: (data: any, sendToolCall: boolean, onStream: (text: string) => Promise<any>, log: any) => {
            const { chunk } = data;
            if (chunk.type === 'tool-call' && !sendToolCall) {
                sendToolCall = true;
                log.info(`start tool call: ${chunk.toolName}`);
                onStream(`start tool: ${chunk.toolName}`);
            }
            return sendToolCall;
        },

        onStepFinish: (data: StepResult<any>, onStream: (text: string) => Promise<any>, context: AgentUserConfig) => {
            const { text, toolResults, finishReason, usage } = data;
            const logs = getLogSingleton(context);
            const time = ((Date.now() - startTime!) / 1e3).toFixed(1);
            log.info(toolResults);
            if (toolResults.length > 0) {
                if (toolResults.find(i => i.result === '')) {
                    throw new Error('Function result is empty');
                }
                let maxFuncTime = 0;
                const func_logs = toolResults.map((i) => {
                    logs.functionTime.push(i.result.time);
                    maxFuncTime = Math.max(maxFuncTime, i.result.time);
                    return {
                        name: i.toolName,
                        arguments: Object.values(i.args),
                    };
                });
                log.info(func_logs);
                logs.functions.push(...func_logs);
                logs.tool.time.push(((+time - maxFuncTime) / 1e3).toFixed(1));
                onStream(`finish ${[...new Set(toolResults.map(i => i.toolName))]}`);
            } else if (text === '') {
                throw new Error('None text');
            } else {
                activeTools.length > 0 ? logs.tool.time.push(time) : logs.chat.time.push(time);
            }

            log.info('step text:', text);

            finishReason && log.info(finishReason);
            if (usage && !Number.isNaN(usage.promptTokens) && !Number.isNaN(usage.completionTokens)) {
                logs.tokens.push(`${usage.promptTokens},${usage.completionTokens}`);
                log.info(`tokens: ${usage}`);
            } else {
                log.warn('usage is none or not a number');
            }
            logs.ongoingFunctions = logs.ongoingFunctions.filter(i => i.startTime !== startTime);
        },
    };
}
