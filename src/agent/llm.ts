/* eslint-disable no-case-declarations */
import type { MetadataExtractor } from '@ai-sdk/openai-compatible';
import type { LanguageModelV3, LanguageModelV4 } from '@ai-sdk/provider';

type LLMModel = LanguageModelV3 | LanguageModelV4;
import type { AgentUserConfig } from '../config/types';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createCohere } from '@ai-sdk/cohere';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { OpenAICompatibleChatLanguageModel } from '@ai-sdk/openai-compatible';
import { createXai } from '@ai-sdk/xai';
import { isCfWorker } from '../telegram/utils/tg_utils';
import { applyVerdict, classifyApiError, markKeySuccess, selectKey } from './key-manager';

export async function createLlmModel(model: string, context: AgentUserConfig): Promise<LLMModel> {
    let [agent, model_id] = model.includes(':') ? model.trim().split(':') : [context.AI_CHAT_PROVIDER, model];
    // if agent not exists, fallback to model
    const availableAgents = ['openai', 'anthropic', 'google', 'cohere', 'vertex', 'xai', 'oailike'];
    if (!availableAgents.includes(agent)) {
        model_id = model;
    }

    if (!model_id) {
        model_id = context[`${agent.toUpperCase()}_CHAT_MODEL`];
        if (!model_id) {
            throw new Error(`Model ${model} not found`);
        }
    }

    switch (agent) {
        case 'openai':
            const isResponseApi = context.OPENAI_RESPONSE_MODELS.includes('*') || context.OPENAI_RESPONSE_MODELS.includes(model_id);

            const provider = createOpenAI({
                baseURL: context.OPENAI_API_BASE,
                apiKey: selectKey('openai', context.OPENAI_API_KEY) || undefined,
                fetch: mockFetch(model_id, context, agent),
            });
            if (isResponseApi) {
                return provider.responses(model_id) as unknown as LLMModel;
            }
            return provider.languageModel(model_id) as unknown as LLMModel;
        case 'anthropic':
            return createAnthropic({
                baseURL: context.ANTHROPIC_API_BASE,
                apiKey: selectKey('anthropic', context.ANTHROPIC_API_KEY) || undefined,
                fetch: mockFetch(model_id, context, agent),
            }).languageModel(model_id);
        case 'google':
            return createGoogleGenerativeAI({
                baseURL: context.GOOGLE_API_BASE,
                apiKey: selectKey('google', context.GOOGLE_API_KEY) || undefined,
                fetch: mockFetch(model_id, context, agent),
            }).languageModel(model_id);
        case 'cohere':
            return createCohere({
                baseURL: context.COHERE_API_BASE,
                apiKey: selectKey('cohere', context.COHERE_API_KEY) || undefined,
                fetch: mockFetch(model_id, context, agent),
            }).languageModel(model_id);
        case 'vertex':
            if (isCfWorker)
                throw new Error('Vertex is not supported in Cloudflare Workers');
            const { createVertex } = await import('@ai-sdk/google-vertex');
            return createVertex({
                project: context.VERTEX_PROJECT_ID!,
                location: context.VERTEX_LOCATION,
                googleAuthOptions: {
                    credentials: context.VERTEX_CREDENTIALS,
                },
                fetch: mockFetch(model_id, context, agent),
            }).languageModel(model_id);
        case 'xai':
            const xaiProvider = createXai({
                baseURL: context.XAI_API_BASE,
                apiKey: selectKey('xai', context.XAI_API_KEY) || undefined,
                fetch: mockFetch(model_id, context, agent),
            });
            // Use Responses API for models matching XAI_RESPONSE_MODELS
            const useResponsesApi = context.XAI_RESPONSE_MODELS.includes('*')
                || context.XAI_RESPONSE_MODELS.some(prefix => model_id.startsWith(prefix));
            if (useResponsesApi) {
                return xaiProvider.responses(model_id) as unknown as LLMModel;
            }
            return xaiProvider.languageModel(model_id);
        case 'oailike':
        default:
            return new OpenAICompatibleChatLanguageModel(model_id, {
                provider: 'oailike',
                url: ({ path }: { path: string }) => `${context.OAILIKE_API_BASE}${path}`,
                headers: () => ({
                    Authorization: `Bearer ${selectKey('oailike', context.OAILIKE_API_KEY) || ''}`,
                }),
                includeUsage: true,
                metadataExtractor: extraMetadataExtractor(model_id),
                fetch: mockFetch(model_id, context, agent),
            });
    }
    // if (model.includes(':')) {
    //     if (model.startsWith('google:') || model.startsWith('vertex:')) {
    //         // registry返回为完整实例，无法添加额外设置，此处直接注入 safetySettings
    //         let modelInstance = (await registryFactory(context)).languageModel(model);
    //         modelInstance = {
    //             ...modelInstance,
    //             settings: {
    //                 safetySettings: [
    //                     { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_NONE' },
    //                     { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    //                     { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    //                     { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    //                     { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    //                 ],
    //             },
    //         } as LLMModelV1;
    //         return modelInstance;
    //     }
    //     return (await registryFactory(context)).languageModel(model);
    // }
}

