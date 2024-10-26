import type { ChatStreamTextHandler, CompletionData, OpenAIFuncCallData } from './types';
/* eslint-disable antfu/if-newline */
import { ENV } from '../config/env';
import { log } from '../extra/log/logger';
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

export async function requestChatCompletions(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, onResult: ChatStreamTextHandler | null = null, options: SseChatCompatibleOptions | null = null): Promise<CompletionData> {
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
        return await iterStream(body, stream, options, onStream);
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
        const usage = result?.usage;
        await onResult?.(result);
        return {
            tool_calls: options.fullFunctionCallExtractor?.(result) || undefined,
            content: options.fullContentExtractor?.(result) || '',
            ...(usage && { usage }),
        };
    } catch (e) {
        console.error(e);
        throw new Error(JSON.stringify(result));
    }
}

function clearTimeoutID(timeoutID: any) {
    if (timeoutID)
        clearTimeout(timeoutID);
}

export async function iterStream(body: any, stream: AsyncIterable<any>, options: SseChatCompatibleOptions, onStream: ChatStreamTextHandler): Promise<CompletionData> {
    log.info(`start handle stream`);

    let contentFull = '';
    let lengthDelta = 0;
    let updateStep = 0;
    let needSendCallMsg = true;
    const tool_calls: string | any[] = [];
    let msgPromise = null;
    let lastChunk = '';
    let usage = null;

    const immediatePromise = Promise.resolve('[PROMISE DONE]');

    try {
        for await (const data of stream) {
            const c = options.contentExtractor?.(data) || '';
            // log.debug('--- chunck data:', data);
            usage = data?.usage;
            if (body?.tools?.length > 0)
                options.functionCallExtractor?.(data, tool_calls);
            if (c === '' && tool_calls.length === 0) continue;

            if (tool_calls.length > 0) {
                if (needSendCallMsg) {
                    msgPromise = onStream(`\`Start call...\``);
                    needSendCallMsg = false;
                }
                continue;
            }
            // 已有delta + 上次chunk的长度
            lengthDelta += lastChunk.length;
            // 当前内容为上次迭代后的数据 （减少一次迭代）
            contentFull += lastChunk;
            // 更新chunk
            lastChunk = c;

            if (lastChunk && lengthDelta > updateStep) {
                // 已发送过消息且消息未发送完成
                if (msgPromise && (await Promise.race([msgPromise, immediatePromise]) === '[PROMISE DONE]')) {
                    continue;
                }

                lengthDelta = 0;
                updateStep += 20;
                msgPromise = onStream(`${contentFull}●`);
                // console.log(`____chunck send: ${contentFull}●`);
            }
        }
        contentFull += lastChunk;
        log.info('--- contentFull:', contentFull);
    } catch (e) {
        contentFull += `\nERROR: ${(e as Error).message}`;
    }

    await msgPromise;
    return {
        ...(tool_calls?.length > 0 && { tool_calls }),
        content: contentFull,
        ...(usage && { usage }),
    };
}
