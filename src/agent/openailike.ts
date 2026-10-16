import type { UserModelMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ASRAgent, ChatAgent, ChatStreamTextHandler, GeneratedImage, ImageAgent, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { log, withLogger } from '../log';
import { base64StringToBlob } from '../utils';
import { downloadImage } from '../utils/image/download';
import { requestText2Image } from './image';
import { selectKey } from './key-manager';
import { createLlmModel } from './llm';
import { warpLLMParams } from './model_middleware';
import { requestChatCompletionsV2 } from './request';

/**
 * 解析 OpenAI 兼容的图片响应。参考 vercel/ai openai-compatible 的 getImages:
 * - 全是 url:直接返回 URL,由 Telegram 拉取(行为不变,历史记录里仍保留图片链接)
 * - 含 b64_json(纯 base64 或混合):按原顺序统一转成 Blob,两个字段同时存在时 base64 优先,不再下载
 * - 两个字段都缺失:报错
 * trustedOrigin 必须来自开发者配置(OAILIKE_API_BASE),不能从响应里取,用于放行自建/本地部署的同源图片地址。
 */
export async function renderOpenAILikeImage(response: Response | GeneratedImage[] | string[], prompt: string, trustedOrigin?: string): Promise<ImageResult> {
    const resp = response as Response;
    if (!resp.ok)
        throw new Error(await resp.text());
    const respJson = await resp.json();
    if (respJson.error?.message) {
        throw new Error(respJson.error.message);
    }
    const items: { b64_json?: string | null; url?: string | null }[] = respJson.data ?? [];

    if (items.length > 0 && items.every(item => item.b64_json == null && item.url != null)) {
        return { url: items.map(item => item.url as string), text: prompt };
    }

    const signal = AbortSignal.timeout(60_000);
    const raw = await Promise.all(items.map(async ({ b64_json, url }) => {
        if (b64_json != null) {
            return base64StringToBlob(b64_json);
        }
        if (url == null) {
            throw new Error('Expected b64_json or url in the image response');
        }
        return downloadImage(url, { trustedOrigin, signal });
    }));
    return { raw, text: prompt };
}

export class OpenAILikeBase {
    readonly name = 'oailike';

    readonly enable = (context: AgentUserConfig): boolean => {
        return context.OAILIKE_API_KEY.length > 0;
    };

    readonly apikey = (context: AgentUserConfig): string => {
        return selectKey('oailike', context.OAILIKE_API_KEY) || '';
    };
}

export class OpenAILike extends OpenAILikeBase implements ChatAgent {
    readonly modelKey = 'OAILIKE_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return context.OAILIKE_API_KEY.length > 0;
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        const msgType = Array.isArray(params?.content) ? params.content.at(-1)?.type : 'text';
        return msgType === 'text' ? ctx.OAILIKE_CHAT_MODEL : ctx.OAILIKE_VISION_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const modelId = this.model(context, params.messages.at(-1) as UserModelMessage);
        const model = await createLlmModel(modelId, context);
        return requestChatCompletionsV2(await warpLLMParams({
            model,
            messages: params.messages,
            cache: params.cache,
        }, context), onStream);
    };
}

export class OpenAILikeImage extends OpenAILikeBase implements ImageAgent {
    readonly modelKey = 'OAILIKE_IMAGE_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OAILIKE_IMAGE_MODEL;
    };

    request = withLogger(async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const url = `${context.OAILIKE_API_BASE}/images/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apikey(context)}`,
        };
        const body: any = {
            prompt,
            image_size: context.OAILIKE_IMAGE_SIZE,
            model: context.OAILIKE_IMAGE_MODEL,
            // num_inference_steps: 10,
            batch_size: 4,
            ...context.OAILIKE_API_EXTRA_PARAMS,
        };
        return requestText2Image(url, header, body, (resp, prompt) => renderOpenAILikeImage(resp, prompt, context.OAILIKE_API_BASE));
    });

    readonly render = (response: Response | GeneratedImage[] | string[], prompt: string): Promise<ImageResult> => renderOpenAILikeImage(response, prompt);
}

export class OpenAILikeASR extends OpenAILikeBase implements ASRAgent {
    readonly modelKey = 'OAILIKE_STT_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OAILIKE_STT_MODEL;
    };

    request = withLogger(async (audio: Blob, context: AgentUserConfig): Promise<string> => {
        const url = `${context.OAILIKE_API_BASE}/audio/transcriptions`;
        const header = {
            Authorization: `Bearer ${this.apikey(context)}`,
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
    });
}

export class OpenAILikeTTS extends OpenAILikeBase {
    readonly modelKey = 'OAILIKE_TTS_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OAILIKE_TTS_MODEL;
    };

    readonly request = async (text: string, context: AgentUserConfig): Promise<Blob> => {
        const url = `${context.OAILIKE_API_BASE}/audio/speech`;
        const headers = {
            'Authorization': `Bearer ${this.apikey(context)}`,
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
                ...context.OAILIKE_TTS_EXTRA_PARAMS,
            }),
        });
        if (resp.ok) {
            return resp.blob();
        } else {
            throw new Error(`${resp.status} ${resp.statusText}\n\n${await resp.text()}`);
        }
    };
}
