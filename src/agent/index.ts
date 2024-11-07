/* eslint-disable no-case-declarations */
import type { CoreMessage, CoreUserMessage, LanguageModelV1, Provider } from 'ai';
import type { AudioAgent, ChatAgent, ImageAgent, LLMChatParams } from './types';
import { anthropic, createAnthropic } from '@ai-sdk/anthropic';
import { createAzure } from '@ai-sdk/azure';
import { createCohere } from '@ai-sdk/cohere';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI, openai } from '@ai-sdk/openai';
import { experimental_createProviderRegistry as createProviderRegistry, experimental_customProvider as customProvider } from 'ai';
import { type AgentUserConfig, ENV } from '../config/env';
import { vaildTools } from '../extra/tools';
import { isCfWorker } from '../telegram/utils/utils';
import { Anthropic } from './anthropic';
import { AzureChatAI, AzureImageAI } from './azure';
import { Cohere } from './cohere';
import { Google } from './google';
import { Mistral } from './mistralai';

import { Dalle, OpenAI, Transcription } from './openai';
import { OpenAILike, SiliconImage } from './openailike';
import { Vertex } from './vertex';
import { WorkersChat, WorkersImage } from './workersai';

const CHAT_AGENTS: ChatAgent[] = [
    new Anthropic(),
    new AzureChatAI(),
    new Cohere(),
    new Google(),
    new Mistral(),
    new OpenAI(),
    new WorkersChat(),
    new OpenAILike(),
    new Vertex(),
];

export function loadChatLLM(context: AgentUserConfig): ChatAgent | null {
    // let CHAT_AGENTS = CHAT_AGENTS_ITER();
    for (const llm of CHAT_AGENTS) {
        if (llm.name === context.AI_PROVIDER) {
            return llm;
        }
    }
    // 找不到指定的AI，使用第一个可用的AI
    // CHAT_AGENTS = CHAT_AGENTS_ITER();
    for (const llm of CHAT_AGENTS) {
        if (llm.enable(context)) {
            return llm;
        }
    }
    return null;
}

const IMAGE_AGENTS: ImageAgent[] = [
    new AzureImageAI(),
    new Dalle(),
    new WorkersImage(),
    new SiliconImage(),
];

export function loadImageGen(context: AgentUserConfig): ImageAgent | null {
    for (const imgGen of IMAGE_AGENTS) {
        if (imgGen.name === context.AI_IMAGE_PROVIDER) {
            return imgGen;
        }
    }
    // 找不到指定的AI，使用第一个可用的AI
    for (const imgGen of IMAGE_AGENTS) {
        if (imgGen.enable(context)) {
            return imgGen;
        }
    }
    return null;
}

const AUDIO_AGENTS: AudioAgent[] = [
    // 当前仅实现OpenAI音频处理
    new Transcription(),
];

export function loadAudioLLM(context: AgentUserConfig) {
    for (const llm of AUDIO_AGENTS) {
        if (llm.name === context.AI_PROVIDER) {
            return llm;
        }
    }
    // 找不到指定的AI，使用第一个可用的AI
    for (const llm of AUDIO_AGENTS) {
        if (llm.enable(context)) {
            return llm;
        }
    }
    return null;
}

/**
 * 提取模型等信息
 * @param {UserConfigType} config
 * @return {string} info
 */
export function customInfo(config: AgentUserConfig): string {
    const other_info = {
        mode: config.CURRENT_MODE,
        prompt: `${(config.SYSTEM_INIT_MESSAGE?.slice(0, 50))}...`,
        MAPPING_KEY: config.MAPPING_KEY,
        MAPPING_VALUE: config.MAPPING_VALUE,
        USE_TOOLS: config.USE_TOOLS,
        TOOL_MODEL: config.TOOL_MODEL,
        FUNCTION_REPLY_ASAP: config.FUNCTION_REPLY_ASAP,
        VERTEX_SEARCH_GROUNDING: config.VERTEX_SEARCH_GROUNDING,
        FUNC_LOOP_TIMES: ENV.FUNC_LOOP_TIMES,
        FUNC_CALL_TIMES: ENV.CON_EXEC_FUN_NUM,
        EXPIRED_TIME: ENV.EXPIRED_TIME,
        CRON_CHECK_TIME: ENV.CRON_CHECK_TIME,
    };
    return JSON.stringify(other_info, null, 2);
}

