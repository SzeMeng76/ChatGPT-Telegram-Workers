import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { createXai } from '@ai-sdk/xai';
import { warpLLMParams } from '.';
import { requestChatCompletionsV2 } from './request';
import { CoreUserMessage } from 'ai';

export class XAI implements ChatAgent {
    readonly name = 'xai';
    readonly modelKey = 'XAI_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.XAI_API_KEY);
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatRequestParams): string => {
        return Array.isArray(params?.content) ? ctx.XAI_VISION_MODEL : ctx.XAI_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const provider = createXai({
            baseURL: context.XAI_API_BASE,
            apiKey: context.XAI_API_KEY || undefined,
        });
        const userMessage = params.messages.at(-1) as CoreUserMessage;
        const languageModelV1 = provider.languageModel(this.model(context, userMessage), undefined);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}
