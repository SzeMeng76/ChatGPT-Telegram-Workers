/* eslint-disable no-case-declarations */
import type { LanguageModelV3, LanguageModelV4 } from '@ai-sdk/provider';
import type { ModelMessage, StepResult, TextStreamPart } from 'ai';

type LLMModel = LanguageModelV3 | LanguageModelV4;
import type { AgentUserConfig } from '../config/env';
import type { MessageInfo, ToolChoice } from './model_middleware';
import type { ChatStreamTextHandler, OpenAIFuncCallData, ResponseMessage } from './types';
import { generateText, stepCountIs, streamText, TypeValidationError, wrapLanguageModel } from 'ai';
import { ENV } from '../config/env';
import { log } from '../log';
import { SEGMENTATION_MARK } from '../telegram/utils/md2tgmd';
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
                const chunk = d?.choices?.[0]?.delta?.tool_calls;
                if (!Array.isArray(chunk))
                    return;
                for (const a of chunk) {
                    if (!Object.hasOwn(a, 'index')) {
                        throw new Error(`The function chunk don't have index: ${JSON.stringify(chunk)}`);
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
    const messageInfo: MessageInfo = {
        content: '',
        occured_error: false,
    };

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
        return streamHandler(stream, options.contentExtractor!, onStream, messageInfo);
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

export async function streamHandler(stream: AsyncIterable<any>, contentExtractor: (data: any) => string | null, onStream: ChatStreamTextHandler, messageInfo: MessageInfo): Promise<string> {
    let lengthDelta = 0;
    let updateStep = 5;
    const maxLength = 10_000;

    try {
        for await (const part of stream) {
            const textPart = contentExtractor(part);
            if (textPart === null || textPart === undefined || textPart === '') {
                continue;
            }
            // 已有delta + chunk的长度
            lengthDelta += textPart.length;
            messageInfo.content += textPart;

            if (lengthDelta > updateStep) {
                lengthDelta = 0;
                updateStep = Math.min(updateStep + 40, maxLength);
                onStream.send(`${messageInfo.content.trimEnd()}●`);
            }
        }
    } catch (e) {
        if (messageInfo.content === '') {
            throw e;
        }
        console.error((e as Error).message, (e as Error).stack);
        let content: string | undefined;
        if (e instanceof TypeValidationError) {
            content = (e.value as any)?.choices?.[0]?.delta?.content;
        }
        messageInfo.content += (content ?? `\n\n\`\`\`Error\n${(e as Error).message}\n\`\`\``);
        messageInfo.occured_error = true;
    }

    return messageInfo.content;
}

// Clean xAI internal render tags from model output (e.g. [grok:render ...><argument ...>)
function stripGrokRenderTags(content: string): string {
    return content.replace(/\[grok:render\b[^\]]*>[\s\S]*?(?:<\/argument>\s*)+/gi, '');
}

export async function requestChatCompletionsV2({ model, messages, tools, activeTools, toolChoice, context, cache }: { model: LLMModel; toolModel?: LLMModel; prompt?: string; messages: ModelMessage[]; tools?: any; activeTools: string[]; toolChoice?: ToolChoice[] | undefined; context: AgentUserConfig; cache?: string[] }, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> {
    // DEBUG: Log messages before sending to SDK
    log.info(`[requestChatCompletionsV2] messages before SDK: ${JSON.stringify(messages.map(m => {
        if (m.role === 'user' && Array.isArray(m.content)) {
            return { role: m.role, content: m.content.map(c => c.type === 'file' ? { type: c.type, mediaType: (c as any).mediaType } : { type: c.type }) };
        }
        return { role: m.role };
    }))}`);

    // 引入多轮对话 拼接提示
    const messageInfo: MessageInfo = {
        content: cache?.join() ?? '',
        occured_error: false,
    };
    const { prepareStepPre, onStepFinish, onChunk, ...middleware } = await AIMiddleware({
        config: context,
        activeTools,
        onStream,
        toolChoice: toolChoice || [],
        chatModel: model.modelId,
        messageInfo,
    });

    const handeredParams = await combineParams({ context, middleware, model, messages, activeTools, tools, prepareStepPre, onStepFinish, onChunk });

    let responseMessages: ResponseMessage[] = [];
    let contentFull = '';

    if (onStream !== null) {
        // const stream = streamText({ ...hander_params, ...mockParams(middleware) });
        const stream = streamText(handeredParams);
        const dataExtractor = thinkingExtractor(messageInfo);

        contentFull = await streamHandler(stream.fullStream, dataExtractor, onStream, messageInfo);
        responseMessages = messageInfo.occured_error ? [{ role: 'assistant', content: contentFull }] : (await stream.response).messages;
        contentFull = messageInfo.occured_error ? contentFull : metaDataExtractor(
            await stream.providerMetadata,
            model.provider,
            contentFull,
            { streamSources: (messageInfo as any).sources }
        );
    } else {
        const result = await generateText(handeredParams);
        contentFull = `${result.reasoning ? `>\`Thought for several seconds\`\n>${(result.reasoningText ?? '').trim().replace(/\n/g, '\n>')}\n>✹\n` : ''}${result.text}`;
        responseMessages = result.response.messages;
        contentFull = metaDataExtractor(
            result.providerMetadata,
            model.provider,
            contentFull,
            { responseMessages: result.response.messages }
        );
    }

    // Clean xAI internal render tags from output
    if (model.provider === 'xai.chat' || model.provider === 'xai.responses') {
        contentFull = stripGrokRenderTags(contentFull);
    }

    return { messages: responseMessages, content: contentFull };
}

function thinkingExtractor(messageInfo: MessageInfo) {
    let thinkingStart = false;
    let thinkingStartTime: undefined | number;
    let reasoningBuffer = '';
    let lastOutputTime = 0;
    const thinkingTag = ENV.EXPANDABLE_THINKING ? '**>`Thinking\.\.\.`' : '>`Thinking\.\.\.`';
    const sources: Array<{ url: string; title: string }> = [];

    // Track if we detected inline thought text (for AI models that output "thought" prefix in text-delta)
    let detectedInlineThought = false;
    let inlineThoughtBuffer = '';

    // 存储 sources 到 messageInfo 以便后续处理
    (messageInfo as any).sources = sources;

    return (data: TextStreamPart<any>) => {
        switch (data.type) {
            case 'reasoning-start':
                if (!ENV.SHOW_THINKING_TEXT) {
                    return '';
                }
                if (!thinkingStart) {
                    thinkingStart = true;
                    thinkingStartTime = Date.now();
                    reasoningBuffer = '';
                    lastOutputTime = Date.now();
                    return thinkingTag;
                }
                return '';
            case 'reasoning-delta':
                if (!ENV.SHOW_THINKING_TEXT) {
                    return '';
                }
                // 积累思考文本
                reasoningBuffer += data.text;
                const now = Date.now();

                // 当积累到足够长度、遇到句末标点、或距上次输出时间超过500ms时输出
                if (reasoningBuffer.length >= 50 ||
                    /[。！？.!?]\s*$/.test(reasoningBuffer.trim()) ||
                    (now - lastOutputTime > 500 && reasoningBuffer.length >= 20)) {
                    const output = `\n>${reasoningBuffer.replace(/\n/g, '\n>')}`;
                    reasoningBuffer = '';
                    lastOutputTime = now;
                    return output;
                }
                return '';
            case 'reasoning-end':
                if (!ENV.SHOW_THINKING_TEXT) {
                    return '';
                }
                // 输出剩余的缓冲内容
                let output = '';
                if (reasoningBuffer.length > 0) {
                    output = `\n>${reasoningBuffer.replace(/\n/g, '\n>')}`;
                    reasoningBuffer = '';
                }
                return output;
            case 'text-start':
                log.info('[thinkingExtractor] text-start event');
                if (!thinkingStart)
                    return '';
                thinkingStart = false;
                const thinkingTime = ((Date.now() - thinkingStartTime!) / 1e3).toFixed(1);
                messageInfo.content = messageInfo.content
                    .replace(thinkingTag, `>\`Thought for ${thinkingTime} seconds\``)
                    // remove trailing blank lines
                    .replace(/(\n>)*$/, '')
                    // three or more newlines are trimmed to 2 newlines
                    .replace(/(\n>){3,}$/g, '\n>\n>');
                return `\n>✹\n${SEGMENTATION_MARK}\n`;
            case 'text-delta':
                log.debug(`[thinkingExtractor] text-delta: "${data.text}"`);

                if (!ENV.SHOW_THINKING_TEXT) {
                    return data.text;
                }

                // WORKAROUND: Some AI models (particularly older Google Gemini versions)
                // may output thought content directly in text-delta with "thought " prefix
                // instead of using proper reasoning-start/delta/end events.
                // This happens when the AI SDK version doesn't correctly parse the 'thought' field.

                const isStartOfMessage = messageInfo.content.trim().length === 0 ||
                                        messageInfo.content.endsWith(SEGMENTATION_MARK + '\n');

                // Detect start of inline thought: patterns like "thought ", "thinking:", "reasoning:"
                // at the beginning of response (case-insensitive)
                const thoughtPatterns = /^(thought|thinking|reasoning)[\s:]+/i;

                if (isStartOfMessage && thoughtPatterns.test(data.text)) {
                    detectedInlineThought = true;
                    inlineThoughtBuffer = data.text;
                    log.info('[thinkingExtractor] Detected inline thought text from AI model');
                    return `${thinkingTag}\n>${data.text.replace(/\n/g, '\n>')}`;
                }

                // Continue accumulating inline thought
                if (detectedInlineThought) {
                    inlineThoughtBuffer += data.text;

                    // Try to detect end of thought block with improved heuristics:
                    // 1. Double newline indicates end of thought paragraph
                    // 2. Sentence end followed by capitalized word (likely start of real response)
                    // 3. Length threshold: if thought is very long (>500 chars), look for natural breaks
                    const hasDoubleNewline = /\n\s*\n/.test(inlineThoughtBuffer);
                    const endsWithSentenceThenCapital = /[.!?]\s+[A-Z]/.test(inlineThoughtBuffer.slice(-100));
                    const isVeryLong = inlineThoughtBuffer.length > 500;

                    // More sophisticated end detection
                    const shouldEndThought = hasDoubleNewline ||
                                            (inlineThoughtBuffer.length > 200 && endsWithSentenceThenCapital) ||
                                            (isVeryLong && /[.!?]\s*$/.test(inlineThoughtBuffer.trim()));

                    if (shouldEndThought) {
                        // End inline thought
                        detectedInlineThought = false;
                        const estimatedTime = (inlineThoughtBuffer.length / 100).toFixed(1);
                        messageInfo.content = messageInfo.content
                            .replace(thinkingTag, `>\`Thought for ${estimatedTime} seconds\``);
                        inlineThoughtBuffer = '';
                        log.info('[thinkingExtractor] Inline thought block ended');

                        // Handle the ending text properly:
                        // If it ends with double newline, the current delta might be part of response
                        if (hasDoubleNewline) {
                            // Split at double newline - first part is thought, rest is response
                            const lastNewlineMatch = data.text.match(/\n\s*\n/);
                            if (lastNewlineMatch) {
                                const splitIndex = lastNewlineMatch.index! + lastNewlineMatch[0].length;
                                const thoughtPart = data.text.slice(0, splitIndex);
                                const responsePart = data.text.slice(splitIndex);
                                return `${thoughtPart.replace(/\n/g, '\n>')}\n>✹\n${SEGMENTATION_MARK}\n${responsePart}`;
                            }
                        }

                        return `${data.text.replace(/\n/g, '\n>')}\n>✹\n${SEGMENTATION_MARK}\n`;
                    }

                    // Continue thought block
                    return `\n>${data.text.replace(/\n/g, '\n>')}`;
                }

                return data.text;
            case 'text-end':
                return '';
            case 'source':
                // xAI web_search/x_search sources
                if (ENV.ENABLE_SEARCH_SOURCE && data.sourceType === 'url') {
                    sources.push({
                        url: data.url,
                        title: data.title || data.url,
                    });
                }
                return '';
            case 'error':
                throw data.error;
            default:
                return '';
        }
    };
}