function extraMetadataExtractor(modelId: string): MetadataExtractor | undefined {
    const pplxModelPerfix = 'sonar';
    // const openaiSearchModelRegex = /gpt-4o-(?:mini-)?search/;
    const type = modelId.startsWith(pplxModelPerfix)
        ? 'pplx'
        : 'openai';
    return {
        extractMetadata: ({ parsedBody }: { parsedBody: unknown }) => {
            const body = parsedBody as Record<string, any>;
            return Promise.resolve({
                [type]: {
                    citations: body.citations || body.choices[0]?.delta?.annotations,
                },
            });
        },
        createStreamExtractor: () => {
            const citations: string[] = [];
            return {
                processChunk: (parsedChunk: Record<string, any>) => {
                    if (citations.length > 0) {
                        return;
                    }
                    const c = type === 'pplx'
                        ? parsedChunk.citations
                        : parsedChunk.choices[0]?.delta?.annotations;
                    if (c && c.length > 0) {
                        citations.push(...c);
                    }
                },
                buildMetadata: () => ({
                    [type]: {
                        citations,
                    },
                }),
            };
        },
    };
}

export function paramsModifier(model: string, options: Record<string, any>, modifier: string[], extraParams: Record<string, Record<string, any>>) {
    // 解析路径 处理 extraParams
    const paramsHandler = (paths: string, value: any) => {
        const pathList = paths.split('.');
        let current = options;
        const isLast = (i: number) => i === pathList.length - 1;
        for (let i = 0; i < pathList.length; i++) {
            const key = pathList[i];
            if (isLast(i)) {
                current[key] = value;
            } else {
                if (!current[key]) {
                    current[key] = {};
                }
                current = current[key];
            }
        }
    };

    for (const [models, params] of Object.entries(extraParams)) {
        if (models.split(',').some(m => model.startsWith(m)) || models === '*') {
            Object.entries(params).forEach(([key, value]) => {
                paramsHandler(key, value);
            });
            break;
        }
    }
    if (modifier.length === 0) {
        return options;
    }
    // 解析 value
    const valueParser = (text: string) => {
        const numericParser = (text: string) => {
            const num = Number(text);
            return !Number.isNaN(num) && Number.isFinite(num) && String(num) === text.trim() ? num : text;
        };
        switch (text) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                try {
                    return JSON.parse(text);
                } catch {
                    return numericParser(text);
                }
        }
    };
    // 处理 modifier
    for (const item of modifier) {
        const seperator = item.indexOf(':');
        if (seperator < 0) {
            continue;
        }
        const models = item.slice(0, seperator).split(',');
        const values = item.slice(seperator + 1).split('|');
        if (models.includes(model)) {
            values.forEach((text) => {
                switch (text[0]) {
                    case '+':
                        const [key, value] = text.slice(1).split('=');
                        options[key] = valueParser(value);
                        break;
                    case '-':
                        options[text.slice(1)] = undefined;
                        break;
                    default:
                        // options[text] = undefined;
                        break;
                }
            });
            break;
        }
    }

    return options;
}