export async function warpLLMParams(params: { messages: CoreMessage[]; model: LanguageModelV1 }, context: AgentUserConfig) {
    const tool_envs: Record<string, any> = { ...(context.JINA_API_KEY && { JINA_API_KEY: context.JINA_API_KEY[Math.floor(Math.random() * context.JINA_API_KEY.length)] }) };

    const env_perfix = 'TOOL_ENV_';
    Object.keys(context).forEach(i => i.startsWith(env_perfix) && (tool_envs[i.substring(env_perfix.length - 1)] = context[i]));

    const messages = params.messages.at(-1) as CoreMessage;
    let tool = typeof messages.content === 'string'
        ? vaildTools(context.USE_TOOLS, tool_envs)
        : undefined;
    const toolModel = await createLlmModel(context.TOOL_MODEL, context);

    if (tool && tool.activeTools.length === 0) {
        tool = undefined;
    }

    if (params.messages[0].role === 'system') {
        params.messages[0].content += (tool?.tools_prompt || '');
    }
    let activeTools = tool?.activeTools;
    // if vertex use search grounding, do not use other tools
    if (params.model.provider === 'vertex' && context.VERTEX_SEARCH_GROUNDING) {
        activeTools = undefined;
    }

    return {
        model: params.model,
        toolModel,
        messages: params.messages,
        tools: tool?.tools,
        activeTools,
        context,
    };
}

export async function createLlmModel(model: string, context: AgentUserConfig) {
    let [agent, model_id] = model.includes(':') ? model.trim().split(':') : [context.AI_PROVIDER, model];
    if (!model_id) {
        model_id = context[`${agent.toUpperCase()}_CHAT_MODEL`];
    }
    switch (agent) {
        case 'openai':
            return createOpenAI({
                baseURL: context.OPENAI_API_BASE,
                apiKey: context.OPENAI_API_KEY[Math.floor(Math.random() * context.OPENAI_API_KEY.length)],
            }).languageModel(model_id, undefined);
        case 'claude':
            return createAnthropic({
                baseURL: context.ANTHROPIC_API_BASE,
                apiKey: context.ANTHROPIC_API_KEY || undefined,
            }).languageModel(model_id, undefined);
        case 'google':
            return createGoogleGenerativeAI({
                baseURL: context.GOOGLE_API_BASE,
                apiKey: context.GOOGLE_API_KEY || undefined,
            }).languageModel(model_id, {
                safetySettings: [
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                ],
            });
        case 'cohere':
            return createCohere({
                baseURL: context.COHERE_API_BASE,
                apiKey: context.COHERE_API_KEY || undefined,
            }).languageModel(model_id, undefined);
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
            }).languageModel(model_id, {
                safetySettings: [
                    { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_NONE' },
                ],
                useSearchGrounding: context.VERTEX_SEARCH_GROUNDING,
            });
        default:
            throw new Error(`Unsupported agent: ${agent}`);
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
    //         } as LanguageModelV1;
    //         return modelInstance;
    //     }
    //     return (await registryFactory(context)).languageModel(model);
    // }
}

// async function registryFactory(context: AgentUserConfig) {
//     const providers = {
//         openai: createOpenAI({
//             baseURL: context.OPENAI_API_BASE,
//             apiKey: context.OPENAI_API_KEY[Math.floor(Math.random() * context.OPENAI_API_KEY.length)],
//         }),
//         claude: createAnthropic({
//             baseURL: context.ANTHROPIC_API_BASE,
//             apiKey: context.ANTHROPIC_API_KEY || undefined,
//         }),
//         google: createGoogleGenerativeAI({
//             baseURL: context.GOOGLE_API_BASE,
//             apiKey: context.GOOGLE_API_KEY || undefined,
//         }),
//         cohere: createCohere({
//             baseURL: context.COHERE_API_BASE,
//             apiKey: context.COHERE_API_KEY || undefined,
//         }),
//         azure: createAzure({
//             baseURL: context.AZURE_OPENAI_API_BASE,
//             apiKey: context.AZURE_OPENAI_API_KEY || undefined,
//         }),
//         xai: createOpenAI({
//             baseURL: context.XAI_API_BASE,
//             apiKey: context.XAI_API_KEY || undefined,
//         }),
//         silicon: createOpenAI({
//             baseURL: context.SILICON_API_BASE,
//             apiKey: context.SILICON_API_KEY || undefined,
//         }),
//     } as Record<string, Provider>;
//     if (!isCfWorker) {
//         const { createVertex } = await import('@ai-sdk/google-vertex');
//         providers.vertex = createVertex({
//             project: context.VERTEX_PROJECT_ID!,
//             location: context.VERTEX_LOCATION,
//             googleAuthOptions: {
//                 credentials: context.VERTEX_CREDENTIALS,
//             },
//         });
//     }
//     return createProviderRegistry(providers);
// }
