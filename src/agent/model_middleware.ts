/* eslint-disable unused-imports/no-unused-vars */
import type {
    CoreToolChoice,
    LanguageModelV1,
    LanguageModelV1CallOptions,
    Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware,
    StepResult,
} from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatStreamTextHandler } from './types';
import { createLlmModel } from '.';
import { getLogSingleton } from '../log/logDecortor';
import { log } from '../log/logger';
import { OpenAI } from './openai';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function AIMiddleware({ config, tools, activeTools, onStream, toolChoice, messageReferencer }: { config: AgentUserConfig; tools: Record<string, any>; activeTools: string[]; onStream: ChatStreamTextHandler | null; toolChoice: CoreToolChoice<any>[] | []; messageReferencer: string[] }): LanguageModelV1Middleware & { onChunk: (data: any) => boolean; onStepFinish: (data: StepResult<any>, context: AgentUserConfig) => void } {
    let startTime: number | undefined;
    let sendToolCall = false;
    let step = 0;
    let rawSystemPrompt: string | undefined;
    const openaiTransformModelRegex = new RegExp(`^${OpenAI.transformModelPerfix}`);
    return {
        wrapGenerate: async ({ doGenerate, params, model }) => {
            log.info('doGenerate called');
            await warpModel(model, activeTools, config);
            log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
            const logs = getLogSingleton(config);
            const modelId = model.provider === 'openai' ? model.modelId.replace(openaiTransformModelRegex, '') : model.modelId;
            activeTools.length > 0 ? logs.tool.model = modelId : logs.chat.model.push(modelId);
            const result = await doGenerate();
            log.info(`generated text: ${result.text}`);
            return result;
        },

        wrapStream: async ({ doStream, model }) => {
            log.info('doStream called');
            await warpModel(model, activeTools, config);
            log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
            const logs = getLogSingleton(config);
            const modelId = model.provider === 'openai' ? model.modelId.replace(openaiTransformModelRegex, '') : model.modelId;
            if (activeTools.length > 0) {
                logs.tool.model = modelId;
            } else {
                logs.chat.model.push(modelId);
            }
            return doStream();
        },

        transformParams: async ({ type, params }) => {
            log.info(`start ${type} call`);
            startTime = Date.now();
            if (!rawSystemPrompt && params.prompt[0]?.role === 'system') {
                rawSystemPrompt = params.prompt[0].content;
            }
            const logs = getLogSingleton(config);
            logs.ongoingFunctions.push({ name: 'chat_start', startTime });
            if (toolChoice.length > 0 && step < toolChoice.length && params.mode.type === 'regular') {
                params.mode.toolChoice = toolChoice[step] as any;
                log.info(`toolChoice changed: ${JSON.stringify(toolChoice[step])}`);
                // Unable to filter through activeTools, can only compromise by using tools.
                // Filter out used tools to prevent calling the same tool.
                params.mode.tools = params.mode.tools?.filter(i => activeTools.includes(i.name));
            }
            warpMessages(params, tools, activeTools, rawSystemPrompt);
            log.info(`request params: ${JSON.stringify(params, null, 2)}`);
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
                const toolNames = [...new Set(toolResults.map(i => i.toolName))];
                activeTools = trimActiveTools(activeTools, toolNames);
                log.info(`finish ${toolNames}`);
                onStream?.send(`${messageReferencer.join('')}...\n` + `finish ${toolNames}`);
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

function warpMessages(params: LanguageModelV1CallOptions, tools: Record<string, any>, activeTools: string[], rawSystemPrompt: string | undefined) {
    const { prompt: messages, mode } = params;

    if (messages.at(-1)?.role === 'tool') {
        const content = messages.at(-1)!.content;
        if (Array.isArray(content) && content.length > 0) {
            content.forEach((i: any) => {
                delete i.result.time;
            });
        }
    }
    if (activeTools.length > 0) {
        if (messages[0].role === 'system') {
            messages[0].content = `${rawSystemPrompt}\n\nYou can consider using the following tools:\n##TOOLS${activeTools.map(name =>
                `\n\n### ${name}\n- desc: ${tools[name].description} \n${tools[name].prompt || ''}`,
            ).join('')}`;
        }
    } else {
        (mode as any).tools = undefined;
        messages[0].role === 'system' && (messages[0].content = rawSystemPrompt ?? '');
    }
}

async function warpModel(model: LanguageModelV1, activeTools: string[], config: AgentUserConfig) {
    const mutableModel = model as Writeable<LanguageModelV1>;
    // if (model.provider === 'openai' && model.modelId.startsWith(OpenAI.transformModelPerfix)) {
    //     mutableModel.modelId = mutableModel.modelId.slice(OpenAI.transformModelPerfix.length);
    // }
    const effectiveModel = activeTools.length > 0 ? (config.TOOL_MODEL || model.modelId) : model.modelId;
    if (effectiveModel !== mutableModel.modelId) {
        let newModel: LanguageModelV1 | undefined;
        if (effectiveModel.includes(':')) {
            newModel = await createLlmModel(effectiveModel, config);
            mutableModel.provider = newModel.provider;
            mutableModel.specificationVersion = newModel.specificationVersion;
            mutableModel.doStream = newModel.doStream;
            mutableModel.doGenerate = newModel.doGenerate;
        }
        mutableModel.modelId = newModel?.modelId ?? effectiveModel;
    }
}

function trimActiveTools(activeTools: string[], toolNames: string[]) {
    return activeTools.length > 0 ? activeTools.filter(name => !toolNames.includes(name)) : [];
}