interface MockParams {
    modelId: string;
    config: AgentUserConfig;
    provider: string;
    options: Record<string, any>;
}

function mockParams({ modelId, config, provider, options }: MockParams) {
    const extraParams = (config[`${provider.toUpperCase()}_API_EXTRA_PARAMS` as keyof AgentUserConfig] as Record<string, Record<string, any>>) || {};
    const { PARAMS_MODIFIER: modifier, OAILIKE_RELAY_TOOLS: relayTools, USE_OAILIKE_RELAY_TOOLS: relayToolsList, GOOGLE_BUILDIN, USE_GOOGLE_BUILDIN, SEARCH_GROUNDING, GOOGLE_RETRIEVAL_CONFIG } = config;

    if (provider === 'oailike') {
        const relayKey = Object.keys(relayTools).find(key => modelId.includes(key));
        if (relayKey && relayToolsList.length > 0) {
            options.tools = relayTools[relayKey].filter(t => relayToolsList.includes(t)).map(t => ({
                type: 'function',
                function: { name: t },
            }));
        }
    }

    if (provider === 'openai') {
        const searchModelRegex = /gpt-4o-(?:mini-)?search/;
        if (searchModelRegex.test(modelId)) {
            options.web_search_options = {};
        }
    }

    if (provider === 'google' || provider === 'gemini' || provider === 'vertex') {
        options.safetySettings = [
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
        ];
        // Google tools are now handled in model_middleware.ts
        // Add retrievalConfig for Google Maps grounding support
        if (GOOGLE_RETRIEVAL_CONFIG?.latLng) {
            options.retrievalConfig = GOOGLE_RETRIEVAL_CONFIG;
        }
    }

    return paramsModifier(modelId, options, modifier, extraParams);
}

function extractKeyFromRequest(provider: string, url: RequestInfo | URL, options?: RequestInit): string | undefined {
    const urlStr = typeof url === 'string'
        ? url
        : (url instanceof URL ? url.href : (url as Request).url);

    // Google / Vertex: key 在 URL query string
    if (provider === 'google' || provider === 'vertex') {
        const m = urlStr.match(/[?&]key=([^&]+)/);
        if (m) return decodeURIComponent(m[1]);
    }

    // 其他 provider: 从 Authorization / x-api-key header
    const headers = options?.headers;
    if (!headers) return undefined;

    const get = (name: string): string | undefined => {
        if (headers instanceof Headers) return headers.get(name) ?? undefined;
        if (Array.isArray(headers)) {
            const found = headers.find(([k]) => k.toLowerCase() === name.toLowerCase());
            return found?.[1];
        }
        const obj = headers as Record<string, string>;
        return obj[name] ?? obj[name.toLowerCase()] ?? obj[name.toUpperCase()];
    };

    const auth = get('Authorization');
    if (auth?.startsWith('Bearer ')) return auth.slice(7);

    const xkey = get('x-api-key');
    if (xkey) return xkey;

    return undefined;
}

function mockFetch(modelId: string, context: AgentUserConfig, provider: string) {
    return async (url: RequestInfo | URL, options?: RequestInit) => {
        const body = JSON.parse(options?.body as string) || {};
        mockParams({ modelId, config: context, provider, options: body });
        const response = await fetch(url, {
            ...options,
            body: JSON.stringify(body),
        });

        // 失败检测：把本次请求的成功/失败反馈到 key-manager
        const key = extractKeyFromRequest(provider, url, options);
        if (key) {
            if (!response.ok) {
                let bodyText = '';
                try {
                    bodyText = await response.clone().text();
                } catch {
                    // 忽略 clone/读取失败 — 还是会用 statusCode 判断
                }
                applyVerdict(provider, key, classifyApiError({
                    statusCode: response.status,
                    responseBody: bodyText,
                    provider,
                }));
            } else {
                markKeySuccess(provider, key);
            }
        }

        return response;
    };
}
