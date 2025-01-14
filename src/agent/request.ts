import type { CoreMessage, LanguageModelV1, StepResult, ToolCallPart, ToolResultPart } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatStreamTextHandler, OpenAIFuncCallData, ResponseMessage } from './types';
import { generateText, streamText, TypeValidationError, experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { createLlmModel, type ToolChoice } from '.';
import { ENV } from '../config/env';
import { log } from '../log/logger';
import { manualRequestTool } from '../tools';
import { AIMiddleware, metaDataExtractor } from './model_middleware';
import { Stream } from './stream';

export interface SseChatCompatibleOptions {
    streamBuilder?: (resp: Response, controller: AbortController) => Stream;
    contentExtractor?: (data: object) => string | null;
    fullContentExtractor?: (data: object) => string | null;
    functionCallExtractor?: (data: object, call_list: any[]) => void;
    fullFunctionCallExtractor?: (data: object) => OpenAIFuncCallData[] | null;
    errorExtractor?: (data: object) => string | null;
}

function fixOpenAICompatibleOptions(options: SseChatCompatibleOptions | null): SseChatCompatibleOptions {
    options = options || {};
    options.streamBuilder = options.streamBuilder || function (r, c) {
        return new Stream(r, c);
    };
    options.contentExtractor = options.contentExtractor || function (d: any) {
        return d?.choices?.[0]?.delta?.content;
    };
    options.fullContentExtractor = options.fullContentExtractor || function (d: any) {
        return d.choices?.[0]?.message.content;
    };
    options.functionCallExtractor
        = options.functionCallExtractor
        || function (d: any, call_list: OpenAIFuncCallData[]) {
            const chunck = d?.choices?.[0]?.delta?.tool_calls;
            if (!Array.isArray(chunck))
                return;
            for (const a of chunck) {
                if (!Object.hasOwn(a, 'index')) {
                    throw new Error(`The function chunck don't have index: ${JSON.stringify(chunck)}`);
                }
                if (a?.type === 'function') {
                    call_list[a.index] = { id: a.id, type: a.type, function: a.function };
                } else {
                    call_list[a.index].function.arguments += a.function.arguments;
                }
            }
        };
    options.fullFunctionCallExtractor
        = options.fullFunctionCallExtractor
        || function (d: any) {
            return d?.choices?.[0]?.message?.tool_calls;
        };
    options.errorExtractor = options.errorExtractor || function (d: any) {
        return d.error?.message;
    };
    return options;
}

export function isJsonResponse(resp: Response): boolean {
    return resp.headers.get('content-type')?.includes('json') || false;
}

export function isEventStreamResponse(resp: Response): boolean {
    const types = ['application/stream+json', 'text/event-stream'];
    const content = resp.headers.get('content-type') || '';
    for (const type of types) {
        if (content.includes(type)) {
            return true;
        }
    }
    return false;
}

type OnResult = ((result: any) => Promise<any>) | null;

export async function requestChatCompletions(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, onResult: OnResult = null, options: SseChatCompatibleOptions | null = null): Promise<string> {
    const controller = new AbortController();
    const { signal } = controller;

    let timeoutID = null;
    if (ENV.CHAT_COMPLETE_API_TIMEOUT > 0 && !body?.model?.includes('o1')) {
        timeoutID = setTimeout(() => controller.abort(), ENV.CHAT_COMPLETE_API_TIMEOUT * 1e3);
    }

    log.info('start request llm');

    log.debug('request url, headers, body', url, header, body);
    const resp = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body),
        signal,
    });

    clearTimeoutID(timeoutID);

    options = fixOpenAICompatibleOptions(options);

    if (onStream && resp.ok && isEventStreamResponse(resp)) {
        const stream = options.streamBuilder?.(resp, controller);
        if (!stream) {
            throw new Error('Stream builder error');
        }
        return streamHandler(stream, options.contentExtractor!, onStream);
    }

    if (!isJsonResponse(resp)) {
        throw new Error(resp.statusText);
    }

    const result = await resp.json();

    if (!result) {
        throw new Error('Empty response');
    }

    if (options.errorExtractor?.(result)) {
        throw new Error(options.errorExtractor?.(result) || 'Unknown error');
    }

    try {
        await onResult?.(result);
        return options.fullContentExtractor?.(result) || '';
    } catch (e) {
        console.error(e);
        throw new Error(JSON.stringify(result));
    }
}

function clearTimeoutID(timeoutID: any) {
    if (timeoutID)
        clearTimeout(timeoutID);
}

