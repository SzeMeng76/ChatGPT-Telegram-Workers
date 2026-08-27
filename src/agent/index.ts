import type { AgentUserConfig } from '../config/env';
import type { ASRAgent, ChatAgent, ImageAgent, TTSAgent } from './types';
import { ENV } from '../config/env';
import { getTools } from '../tools';
import { Anthropic } from './anthropic';
import { AzureChatAI, AzureImageAI } from './azure';
import { Cohere } from './cohere';
import { FishTTS } from './fish';
import { Google, GoogleASR, GoogleImage, GoogleTTS } from './google';
import { BlackForestLabsImage } from './blackforestlabs';
import { KlingAI } from './kling';
import { Mistral } from './mistralai';
import { Dalle, OpenAI, OpenAIASR, OpenAIFM, OpenAITTS } from './openai';
import { OpenAILike, OpenAILikeASR, OpenAILikeImage, OpenAILikeTTS } from './openailike';
import { Vertex, VertexImage } from './vertex';
import { WorkersChat, WorkersImage } from './workersai';
import { XAI, XAIImage } from './xai';

export const CHAT_AGENTS: ChatAgent[] = [
    new Anthropic(),
    new AzureChatAI(),
    new Cohere(),
    new Google(),
    new Mistral(),
    new OpenAI(),
    new WorkersChat(),
    new OpenAILike(),
    new Vertex(),
    new XAI(),
];

export function loadChatLLM(context: AgentUserConfig): ChatAgent {
    // let CHAT_AGENTS = CHAT_AGENTS_ITER();
    for (const llm of CHAT_AGENTS) {
        if (llm.name === context.AI_CHAT_PROVIDER) {
            if (!llm.enable(context)) {
                throw new Error(`Chat agent ${llm.name} api key is not set.`);
            }
            return llm;
        }
    }
    throw new Error(`Chat agent not found: ${context.AI_CHAT_PROVIDER}\nAvailable: ${CHAT_AGENTS.map(i => i.name).join(', ')}`);
}

export const IMAGE_AGENTS: ImageAgent[] = [
    new AzureImageAI(),
    new Dalle(),
    new WorkersImage(),
    new OpenAILikeImage(),
    new VertexImage(),
    new KlingAI(),
    new GoogleImage(),
    new XAIImage(),
    new BlackForestLabsImage(),
];

export function loadImageGen(context: AgentUserConfig): ImageAgent {
    for (const imgGen of IMAGE_AGENTS) {
        if (imgGen.name === context.AI_IMAGE_PROVIDER) {
            if (!imgGen.enable(context)) {
                throw new Error(`Image generator ${imgGen.name} api key is not set.`);
            }
            return imgGen;
        }
    }
    throw new Error(`Image generator not found: ${context.AI_IMAGE_PROVIDER}\nAvailable: ${IMAGE_AGENTS.map(i => i.name).join(', ')}`);
}

export const ASR_AGENTS: ASRAgent[] = [
    new OpenAIASR(),
    new OpenAILikeASR(),
    new GoogleASR(),
];

export function loadASRLLM(context: AgentUserConfig) {
    for (const llm of ASR_AGENTS) {
        if (llm.name === context.AI_ASR_PROVIDER) {
            if (!llm.enable(context)) {
                throw new Error(`ASR agent ${llm.name} api key is not set.`);
            }
            return llm;
        }
    }
    throw new Error(`ASR agent not found: ${context.AI_ASR_PROVIDER}\nAvailable: ${ASR_AGENTS.map(i => i.name).join(', ')}`);
}

export const TTS_AGENTS: TTSAgent[] = [
    new OpenAITTS(),
    new OpenAIFM(),
    new OpenAILikeTTS(),
    new GoogleTTS(),
    new FishTTS(),
];

export function loadTTSLLM(context: AgentUserConfig) {
    for (const llm of TTS_AGENTS) {
        if (llm.name === context.AI_TTS_PROVIDER) {
            if (!llm.enable(context)) {
                throw new Error(`TTS agent ${llm.name} api key is not set.`);
            }
            return llm;
        }
    }
    throw new Error(`TTS agent not found: ${context.AI_TTS_PROVIDER}\nAvailable: ${TTS_AGENTS.map(i => i.name).join(', ')}`);
}

/**
 * 提取模型等信息
 * @param {UserConfigType} config
 * @return {string} info
 */
export async function customInfo(config: AgentUserConfig): Promise<string> {
    const prompt = config.SYSTEM_INIT_MESSAGE || '';
    const tools = await getTools();
    const other_info = {
        mode: config.CURRENT_MODE,
        prompt: prompt.length > 50 ? `${prompt.slice(0, 50)}...` : prompt,
        USE_TOOLS: config.USE_TOOLS.join(','),
        SUPPORT_PLUGINS: Object.keys({ ...ENV.PLUGINS_FUNCTION, ...tools }).join('|'),
        CHAT_TRIGGER_PREFIX: ENV.CHAT_TRIGGER_PREFIX,
        MAX_STEPS: config.MAX_STEPS,
        MAX_RETRIES: config.MAX_RETRIES,
        SEND_IMAGE_AS_FILE: ENV.SEND_IMAGE_AS_FILE,
        SUPPORT_PROMPT_ROLE: Object.keys(config.PROMPT).join('|'),
        DISABLE_WEB_PREVIEW: ENV.DISABLE_WEB_PREVIEW,
        GOOGLE_SEARCH_GROUNDING: config.SEARCH_GROUNDING,
        TEXT_OUTPUT: config.TEXT_OUTPUT,
        TEXT_HANDLE_TYPE: config.TEXT_HANDLE_TYPE,
        AUDIO_OUTPUT: config.AUDIO_OUTPUT,
        AUDIO_HANDLE_TYPE: config.AUDIO_HANDLE_TYPE,
        AUDIO_TEXT_FORMAT: ENV.AUDIO_TEXT_FORMAT,
        ENABLE_ALIAS: config.ENABLE_ALIAS,
        PARAMS_MODIFIER: config.PARAMS_MODIFIER.join('|'),
        MESSAGE_REPLACER: Object.keys(config.MESSAGE_REPLACER).join('|'),
        USED_RELAY_TOOLS: config.USE_OAILIKE_RELAY_TOOLS.join(','),
    };
    return JSON.stringify(other_info, null, 2).split('\n').map(line => `\`${line}\``).join('\n');
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

export function blockAgent() {
    const agents = CHAT_AGENTS.filter(item => !ENV.BLOCK_AGENTS.includes(item.name));
    CHAT_AGENTS.length = 0;
    CHAT_AGENTS.push(...agents);
}
