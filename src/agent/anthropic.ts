import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, ResponseMessage } from './types';
import { createAnthropic } from '@ai-sdk/anthropic';
import { warpLLMParams } from '.';
import { requestChatCompletionsV2 } from './request';

export class Anthropic implements ChatAgent {
    readonly name = 'anthropic';
    readonly modelKey = 'ANTHROPIC_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.ANTHROPIC_API_KEY);
    };

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.ANTHROPIC_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const provider = createAnthropic({
            baseURL: context.ANTHROPIC_API_BASE,
            apiKey: context.ANTHROPIC_API_KEY || undefined,
        });
        const languageModelV1 = provider.languageModel(this.model(context), undefined);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}
