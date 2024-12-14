import type { CoreUserMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ASRAgent, ChatAgent, ChatStreamTextHandler, ImageAgent, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { createOpenAI } from '@ai-sdk/openai';
import { Log } from '../log/logDecortor';
import { log } from '../log/logger';
import { requestText2Image } from './chat';
import { requestChatCompletionsV2 } from './request';

export class OpenAILikeBase {
    readonly name = 'oailike';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!context.OAILIKE_API_KEY;
    };
}

export class OpenAILike extends OpenAILikeBase implements ChatAgent {
    readonly modelKey = 'OAILIKE_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!context.OAILIKE_API_KEY;
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        const msgType = Array.isArray(params?.content) ? params.content.at(-1)?.type : 'text';
        switch (msgType) {
            case 'image':
                return ctx.OAILIKE_VISION_MODEL;
            case 'file':
            default:
                return ctx.OAILIKE_CHAT_MODEL;
        }
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const provider = createOpenAI({
            name: 'oailike',
            baseURL: context.OAILIKE_API_BASE || undefined,
            apiKey: context.OAILIKE_API_KEY || undefined,
        });
        const userMessage = params.messages.at(-1) as CoreUserMessage;
        const languageModelV1 = provider.languageModel(this.model(context, userMessage), undefined);
        return requestChatCompletionsV2({
            model: languageModelV1,
            messages: params.messages,
            context,
        }, onStream);
    };
}

export class OpenAILikeImage extends OpenAILikeBase implements ImageAgent {
    readonly modelKey = 'OAILIKE_IMAGE_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OAILIKE_IMAGE_MODEL;
    };

    request = async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const url = `${context.OAILIKE_API_BASE}/image/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.OAILIKE_API_KEY}`,
        };
        const body: any = {
            prompt,
            image_size: context.OAILIKE_IMAGE_SIZE,
            model: context.OAILIKE_IMAGE_MODEL,
            // num_inference_steps: 10,
            batch_size: 4,
            ...context.OAILIKE_EXTRA_PARAMS,
        };
        return requestText2Image(url, header, body, this.render);
    };

    render = async (response: Response): Promise<ImageResult> => {
        if (response.status !== 200)
            return { type: 'image', message: await response.text() };
        const resp = await response.json();
        if (resp.message) {
            return { type: 'image', message: resp.message };
        }
        return { type: 'image', url: (await resp?.images)?.map((i: { url: any }) => i?.url) };
    };
}

export class OpenAILikeASR extends OpenAILikeBase implements ASRAgent {
    readonly modelKey = 'OAILIKE_STT_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OAILIKE_STT_MODEL;
    };

    @Log
    request = async (audio: Blob, context: AgentUserConfig): Promise<string> => {
        const url = `${context.OAILIKE_API_BASE}/audio/transcriptions`;
        const header = {
            Authorization: `Bearer ${context.OAILIKE_API_KEY}`,
            Accept: 'application/json',
        };
        const formData = new FormData();
        formData.append('file', audio, 'audio.mp3');
        formData.append('model', context.OAILIKE_STT_MODEL);
        if (context.OAILIKE_STT_EXTRA_PARAMS) {
            Object.entries(context.OAILIKE_STT_EXTRA_PARAMS as string).forEach(([k, v]) => {
                formData.append(k, v);
            });
        }
        formData.append('response_format', 'json');
        const resp = await fetch(url, {
            method: 'POST',
            headers: header,
            body: formData,
            redirect: 'follow',
        }).then(r => r.json());

        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        if (resp.text === undefined) {
            console.error(JSON.stringify(resp));
            throw new Error(JSON.stringify(resp));
        }
        log.info(`Transcription: ${resp.text}`);
        return resp.text;
    };
}

export class OpenAILikeTTS extends OpenAILikeBase {
    readonly modelKey = 'OAILIKE_TTS_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OAILIKE_TTS_MODEL;
    };

    readonly request = async (text: string, context: AgentUserConfig): Promise<Blob> => {
        const url = `${context.OAILIKE_API_BASE}/audio/speech`;
        const headers = {
            'Authorization': `Bearer ${context.OAILIKE_API_KEY}`,
            'Content-Type': 'application/json',
        };
        const resp = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: context.OAILIKE_TTS_MODEL,
                input: text,
                voice: context.OAILIKE_TTS_VOICE,
                response_format: 'opus',
                speed: 1,
                stream: false,
            }),
        });
        if (resp.ok) {
            return resp.blob();
        } else {
            throw new Error(`${resp.status} ${resp.statusText}\n\n${await resp.text()}`);
        }
    };
}
