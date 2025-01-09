import type { CoreUserMessage, FilePart, ImagePart, UserContent } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ChatAgent, ChatStreamTextHandler, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { createLlmModel, warpLLMParams } from '.';
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
        const userMessage = handleUrl(params.messages.at(-1) as CoreUserMessage);
        const languageModelV1 = await createLlmModel(this.model(context, userMessage), context);
        return requestChatCompletionsV2(await warpLLMParams({
            model: languageModelV1,
            messages: params.messages,
        }, context), onStream);
    };
}

export function handleUrl(messages: CoreUserMessage): CoreUserMessage {
    if (typeof messages.content === 'string') {
        const { data = [], text } = extractUrls(messages.content);
        if (data.length > 0) {
            const newMessage: UserContent = [];
            newMessage.push({
                type: 'text',
                text,
            });
            data.forEach(i => newMessage.push({
                type: i.type as 'image' | 'file',
                [i.type === 'image' ? 'url' : 'data']: i.url,
                mimeType: i.mimeType,
            } as unknown as FilePart | ImagePart));
            messages.content = newMessage;
        }
    }
    return messages;
}

function extractUrls(str: string): { data?: { type: string; url: string; mimeType: string }[]; text: string } {
    const supportTypes = {
        pdf: 'application/pdf',
        mp3: 'audio/mpeg',
        aac: 'audio/aac',
        flac: 'audio/flac',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        mp4: 'video/mp4',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        js: 'text/javascript',
        py: 'text/x-python',
        css: 'text/css',
        xml: 'application/xml',
        csv: 'text/csv',
        rtf: 'text/rtf',
        txt: 'text/plain',
        md: 'text/markdown',
    };
    const urlRegex = new RegExp(`https?://\\S+\\.(${Object.keys(supportTypes).join('|')})`, 'g');
    const matches = urlRegex.exec(str) || [];

    return {
        data: matches.map((i) => {
            const type = i[1] as keyof typeof supportTypes;
            return {
                mimeType: supportTypes[type],
                url: i,
                type: supportTypes[type]?.startsWith('image') ? 'image' : 'file',
            };
        }),
        text: str.replace(urlRegex, '').trim(),
    };
}
