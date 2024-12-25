import type { CoreUserMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, GeneratedImage, GoogleVertexImageModelId, ImageAgent, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { createVertex } from '@ai-sdk/google-vertex';
import { experimental_generateImage as generateImage } from 'ai';
import { createLlmModel, warpLLMParams } from '.';
import { Log } from '../log/logDecortor';
import { requestChatCompletionsV2 } from './request';

class VertexBase {
    readonly name = 'vertex';
    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.VERTEX_PROJECT_ID && context.VERTEX_CREDENTIALS?.client_email && context.VERTEX_CREDENTIALS?.private_key);
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        const msgType = Array.isArray(params?.content) ? params.content.at(-1)?.type : 'text';
        switch (msgType) {
            case 'image':
                return ctx.VERTEX_VISION_MODEL;
            case 'file':
            default:
                return ctx.VERTEX_CHAT_MODEL;
        }
    };
}

export class Vertex extends VertexBase implements ChatAgent {
    readonly modelKey = 'VERTEX_CHAT_MODEL';

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const userMessage = params.messages.at(-1) as CoreUserMessage;
        const languageModelV1 = await createLlmModel(this.model(context, userMessage), context);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}

export class VertexImage extends VertexBase implements ImageAgent {
    readonly modelKey = 'VERTEX_IMAGE_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.VERTEX_IMAGE_MODEL;
    };

    @Log
    request = async (prompt: string, context: AgentUserConfig, extraParams?: Record<string, any>): Promise<ImageResult> => {
        const { n = 1, radio: aspectRatio = '16:9' } = extraParams || {};
        const { images } = await generateImage({
            model: createVertex({
                project: context.VERTEX_PROJECT_ID!,
                location: context.VERTEX_LOCATION,
                googleAuthOptions: {
                    credentials: context.VERTEX_CREDENTIALS,
                },
            }).image(this.model(context) as GoogleVertexImageModelId),
            prompt,
            n,
            providerOptions: {
                vertex: {
                    aspectRatio,
                    // personGeneration: 'allow_adult',
                    safetyFilterLevel: 'none',
                },
            },
            maxRetries: 0,
        });
        return this.render(images, prompt);
    };

    readonly render = async (result: Response | GeneratedImage[] | string[], prompt: string): Promise<ImageResult> => {
        const images = result as GeneratedImage[];
        if (images.length === 0) {
            throw new Error(`Data is invalid: ${JSON.stringify(images)}`);
        }
        return {
            type: 'image',
            raw: images.map(({ uint8Array }) => new Blob([uint8Array], { type: 'image/png' })),
            text: prompt,
        };
    };
}
