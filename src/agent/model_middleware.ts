/* eslint-disable no-case-declarations */
/* eslint-disable unused-imports/no-unused-vars */
import type { LanguageModelV1ToolCallPart, LanguageModelV1ToolResultPart } from '@ai-sdk/provider';
import type {
    LanguageModelV1,
    LanguageModelV1CallOptions,
    Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware,
    LanguageModelV1Prompt,
    StepResult,
} from 'ai';
import type { ToolChoice } from '.';
import type { AgentUserConfig } from '../config/env';
import type { ChatStreamTextHandler } from './types';
import { getLogSingleton } from '../log/logDecortor';
import { log } from '../log/logger';
import { tools } from '../tools';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function AIMiddleware({ config, activeTools, onStream, toolChoice, messageReferencer, chatModel }: { config: AgentUserConfig; activeTools: string[]; onStream: ChatStreamTextHandler | null; toolChoice: ToolChoice[] | []; messageReferencer: string[]; chatModel: string }): LanguageModelV1Middleware & { onChunk: (data: any) => void; onStepFinish: (data: StepResult<any>, context: AgentUserConfig) => void } {
    let startTime: number | undefined;
    let sendToolCall = false;
    let step = 0;
    let rawSystemPrompt: string | undefined;
    let isThinking = false;
    let thinkingEnd = false;
    let isThinkingStart = true;
    return {
        wrapGenerate: async ({ doGenerate, params, model }) => {
            warpModel(model, config, activeTools, (params.mode as any).toolChoice, chatModel);
            log.info(`modelId: ${model.modelId}`);
            isThinking = model.modelId.includes('thinking');
            recordModelLog(config, model, activeTools, (params.mode as any).toolChoice);
            const result = await doGenerate();
            log.debug(`doGenerate result: ${JSON.stringify(result)}`);
            return result;
        },

        wrapStream: async ({ doStream, params, model }) => {
            warpModel(model, config, activeTools, (params.mode as any).toolChoice, chatModel);
            log.info(`modelId: ${model.modelId}`);
            isThinking = model.modelId.includes('thinking');
            recordModelLog(config, model, activeTools, (params.mode as any).toolChoice);
            return doStream();
        },

        transformParams: async ({ type, params }) => {
            log.info(`start ${type} call`);
            startTime = Date.now();
            if (!rawSystemPrompt && params.prompt[0]?.role === 'system') {
                rawSystemPrompt = params.prompt[0].content;
            }
            const logs = getLogSingleton(config);
            logs.ongoingFunctions.push({ name: 'chat', startTime });
            if (toolChoice.length > 0 && step < toolChoice.length && params.mode.type === 'regular') {
                params.mode.toolChoice = toolChoice[step] as any;
                log.info(`toolChoice changed: ${JSON.stringify(toolChoice[step])}`);
                params.mode.tools = params.mode.tools?.filter(i => activeTools.includes(i.name));
            }
            warpMessages(params, tools, activeTools, rawSystemPrompt);
            return params;
        },

        onChunk: ({ chunk }: { chunk: any }) => {
            if (chunk.type === 'tool-call' && !sendToolCall) {
                onStream?.send(`${messageReferencer.join('')}...\n` + `tool call will start: ${chunk.toolName}`);
                sendToolCall = true;
                log.info(`will start tool: ${chunk.toolName}`);
            } else if (isThinking && chunk.type === 'text-delta' && !thinkingEnd) {
                // ai sdk doesn't expose chunk's text property, so we need to handle it manually
                if (isThinkingStart) {
                    isThinkingStart = false;
                    chunk.textDelta = `**Thinking**\n${chunk.textDelta}`;
                }
                if (/\.\S/.test(chunk.textDelta)) {
                    const [thinking, ...answer] = chunk.textDelta.split(/\.([a-z\u4E00-\u9FA5])/i);
                    // chunk.textDelta = `${thinking.replace(/\n/g, '\n>')}.\n\n${answer.join('')}`;
                    chunk.textDelta = `${thinking}.\n\n${answer.join('')}`;
                    thinkingEnd = true;
                }
                // else {
                //     chunk.textDelta = chunk.textDelta.replace(/\n/g, '\n>');
                // }
            }
        },

        onStepFinish: (data: StepResult<any>) => {
            const { text, toolResults, finishReason, usage, request, response } = data;
            const logs = getLogSingleton(config);
            log.info('llm request end');
            log.debug('step text:', text);
            log.debug('step raw request:', request);
            // log.debug('step raw response:', response);
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
                log.info(`func logs: ${JSON.stringify(func_logs, null, 2)}`);
                log.info(`func result: ${JSON.stringify(toolResults, null, 2)}`);
                logs.functions.push(...func_logs);
                logs.tool.time.push((+time - maxFuncTime).toFixed(1));
                const toolNames = [...new Set(toolResults.map(i => i.toolName))];
                activeTools = trimActiveTools(activeTools, toolNames);
                log.info(`finish ${toolNames}`);
                onStream?.send(`${messageReferencer.join('')}...\n` + `finish ${toolNames}`);
            } else {
                activeTools.length > 0 && toolChoice[step]?.type !== 'none' ? logs.tool.time.push(time) : logs.chat.time.push(time);
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
        },
    };
}