export async function streamHandler(stream: AsyncIterable<any>, contentExtractor: (data: any) => string | null, onStream: ChatStreamTextHandler, messageReferencer?: string[], errorReferencer: boolean[] = [false]): Promise<string> {
    log.info(`start handle stream`);

    let contentFull = '';
    let lengthDelta = 0;
    let updateStep = 5;
    let lastChunk = '';
    const maxLength = 10_000;

    try {
        for await (const part of stream) {
            const textPart = contentExtractor(part);
            if (textPart === null || textPart === '') {
                continue;
            }
            // 已有delta + 上次chunk的长度
            lengthDelta += lastChunk.length;
            // 当前内容为上次迭代后的数据 （减少一次迭代）
            contentFull += lastChunk;
            messageReferencer?.push(lastChunk);
            // 更新chunk
            lastChunk = textPart;

            if (lastChunk && lengthDelta > updateStep) {
                lengthDelta = 0;
                updateStep = Math.min(updateStep + 40, maxLength);
                onStream.send(`${contentFull.trimEnd()}●`);
            }
        }
        contentFull += lastChunk;
    } catch (e) {
        if (contentFull === '') {
            throw e;
        }
        console.error((e as Error).message, (e as Error).stack);
        let content: string | undefined;
        if (e instanceof TypeValidationError) {
            content = (e.value as any)?.choices?.[0]?.delta?.content;
        }
        contentFull += (content ?? `\n\n\`\`\`Error\n${(e as Error).message}\n\`\`\``);
        errorReferencer[0] = true;
    }

    return contentFull;
}

export async function requestChatCompletionsV2(params: { model: LanguageModelV1; toolModel?: LanguageModelV1; prompt?: string; messages: CoreMessage[]; tools?: any; activeTools?: string[]; toolChoice?: ToolChoice[] | undefined; context: AgentUserConfig }, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> {
    const messageReferencer = [] as string[];
    const middleware = AIMiddleware({
        config: params.context,
        activeTools: params.activeTools || [],
        onStream,
        toolChoice: params.toolChoice || [],
        chatModel: params.model.modelId,
        messageReferencer,
    });
    const hander_params = {
        model: wrapLanguageModel({
            model: params.activeTools?.length ? await createLlmModel(params.context.TOOL_MODEL, params.context) : params.model,
            middleware,
        }),
        messages: params.messages,
        maxSteps: params.context.MAX_STEPS,
        experimental_continueSteps: params.context.CONTINUE_STEP,
        maxRetries: params.context.MAX_RETRIES,
        temperature: (params.activeTools?.length || 0) > 0 ? params.context.FUNCTION_CALL_TEMPERATURE : params.context.CHAT_TEMPERATURE,
        tools: params.tools,
        maxTokens: params.context.MAX_TOKENS,
        activeTools: params.activeTools,
        onStepFinish: middleware.onStepFinish as (data: StepResult<any>) => void,
    };
    let messages: ResponseMessage[] = [];
    let contentFull = '';
    let metadata = '';
    const errorReferencer = [false];

    if (onStream !== null /* && params.model.modelId !== 'gpt-4o-audio-preview' */) {
        const stream = streamText({
            ...hander_params,
            onChunk: middleware.onChunk as (data: any) => void,
        });
        contentFull = await streamHandler(stream.textStream, t => t, onStream, messageReferencer, errorReferencer);
        messages = errorReferencer[0] ? [{ role: 'assistant', content: contentFull }] : (await stream.response).messages;
        metadata = errorReferencer[0] ? '' : metaDataExtractor(await stream.experimental_providerMetadata, params.model.provider);
    } else {
        const result = await generateText(hander_params);
        contentFull = result.text;
        messages = result.response.messages;
        metadata = metaDataExtractor(await result.experimental_providerMetadata, params.model.provider);
    }
    try {
        // when last message is tool, avoid ai message not sent complete
        const lastMessageContent = messages.at(-1)?.content;
        if (contentFull.trim() !== '' && Array.isArray(lastMessageContent) && (lastMessageContent as (ToolCallPart | ToolResultPart)[]).some(c => c.type === 'tool-call') && onStream) {
            await onStream.end?.(contentFull);
        }
        await manualRequestTool(messages, params.context);
    } catch (e) {
        if (contentFull.trim() === '') {
            throw e;
        }
        log.error((e as Error).message, (e as Error).stack);
        messages.push({
            role: 'tool',
            content: [{
                type: 'tool-result',
                toolCallId: 'tool-call-id',
                toolName: 'tool-name',
                result: {
                    result: `\`\`\`Error\n${(e as Error).message}\n\`\`\``,
                },
            }],
        });
    }
    metadata = metaDataExtractor(metadata, params.model.provider);
    return {
        messages,
        content: contentFull + metadata,
    };
}
