import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, ResponseMessage } from './types';
import { createLlmModel, warpLLMParams } from '.';
import { requestChatCompletionsV2 } from './request';

export class Vertex implements ChatAgent {
    readonly name = 'vertex';
    readonly modelKey = 'VERTEX_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return !!(context.VERTEX_PROJECT_ID && context.VERTEX_CREDENTIALS?.client_email && context.VERTEX_CREDENTIALS?.private_key);
    };

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.VERTEX_CHAT_MODEL;
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ResponseMessage[]> => {
        // const provider = createVertex({
        //     project: context.VERTEX_PROJECT_ID!,
        //     location: context.VERTEX_LOCATION,
        //     googleAuthOptions: {
        //         credentials: context.VERTEX_CREDENTIALS,
        //     },
        // });
        // const languageModelV1 = provider.languageModel(
        //     this.model(context),
        //     {
        //         safetySettings: [
        //             { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_NONE' },
        //         ],
        //         // useSearchGrounding: true,
        //     },
        // );
        const languageModelV1 = await createLlmModel(this.model(context), context);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}
