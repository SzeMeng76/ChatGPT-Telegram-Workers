import type { CoreUserMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { UnionData } from '../telegram/utils/utils';
import type { AudioAgent, ChatAgent, ChatStreamTextHandler, ImageAgent, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { createOpenAI } from '@ai-sdk/openai';
import { warpLLMParams } from '.';
import { Log } from '../extra/log/logDecortor';
import { log } from '../extra/log/logger';
import { requestText2Image } from './chat';
import { requestChatCompletionsV2 } from './request';

class OpenAIBase {
    readonly name = 'openai';
    type = 'chat';
    apikey = (context: AgentUserConfig): string => {
        if (this.type === 'tool' && context.FUNCTION_CALL_API_KEY) {
            return context.FUNCTION_CALL_API_KEY;
        }
        const length = context.OPENAI_API_KEY.length;
        return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
    };
}

export class OpenAI extends OpenAIBase implements ChatAgent {
    readonly modelKey = 'OPENAI_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        return Array.isArray(params?.content) ? ctx.OPENAI_VISION_MODEL : ctx.OPENAI_CHAT_MODEL;
    };

    // 仅文本对话使用该地址
    readonly base_url = (context: AgentUserConfig): string => {
        if (this.type === 'tool' && context.FUNCTION_CALL_BASE) {
            return context.FUNCTION_CALL_BASE;
        }
        return context.OPENAI_API_BASE;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ResponseMessage[]> => {
        const provider = createOpenAI({
            baseURL: context.OPENAI_API_BASE,
            apiKey: this.apikey(context),
        });

        const userMessage = params.messages.at(-1) as CoreUserMessage;
        const languageModelV1 = provider.languageModel(this.model(context, userMessage), undefined);

        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            // prompt: params.prompt,
            messages: params.messages,
        }, context), onStream);
    };
}

export class Dalle extends OpenAIBase implements ImageAgent {
    readonly modelKey = 'DALL_E_MODEL';

    enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    model = (ctx: AgentUserConfig): string => {
        return ctx.DALL_E_MODEL;
    };

    @Log
    request = async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const url = `${context.OPENAI_API_BASE}/images/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apikey(context)}`,
        };
        const body: any = {
            prompt,
            n: 1,
            size: context.DALL_E_IMAGE_SIZE,
            model: context.DALL_E_MODEL,
        };
        if (body.model === 'dall-e-3') {
            body.quality = context.DALL_E_IMAGE_QUALITY;
            body.style = context.DALL_E_IMAGE_STYLE;
        }
        return requestText2Image(url, header, body, this.render);
    };

    render = async (response: Response): Promise<ImageResult> => {
        const resp = await response.json();
        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        return {
            type: 'image',
            url: resp?.data?.map((i: { url: any }) => i?.url),
            text: resp?.data?.[0]?.revised_prompt || '',
        };
    };
}

export class Transcription extends OpenAIBase implements AudioAgent {
    readonly modelKey = 'OPENAI_STT_MODEL';

    enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    model = (ctx: AgentUserConfig): string => {
        return ctx.OPENAI_STT_MODEL;
    };

    @Log
    request = async (audio: Blob, context: AgentUserConfig): Promise<UnionData> => {
        const url = `${context.OPENAI_API_BASE}/audio/transcriptions`;
        const header = {
            Authorization: `Bearer ${this.apikey(context)}`,
            Accept: 'application/json',
        };
        const formData = new FormData();
        formData.append('file', audio, 'audio.ogg');
        formData.append('model', this.model(context));
        if (context.OPENAI_STT_EXTRA_PARAMS) {
            Object.entries(context.OPENAI_STT_EXTRA_PARAMS as string).forEach(([k, v]) => {
                formData.append(k, v);
            });
        }
        formData.append('response_format', 'json');
        const resp = await fetch(url, {
            method: 'POST',
            headers: header,
            body: formData,
            redirect: 'follow',
        }).then(res => res.json());

        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        if (resp.text === undefined) {
            console.error(resp);
            throw new Error(resp);
        }
        log.info(`Transcription: ${resp.text}`);
        return {
            type: 'text',
            text: resp.text,
        };
    };
}
