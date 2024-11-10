import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, ImageAgent, ImageResult, LLMChatParams, ResponseMessage } from './types';
import { createOpenAI } from '@ai-sdk/openai';
import { requestText2Image } from './chat';
import { requestChatCompletionsV2 } from './request';

class OpenAILikeBase {
    readonly name = 'olike';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!context.OPENAILIKE_API_KEY;
    };
}

export class OpenAILike extends OpenAILikeBase implements ChatAgent {
    readonly modelKey = 'OPENAILIKE_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!context.OPENAILIKE_API_KEY;
    };

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.OPENAILIKE_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const provider = createOpenAI({
            name: 'openaiLike',
            baseURL: context.OPENAILIKE_API_BASE || undefined,
            apiKey: context.OPENAILIKE_API_KEY || undefined,
        });
        const languageModelV1 = provider.languageModel(this.model(context), undefined);
        return requestChatCompletionsV2({
            model: languageModelV1,
            messages: params.messages,
            context,
        }, onStream);
    };
}

export class OpenAILikeImage extends OpenAILikeBase implements ImageAgent {
    readonly modelKey = 'OPENAILIKE_IMAGE_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.OPENAILIKE_IMAGE_MODEL;
    };

    request = async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const url = `${context.OPENAILIKE_API_BASE}/image/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.OPENAILIKE_API_KEY}`,
        };
        const body: any = {
            prompt,
            image_size: context.OPENAILIKE_IMAGE_SIZE,
            model: context.OPENAILIKE_IMAGE_MODEL,
            // num_inference_steps: 10,
            batch_size: 4,
            ...context.OPENAILIKE_EXTRA_PARAMS,
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
