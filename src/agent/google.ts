import type { CoreUserMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { warpLLMParams } from '.';
import { requestChatCompletionsV2 } from './request';

export class Google implements ChatAgent {
    readonly name: string = 'google';
    readonly modelKey = 'GOOGLE_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.GOOGLE_API_KEY);
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        const msgType = Array.isArray(params?.content) ? params.content.at(-1)?.type : 'text';
        switch (msgType) {
            case 'image':
                return ctx.GOOGLE_VISION_MODEL;
            case 'file':
            default:
                return ctx.GOOGLE_CHAT_MODEL;
        }
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const provider = createGoogleGenerativeAI({
            baseURL: context.GOOGLE_API_BASE,
            apiKey: context.GOOGLE_API_KEY || undefined,
        });
        const userMessage = params.messages.at(-1) as CoreUserMessage;
        const languageModelV1 = provider.languageModel(this.model(context, userMessage), undefined);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}
