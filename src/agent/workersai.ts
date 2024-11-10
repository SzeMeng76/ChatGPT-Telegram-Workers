import type { AgentUserConfig } from '../config/env';
import type { SseChatCompatibleOptions } from './request';
import type { ChatAgent, ChatStreamTextHandler, ImageAgent, ImageResult, LLMChatParams, ResponseMessage } from './types';
import { Log } from '../extra/log/logDecortor';
import { isJsonResponse, requestChatCompletions } from './request';

class WorkerBase {
    readonly name = 'workers';
    readonly run = async (model: string, body: any, id: string, token: string): Promise<Response> => {
        return await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/${model}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                method: 'POST',
                body: JSON.stringify(body),
            },
        );
    };

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.CLOUDFLARE_ACCOUNT_ID && context.CLOUDFLARE_TOKEN);
    };
}

export class WorkersChat extends WorkerBase implements ChatAgent {
    readonly modelKey = 'WORKERS_CHAT_MODEL';

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.WORKERS_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const { messages, prompt } = params;
        const id = context.CLOUDFLARE_ACCOUNT_ID;
        const token = context.CLOUDFLARE_TOKEN;
        const model = context.WORKERS_CHAT_MODEL;
        const url = `https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/${model}`;
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const reqMessages = messages.map((raw) => {
            return {
                role: raw.role,
                content: raw.content,
            };
        });
        if (prompt) {
            reqMessages.unshift({ role: 'system', content: prompt });
        }

        const body = {
            messages: reqMessages,
            stream: onStream !== null,
        };

        const options: SseChatCompatibleOptions = {};
        options.contentExtractor = function (data: any) {
            return data?.response;
        };
        options.fullContentExtractor = function (data: any) {
            return data?.result?.response;
        };
        options.errorExtractor = function (data: any) {
            return data?.errors?.[0]?.message;
        };
        const text = await requestChatCompletions(url, header, body, onStream, null, options);
        return {
            messages: [
                {
                    role: 'assistant',
                    content: text,
                },
            ],
            content: text,
        };
    };
}

export class WorkersImage extends WorkerBase implements ImageAgent {
    readonly modelKey = 'WORKERS_IMAGE_MODEL';

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.WORKERS_IMAGE_MODEL;
    };

    @Log
    readonly request = async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const id = context.CLOUDFLARE_ACCOUNT_ID;
        const token = context.CLOUDFLARE_TOKEN;
        if (!id || !token) {
            throw new Error('Cloudflare account ID or token is not set');
        }
        const raw = await this.run(context.WORKERS_IMAGE_MODEL, { prompt }, id, token);
        if (isJsonResponse(raw)) {
            const { result } = await raw.json();
            const image = result?.image;
            if (typeof image !== 'string') {
                throw new TypeError('Invalid image response');
            }
            return { type: 'image', raw: [await base64StringToBlob(image)] };
        }
        return { type: 'image', raw: [await raw.blob()] };
    };
}

async function base64StringToBlob(base64String: string): Promise<Blob> {
    try {
        const { Buffer } = await import('node:buffer');
        const buffer = Buffer.from(base64String, 'base64');
        return new Blob([buffer], { type: 'image/png' });
    } catch {
        const uint8Array = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
        return new Blob([uint8Array], { type: 'image/png' });
    }
}