async function combineParams({ context, middleware, model, messages, activeTools, tools, prepareStepPre, onStepFinish, onChunk }: { context: AgentUserConfig; middleware: any; model: LLMModel; messages: ModelMessage[]; activeTools: string[]; tools: any; prepareStepPre: (middleware: (...args: any[]) => any) => any; onStepFinish: (data: StepResult<any, any>) => void; onChunk: (data: { chunk: TextStreamPart<any> }) => void }) {
    // Extract system message from messages array
    const systemMessageIndex = messages.findIndex(m => m.role === 'system');
    let systemMessage: string | undefined;
    let filteredMessages = messages;

    if (systemMessageIndex !== -1) {
        const sysMsg = messages[systemMessageIndex];
        systemMessage = typeof sysMsg.content === 'string' ? sysMsg.content : undefined;
        // Remove system message from messages array
        filteredMessages = messages.filter((_, index) => index !== systemMessageIndex);
    }

    // Build Anthropic provider options with cache control and tool streaming
    const anthropicOptions: Record<string, any> = {
        ...context.ANTHROPIC_PROVIDER_OPTIONS,
    };

    // Add tool streaming support for Anthropic
    if (context.ANTHROPIC_ENABLE_TOOL_STREAMING !== undefined) {
        anthropicOptions.toolStreaming = context.ANTHROPIC_ENABLE_TOOL_STREAMING;
    }

    // Add structured output mode for Anthropic
    if (context.ANTHROPIC_STRUCTURED_OUTPUT_MODE && context.ANTHROPIC_STRUCTURED_OUTPUT_MODE !== 'auto') {
        anthropicOptions.structuredOutputMode = context.ANTHROPIC_STRUCTURED_OUTPUT_MODE;
    }

    // Build xAI provider options with store setting
    const xaiOptions: Record<string, any> = {
        ...context.XAI_PROVIDER_OPTIONS,
    };
    // Add store option for Responses API (controls server-side conversation history)
    if (!context.XAI_STORE_CONVERSATION) {
        xaiOptions.store = false;
    }

    // Build OpenAI provider options
    const openaiOptions: Record<string, any> = {
        ...context.OPENAI_PROVIDER_OPTIONS,
    };

    // OpenAI Responses API (GPT-5/o1/o3/o4 series) requires stronger system prompts
    // Enhance system message with explicit instructions for better compliance
    if (model.provider === 'openai.responses' && systemMessage) {
        // Strengthen system prompt with explicit directives
        const originalPrompt = systemMessage;
        systemMessage = `CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE RULES STRICTLY:

${originalPrompt}

IMPORTANT REMINDERS:
- Follow the above instructions precisely without deviation
- Do not override these instructions with your own assumptions
- Maintain consistency with the specified behavior throughout the conversation`;
    }

    const providerOptions = {
        openai: openaiOptions,
        anthropic: anthropicOptions,
        google: context.GOOGLE_PROVIDER_OPTIONS,
        xai: xaiOptions,
        'oailike.chat': context.OAILIKE_PROVIDER_OPTIONS,
    };

    // Add cache control and context management for Anthropic
    if (model.provider === 'anthropic.messages') {
        // Context Management - Clean up old tool calls to reduce context length
        if (context.ANTHROPIC_ENABLE_CONTEXT_MANAGEMENT) {
            const contextManagementConfig: any = {
                edits: [],
            };

            // Clear old tool uses
            const clearToolUsesConfig: any = {
                type: 'clear_tool_uses_20250919',
            };

            // Trigger configuration
            if (context.ANTHROPIC_CONTEXT_CLEAR_TRIGGER === 'auto') {
                // Auto mode: trigger based on tool uses count
                clearToolUsesConfig.trigger = {
                    type: 'tool_uses',
                    value: context.ANTHROPIC_CONTEXT_KEEP_RECENT + 2, // Trigger after N+2 tool uses
                };
            }
            // Manual mode: no trigger (user controls when to clear)

            // Keep recent tool uses
            if (context.ANTHROPIC_CONTEXT_KEEP_RECENT > 0) {
                clearToolUsesConfig.keep = {
                    type: 'tool_uses',
                    value: context.ANTHROPIC_CONTEXT_KEEP_RECENT,
                };
            }

            // Clear at least N tokens
            if (context.ANTHROPIC_CONTEXT_CLEAR_AT_LEAST > 0) {
                clearToolUsesConfig.clearAtLeast = {
                    type: 'input_tokens',
                    value: context.ANTHROPIC_CONTEXT_CLEAR_AT_LEAST * 1000, // Convert to tokens (assume 1k tokens per unit)
                };
            }

            // Clear tool inputs
            if (context.ANTHROPIC_CONTEXT_CLEAR_TOOL_INPUTS) {
                clearToolUsesConfig.clearToolInputs = true;
            }

            // Exclude tools
            if (context.ANTHROPIC_CONTEXT_EXCLUDE_TOOLS.length > 0) {
                clearToolUsesConfig.excludeTools = context.ANTHROPIC_CONTEXT_EXCLUDE_TOOLS;
            }

            contextManagementConfig.edits.push(clearToolUsesConfig);

            // Clear old thinking content (for reasoning models)
            if (context.ANTHROPIC_ENABLE_THINKING_CLEANUP && context.ANTHROPIC_THINKING_KEEP_RECENT > 0) {
                contextManagementConfig.edits.push({
                    type: 'clear_thinking_20250919',
                    trigger: {
                        type: 'tool_uses',
                        value: context.ANTHROPIC_THINKING_KEEP_RECENT + 1,
                    },
                    keep: {
                        type: 'tool_uses',
                        value: context.ANTHROPIC_THINKING_KEEP_RECENT,
                    },
                });
            }

            anthropicOptions.contextManagement = contextManagementConfig;
        }

        // Cache Control - Mark system message and tools as cacheable
        if (context.ANTHROPIC_ENABLE_CACHE_CONTROL) {
            // System message cache control will be handled by the system parameter

            // Mark tools as cacheable if tools exist
            if (tools && Object.keys(tools).length > 0) {
                // Get the last tool and mark it as cacheable
                // This follows the AI SDK pattern of caching the last tool definition
                const toolKeys = Object.keys(tools);
                const lastToolKey = toolKeys[toolKeys.length - 1];
                const lastTool = tools[lastToolKey];

                if (lastTool && typeof lastTool === 'object' && !lastTool.providerOptions) {
                    lastTool.providerOptions = {
                        anthropic: {
                            cacheControl: { type: 'ephemeral' },
                        },
                    };
                }
            }
        }
    }

    return {
        model: wrapLanguageModel({
            model,
            middleware,
        }),
        providerOptions,
        system: systemMessage,
        messages: filteredMessages,
        experimental_continueSteps: context.CONTINUE_STEP,
        maxRetries: context.MAX_RETRIES,
        temperature: (activeTools?.length || 0) > 0 ? context.FUNCTION_CALL_TEMPERATURE : context.CHAT_TEMPERATURE,
        tools,
        maxTokens: context.MAX_TOKENS,
        activeTools,
        prepareStep: prepareStepPre(middleware),
        stopWhen: stepCountIs(context.MAX_STEPS),
        onStepFinish,
        onChunk,
        ...(ENV.CHAT_TOTAL_DURATION_LIMIT > 0 && { abortSignal: AbortSignal.timeout(ENV.CHAT_TOTAL_DURATION_LIMIT * 1e3) }),
    };
}
