import type { CoreMessage, LanguageModelV1, StepResult } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatStreamTextHandler, OpenAIFuncCallData, ResponseMessage } from './types';
import { generateText, streamText, experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { ENV } from '../config/env';
import { log } from '../extra/log/logger';
import { AIMiddleware } from './model_middleware';
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

export async function requestChatCompletions(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, onResult: ChatStreamTextHandler | null = null, options: SseChatCompatibleOptions | null = null): Promise<string> {
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

export async function streamHandler(stream: AsyncIterable<any>, contentExtractor: (data: any) => string | null, onStream: ChatStreamTextHandler): Promise<string> {
    log.info(`start handle stream`);

    let contentFull = '';
    let lengthDelta = 0;
    let updateStep = 5;
    let msgPromise = null;
    let lastChunk = '';

    const immediatePromise = Promise.resolve('[PROMISE DONE]');

    try {
        for await (const part of stream) {
            const textPart = contentExtractor(part);
            if (textPart === null) {
                continue;
            }
            if (textPart === '')
                continue;
            // 已有delta + 上次chunk的长度
            lengthDelta += lastChunk.length;
            // 当前内容为上次迭代后的数据 （减少一次迭代）
            contentFull += lastChunk;
            // 更新chunk
            lastChunk = textPart;

            if (lastChunk && lengthDelta > updateStep) {
                // 已发送过消息且消息未发送完成
                if (msgPromise && (await Promise.race([msgPromise, immediatePromise]) === '[PROMISE DONE]')) {
                    continue;
                }

                lengthDelta = 0;
                updateStep += 20;
                msgPromise = onStream(`${contentFull}●`);
            }
        }
        contentFull += lastChunk;
    } catch (e) {
        if (contentFull === '') {
            throw e;
        }
        console.error((e as Error).message);
        contentFull += `\nERROR: ${(e as Error).message}`;
    }

    await msgPromise;
    return contentFull;
}
export async function requestChatCompletionsV2(params: { model: LanguageModelV1; toolModel?: LanguageModelV1; prompt?: string; messages: CoreMessage[]; tools?: any; activeTools?: string[]; context: AgentUserConfig }, onStream: ChatStreamTextHandler | null, onResult: ChatStreamTextHandler | null = null): Promise<ResponseMessage[]> {
    try {
        const middleware = AIMiddleware({
            config: params.context,
            _models: {},
            activeTools: params.activeTools || [],
            onStream,
        });
        const hander_params = {
            model: wrapLanguageModel({
                model: params.activeTools ? params?.toolModel || params.model : params.model,
                middleware,
            }),
            messages: params.messages,
            maxSteps: 3,
            maxRetries: 0,
            temperature: (params.activeTools?.length || 0) > 0 ? 0.1 : 1,
            onStepFinish: middleware.onStepFinish as (data: StepResult<any>) => void,
        };
        if (onStream !== null) {
            const stream = await streamText({
                ...hander_params,
                onChunk: middleware.onChunk as (data: any) => void,
            });
            const contentFull = await streamHandler(stream.textStream, t => t, onStream);
            onResult?.(contentFull);
            return (await stream.response).messages;
        } else {
            const result = await generateText(hander_params);
            onResult?.(result.text);
            return result.response.messages;
        }
    } catch (error) {
        console.error((error as Error).message, (error as Error).stack);
        throw error;
    }
}
