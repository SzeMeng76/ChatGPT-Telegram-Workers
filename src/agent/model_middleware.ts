/* eslint-disable unused-imports/no-unused-vars */
import type {
    CoreMessage,
    CoreToolChoice,
    LanguageModelV1,
    Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware,
    StepResult,
} from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatStreamTextHandler } from './types';
import { getLogSingleton } from '../extra/log/logDecortor';
import { log } from '../extra/log/logger';
import { OpenAI } from './openai';

// type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function AIMiddleware({ config, models, tools, activeTools, onStream, toolChoice, messageReferencer }: { config: AgentUserConfig; models: Record<string, LanguageModelV1>; tools: Record<string, any>; activeTools: string[]; onStream: ChatStreamTextHandler | null; toolChoice: CoreToolChoice<any>[] | []; messageReferencer: string[] }): LanguageModelV1Middleware & { onChunk: (data: any) => boolean; onStepFinish: (data: StepResult<any>, context: AgentUserConfig) => void } {
    let startTime: number | undefined;
    let sendToolCall = false;
    let step = 0;
    return {
        wrapGenerate: async ({ doGenerate, params, model }) => {
            log.info('doGenerate called');
            log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
            const modelId = model.modelId.startsWith(OpenAI.transformModelPerfix) ? model.modelId.slice(OpenAI.transformModelPerfix.length) : model.modelId;
            const logs = getLogSingleton(config);
            activeTools.length > 0 ? logs.tool.model = modelId : logs.chat.model.push(modelId);
            const result = await doGenerate();
            log.info(`generated text: ${result.text}`);
            return result;
        },

        wrapStream: async ({ doStream, params, model }) => {
            log.info('doStream called');
            log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
            const modelId = model.modelId?.startsWith(OpenAI.transformModelPerfix) ? model.modelId?.slice(OpenAI.transformModelPerfix.length) : model.modelId;
            const logs = getLogSingleton(config);
            if (activeTools.length > 0) {
                logs.tool.model = modelId;
            } else {
                logs.chat.model.push(modelId);
            }

            // const modifyModel = model as { modelId: any };
            // modifyModel.modelId = 'test';
            return doStream();
        },

        transformParams: async ({ type, params }) => {
            log.info(`start ${type} call`);
            startTime = Date.now();
            const logs = getLogSingleton(config);
            logs.ongoingFunctions.push({ name: 'chat_start', startTime });
            if (toolChoice.length > 0 && step < toolChoice.length && params.mode.type === 'regular') {
                params.mode.toolChoice = toolChoice[step] as any;
                log.info(`toolChoice changed: ${JSON.stringify(toolChoice[step])}`);
            }
            warpMessages(params.prompt, tools, activeTools);
            log.debug(`warp params result: ${JSON.stringify(params)}`);
            return params;
        },

        onChunk: (data: any) => {
            const { chunk } = data;
            if (chunk.type === 'tool-call' && !sendToolCall) {
                onStream?.send(`${messageReferencer.join('')}...\n` + `tool call will start: ${chunk.toolName}`);
                sendToolCall = true;
                log.info(`will start tool: ${chunk.toolName}`);
            }
            return sendToolCall;
        },

        onStepFinish: (data: StepResult<any>) => {
            const { text, toolResults, finishReason, usage, request, response } = data;
            const logs = getLogSingleton(config);
            log.info('llm request end');
            log.info(finishReason);
            log.info('step text:', text);
            // log.debug('step raw request:', request);
            log.debug('step raw response:', response);

            const time = ((Date.now() - startTime!) / 1e3).toFixed(1);
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
                logs.tool.time.push((+time - maxFuncTime).toFixed(1));
                log.info(`finish ${[...new Set(toolResults.map(i => i.toolName))]}`);
                onStream?.send(`${messageReferencer.join('')}...\n` + `finish ${[...new Set(toolResults.map(i => i.toolName))]}`);
            } else if (text === '') {
                throw new Error('None text');
            } else {
                activeTools.length > 0 ? logs.tool.time.push(time) : logs.chat.time.push(time);
            }

            if (usage && !Number.isNaN(usage.promptTokens) && !Number.isNaN(usage.completionTokens)) {
                logs.tokens.push(`${usage.promptTokens},${usage.completionTokens}`);
                log.info(`tokens: ${JSON.stringify(usage)}`);
            } else {
                log.warn('usage is none or not a number');
            }
            logs.ongoingFunctions = logs.ongoingFunctions.filter(i => i.startTime !== startTime);
            sendToolCall = false;
            step++;
            // onStream?.send(`${messageReferencer.join('')}...\n` + `step ${step} finished`);
        },
    };
}

function warpMessages(messages: CoreMessage[], tools: Record<string, any>, activeTools: string[]) {
    if (messages.at(-1)?.role === 'tool') {
        const content = messages.at(-1)!.content;
        if (Array.isArray(content) && content.length > 0) {
            content.forEach((i: any) => {
                delete i.result.time;
            });
        }
    }
    if (activeTools.length > 0 && messages[0].role === 'system') {
        messages[0].content += `\n\nYou can consider using the following tools:\n##TOOLS${activeTools.map(name =>
            `\n\n### ${name}\n- desc: ${tools[name].description} \n${tools[name].prompt || ''}`,
        ).join('')}`;
    }
}