function warpMessages(params: LanguageModelV1CallOptions, tools: Record<string, any>, activeTools: string[], rawSystemPrompt: string | undefined) {
    const { prompt: messages, mode } = params;

    const getSystemContent = () => {
        if (activeTools.length > 0) {
            return `${rawSystemPrompt}\nYou can consider using the following tools:\n${activeTools.map(name =>
                `### ${name}\n- desc: ${tools[name]?.schema?.description || ''} \n${tools[name]?.prompt || ''}`,
            ).join('\n\n')}`;
        }
        return rawSystemPrompt ?? 'You are a helpful assistant';
    };

    const trimMessages = (messages: LanguageModelV1Prompt) => {
        const modifiedMessages: LanguageModelV1Prompt = [];
        for (const [i, message] of messages.entries()) {
            switch (message.role) {
                case 'system':
                    modifiedMessages.push({
                        role: 'system',
                        content: getSystemContent(),
                    });
                    continue;
                case 'assistant':
                    if (message.content.every(i => i.type !== 'tool-call')) {
                        modifiedMessages.push(message);
                    }
                    continue;
                case 'tool':
                    let text = '';
                    const toolNames: Set<string> = new Set();
                    for (const toolResultPart of message.content) {
                        const { toolCallId, toolName, result: { result } } = toolResultPart as LanguageModelV1ToolResultPart & { result: { result: any } };
                        toolNames.add(toolName);
                        let toolArgs = 'UNKNOWN';
                        if (messages[i - 1]?.role === 'assistant' && (messages[i - 1]?.content as any[])?.some(i => i.type === 'tool-call')) {
                            toolArgs = JSON.stringify((messages[i - 1]?.content as LanguageModelV1ToolCallPart[])?.find(i => i.toolCallId === toolCallId)?.args);
                        }
                        text += `#### [tool ${toolName} with args ${toolArgs}]\nResult:\n${JSON.stringify(result)}\n\n`;
                    }
                    text = `${[...toolNames].map(name => `## For tool ${name}, you should follow these rules:\n - ${tools[name]?.prompt ?? ''}`).join('\n')}\n### Please use the following retrieved data to answer the question:\n${text}`;
                    modifiedMessages.push({
                        role: 'user',
                        content: [{ type: 'text', text }],
                    });
                    continue;
                case 'user':
                    modifiedMessages.push(message);
                    continue;
            }
        }
        return modifiedMessages;
    };

    if (activeTools.length <= 0) {
        (mode as any).tools = undefined;
    }
    params.prompt = trimMessages(messages);
}

function warpModel(model: LanguageModelV1, config: AgentUserConfig, activeTools: string[], toolChoice: ToolChoice, chatModel: string) {
    const mutableModel = model as Writeable<LanguageModelV1>;
    const effectiveModel = (activeTools.length > 0 && toolChoice?.type !== 'none') ? (config.TOOL_MODEL || chatModel) : chatModel;
    if (effectiveModel !== mutableModel.modelId) {
        let newModel: LanguageModelV1 | undefined;
        // Not support cross-provider functionality.
        // if (effectiveModel.includes(':')) {
        //     newModel = await createLlmModel(effectiveModel, config);
        //     // mutableModel.provider = newModel.provider;
        //     mutableModel.specificationVersion = newModel.specificationVersion;
        //     mutableModel.doStream = newModel.doStream;
        //     mutableModel.doGenerate = newModel.doGenerate;
        // }
        mutableModel.modelId = newModel?.modelId ?? effectiveModel;
    }
}

function trimActiveTools(activeTools: string[], toolNames: string[]) {
    return activeTools.length > 0 ? activeTools.filter(name => !toolNames.includes(name)) : [];
}

function recordModelLog(config: AgentUserConfig, model: LanguageModelV1, activeTools: string[], toolChoice: ToolChoice) {
    const logs = getLogSingleton(config);
    log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
    if (activeTools.length > 0 && toolChoice?.type !== 'none') {
        logs.tool.model = model.modelId;
    } else {
        logs.chat.model = model.modelId;
    }
}

export function metaDataExtractor(metadata: any, provider: string) {
    switch (provider) {
        case 'google.generative-ai':
        case 'google.vertex.chat':
        {
            const { groundingChunks, webSearchQueries } = metadata?.google?.groundingMetadata || {};
            if (!groundingChunks) {
                return '';
            }
            const sources = groundingChunks
                ?.map(({ web: { title, uri } }: { web: { title: string; uri: string } }, i: number) => `[${i + 1}] [${title}](${uri})`)
                .join('\n');
            return `\n## Sources:\n${sources}\n## Search Query:\n${webSearchQueries || ''}`;
        }
        default:
            return '';
    }
}
