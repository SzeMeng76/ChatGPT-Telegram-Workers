import type { CoreUserMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ASRAgent, ChatAgent, ChatStreamTextHandler, ImageAgent, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage, TTSAgent } from './types';
import { createOpenAI } from '@ai-sdk/openai';
import { warpLLMParams } from '.';
import { Log } from '../log/logDecortor';
import { log } from '../log/logger';
import { requestText2Image } from './chat';
import { requestChatCompletionsV2 } from './request';

export class OpenAIBase {
    readonly name = 'openai';
    readonly enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    apikey = (context: AgentUserConfig): string => {
        const length = context.OPENAI_API_KEY.length;
        return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
    };
}

export class OpenAI extends OpenAIBase implements ChatAgent {
    readonly modelKey = 'OPENAI_CHAT_MODEL';
    static readonly transformModelPerfix = 'TRANSFROM-';

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        const msgType = Array.isArray(params?.content) ? params.content.at(-1)?.type : 'text';
        switch (msgType) {
            case 'image':
                return ctx.OPENAI_VISION_MODEL;
            case 'file':
                return 'gpt-4o-audio-preview';
            default:
                return ctx.OPENAI_CHAT_MODEL;
        }
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const userMessage = params.messages.at(-1) as CoreUserMessage;
        const originalModel = this.model(context, userMessage);
        const provider = createOpenAI({
            baseURL: context.OPENAI_API_BASE,
            apiKey: this.apikey(context),
            compatibility: 'strict',
            fetch: this.fetch(context),
        });

        const languageModelV1 = provider.languageModel(originalModel, undefined);
        const newOnStream = this.streamHandle(originalModel, context, onStream);

        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), newOnStream);
    };

    readonly streamHandle = (model: string, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): any => {
        if (Object.keys(context.DROPS_OPENAI_PARAMS).length > 0) {
            for (const [model_perfix, params] of Object.entries(context.DROPS_OPENAI_PARAMS)) {
                if (model_perfix.split(',').some(p => model.startsWith(p))) {
                    params.includes('stream') && (onStream = null);
                    break;
                }
            }
        }
        return onStream;
    };

    readonly paramsHandle = (model: string, body: any, context: AgentUserConfig): any => {
        if (Object.keys(context.DROPS_OPENAI_PARAMS).length > 0) {
            for (const [model_perfix, params] of Object.entries(context.DROPS_OPENAI_PARAMS)) {
                if (model_perfix.split(',').some(p => model.startsWith(p))) {
                    params.split(',').forEach(p => delete body[p]);
                    break;
                }
            }
        }
        // cover message role
        if (context.COVER_MESSAGE_ROLE) {
            for (const [models, roles] of Object.entries(context.COVER_MESSAGE_ROLE)) {
                const [oldRole, newRole] = roles.split(':');
                if (models.split(',').some(p => model.startsWith(p))) {
                    body.messages = body.messages.map((m: any) => {
                        m.role = m.role === oldRole ? newRole : m.role;
                        return m;
                    });
                }
            }
        }
    };

    readonly fetch = (context: AgentUserConfig) =>
        async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
            const body = JSON.parse(options?.body as string);
            // if (body?.model.startsWith(OpenAI.transformModelPerfix)) {
            //     body.model = body.model.slice(OpenAI.transformModelPerfix.length);
            // }
            // if (body.model === 'gpt-4o-audio-preview') {
            //     body.modalities = ['text', 'audio'];
            //     body.audio = { voice: 'alloy', format: 'opus' };
            // }
            this.paramsHandle(body.model, body, context);
            return fetch(url, {
                ...options,
                body: JSON.stringify(body),
            });
        };
}

export class Dalle extends OpenAIBase implements ImageAgent {
    readonly modelKey = 'DALL_E_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.DALL_E_MODEL;
    };

    @Log
    request = async (prompt: string, context: AgentUserConfig, extraParams?: Record<string, any>): Promise<ImageResult> => {
        const url = `${context.OPENAI_API_BASE}/images/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apikey(context)}`,
        };
        const body: any = {
            prompt,
            n: 1,
            size: extraParams?.size || context.DALL_E_IMAGE_SIZE,
            model: extraParams?.model || context.DALL_E_MODEL,
        };
        if (body.model === 'dall-e-3') {
            body.quality = extraParams?.quality || context.DALL_E_IMAGE_QUALITY;
            body.style = extraParams?.style || context.DALL_E_IMAGE_STYLE;
        }
        return requestText2Image(url, header, body, this.render);
    };

    render = async (response: Response): Promise<ImageResult> => {
        const resp = await response.json();
        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        if (!Array.isArray(resp.data) || resp.data.length === 0) {
            throw new Error(`Data is invalid: ${JSON.stringify(resp)}`);
        }
        return {
            type: 'image',
            url: resp.data?.map((i: { url: any }) => i?.url),
            text: resp.data?.[0]?.revised_prompt || '',
        };
    };
}

export class OpenAIASR extends OpenAIBase implements ASRAgent {
    readonly modelKey = 'OPENAI_STT_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OPENAI_STT_MODEL;
    };

    @Log
    request = async (audio: Blob, context: AgentUserConfig): Promise<string> => {
        const url = `${context.OPENAI_API_BASE}/audio/transcriptions`;
        const header = {
            Authorization: `Bearer ${this.apikey(context)}`,
            Accept: 'application/json',
        };
        const formData = new FormData();
        formData.append('file', audio, 'audio.ogg');
        formData.append('model', context.OPENAI_STT_MODEL);
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

        if (!resp.text) {
            console.error(resp);
            throw new Error(JSON.stringify(resp));
        }
        log.info(`Transcription: ${resp.text}`);
        return resp.text;
    };
}

export class OpenAITTS extends OpenAIBase implements TTSAgent {
    readonly modelKey = 'OPENAI_TTS_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OPENAI_TTS_MODEL;
    };

    request = (text: string, context: AgentUserConfig): Promise<Blob> => {
        const url = `${context.OPENAI_API_BASE}/audio/speech`;
        const headers = {
            'Authorization': `Bearer ${this.apikey(context)}`,
            'Content-Type': 'application/json',
        };
        return fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: context.OPENAI_TTS_MODEL,
                input: text,
                voice: context.OPENAI_TTS_VOICE,
                response_format: 'opus',
                speed: 1,
            }),
        }).then(r => r.blob());
    };
}
