import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, ResponseMessage } from './types';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { warpLLMParams } from '.';
import { requestChatCompletionsV2 } from './request';
import { log } from '../extra/log/logger';

export class Google implements ChatAgent {
    readonly name: string = 'google';
    readonly modelKey = 'GOOGLE_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.GOOGLE_API_KEY);
    };

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.GOOGLE_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const provider = createGoogleGenerativeAI({
            baseURL: context.GOOGLE_API_BASE,
            apiKey: context.GOOGLE_API_KEY || undefined,
            fetch: async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
                return fetch(url, options);
            },
        });
        const languageModelV1 = provider.languageModel(this.model(context), undefined);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}
