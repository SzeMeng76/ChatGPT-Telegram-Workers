import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, ResponseMessage } from './types';
import { createMistral } from '@ai-sdk/mistral';
import { warpLLMParams } from '.';
import { Log } from '../extra/log/logDecortor';
import { requestChatCompletionsV2 } from './request';

export class Mistral implements ChatAgent {
    readonly name = 'mistral';
    readonly modelKey = 'MISTRAL_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.MISTRAL_API_KEY);
    };

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.MISTRAL_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ResponseMessage[]> => {
        const provider = createMistral({
            baseURL: context.MISTRAL_API_BASE,
            apiKey: context.MISTRAL_API_KEY || undefined,
        });
        const languageModelV1 = provider.languageModel(this.model(context), undefined);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}
