import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, ImageAgent, ImageResult, LLMChatParams, ResponseMessage } from './types';
import { createOpenAI } from '@ai-sdk/openai';
import { Log } from '../extra/log/logDecortor';
import { requestText2Image } from './chat';
import { requestChatCompletionsV2 } from './request';

class OpenAILikeBase {
    readonly name = 'openaiLike';

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

    @Log
    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ResponseMessage[]> => {
        const provider = createOpenAI({
            name: 'openaiLike',
            baseURL: context.OPENAILIKE_API_BASE,
            apiKey: context.OPENAILIKE_API_KEY,
        });
        const languageModelV1 = provider.languageModel(this.model(context), undefined);
        return requestChatCompletionsV2({
            model: languageModelV1,
            messages: params.messages,
            context,
        }, onStream);
    };
}

export class SiliconImage extends OpenAILikeBase implements ImageAgent {
    readonly modelKey = 'SILICON_IMAGE_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.SILICON_IMAGE_MODEL;
    };

    request = async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const url = `${context.SILICON_API_BASE}/image/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.SILICON_API_KEY}`,
        };
        const body: any = {
            prompt,
            image_size: context.SILICON_IMAGE_SIZE,
            model: context.SILICON_IMAGE_MODEL,
            // num_inference_steps: 10,
            batch_size: 4,
            ...context.SILICON_EXTRA_PARAMS,
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
