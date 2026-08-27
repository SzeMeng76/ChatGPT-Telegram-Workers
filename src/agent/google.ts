import type { FilePart, ImagePart, UserContent, UserModelMessage } from 'ai';
import type { AgentUserConfig } from '../config/env';
import type { ASRAgent, ChatAgent, ChatStreamTextHandler, GeneratedImage, ImageAgent, ImageResult, LLMChatParams, LLMChatRequestParams, ResponseMessage } from './types';
import { getLogSingleton, log, withLogger } from '../log';
import { base64StringToBlob } from '../utils/image';
import { convertAudio } from '../utils/others/audio';
import { applyVerdict, classifyApiError, markKeySuccess, selectKey } from './key-manager';
import { createLlmModel } from './llm';
import { warpLLMParams } from './model_middleware';
import { requestChatCompletionsV2 } from './request';

class GoogleBase {
    readonly name = 'google';
    readonly enable = (context: AgentUserConfig): boolean => {
        return context.GOOGLE_API_KEY.length > 0;
    };

    readonly apikey = (context: AgentUserConfig): string => {
        return selectKey('google', context.GOOGLE_API_KEY) || '';
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
}

export class Google extends GoogleBase implements ChatAgent {
    readonly modelKey = 'GOOGLE_CHAT_MODEL';

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<{ messages: ResponseMessage[]; content: string }> => {
        const userMessage = handleUrl(params.messages.at(-1) as UserModelMessage);
        const model = await createLlmModel(this.model(context, userMessage), context);
        return requestChatCompletionsV2(await warpLLMParams({
            model,
            messages: params.messages,
            cache: params.cache,
        }, context), onStream);
    };
}

/**
 * Get minimum thinking level for Gemini 3 models based on version
 * Gemini Flash 3.7+ requires 'low' as minimum, earlier versions support 'minimal'
 */
function getMinimumThinkingLevelForGemini3Model(modelId: string): 'minimal' | 'low' {
    const modelName = modelId.split('/').at(-1)?.toLowerCase();

    if (modelName === 'gemini-flash-latest') {
        return 'low';
    }

    // Match gemini-X.Y-flash (but not flash-lite)
    // Regex: ^gemini-(\d+)\.(\d+)-flash(?:$|-(?!lite(?:-|$)))
    const versionMatch = /^gemini-(\d+)\.(\d+)-flash(?:$|-(?!lite(?:-|$)))/.exec(modelName ?? '');

    if (versionMatch == null) {
        return 'minimal';
    }

    const majorVersion = Number(versionMatch[1]);
    const minorVersion = Number(versionMatch[2]);

    return majorVersion > 3 || (majorVersion === 3 && minorVersion >= 7) ? 'low' : 'minimal';
}

export class GoogleImage extends GoogleBase implements ImageAgent {
    readonly modelKey = 'GOOGLE_IMAGE_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.GOOGLE_IMAGE_MODEL;
    };

    request = withLogger(async (prompt: string, context: AgentUserConfig, extraParams?: Record<string, any>): Promise<ImageResult> => {
        if (prompt.trim() === '') {
            throw new Error('Please provide a prompt.');
        }

        const { referenceImages } = extraParams || {};
        const apiKey = this.apikey(context);
        const modelId = this.model(context);
        const url = `${context.GOOGLE_API_BASE}/models/${modelId}:generateContent?key=${apiKey}`;

        // Build generation config with Gemini 3 image model support
        const generationConfig: any = {
            responseModalities: ['TEXT', 'IMAGE'],
        };

        // Add responseFormat.image for aspect ratio and resolution (Gemini 3 image models)
        if (context.GOOGLE_IMAGE_ASPECT_RATIO || context.GOOGLE_IMAGE_SIZE) {
            generationConfig.responseFormat = { image: {} };
            if (context.GOOGLE_IMAGE_ASPECT_RATIO) {
                generationConfig.responseFormat.image.aspectRatio = context.GOOGLE_IMAGE_ASPECT_RATIO;
            }
            if (context.GOOGLE_IMAGE_SIZE) {
                generationConfig.responseFormat.image.imageSize = context.GOOGLE_IMAGE_SIZE;
            }
        }

        // Thinking level for Gemini 3 image models
        // Flash 3.7+ requires minimum 'low', earlier versions support 'minimal'
        if (context.GOOGLE_IMAGE_THINKING_LEVEL) {
            const minimumLevel = getMinimumThinkingLevelForGemini3Model(modelId);
            const requestedLevel = context.GOOGLE_IMAGE_THINKING_LEVEL;

            // Validate and adjust thinking level for Flash 3.7+ models
            if (minimumLevel === 'low' && requestedLevel === 'minimal') {
                // Flash 3.7+ doesn't support 'minimal', auto-upgrade to 'low'
                generationConfig.thinkingConfig = { thinkingLevel: 'low' };
            } else {
                generationConfig.thinkingConfig = { thinkingLevel: requestedLevel };
            }
        }

        const body = {
            contents: [{
                parts: [{
                    text: prompt,
                }],
            }],
            generationConfig,
            safetySettings: [
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
            ],
        } as any;

        // Add Google Search grounding tool for Gemini 3 image models
        if (context.GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH) {
            // Build Google Search configuration
            const searchConfig: any = {};

            // Configure search types (web and/or image search)
            const searchTypes: any = {};
            if (context.GOOGLE_SEARCH_ENABLE_WEB_SEARCH) {
                searchTypes.webSearch = {};
            }
            if (context.GOOGLE_SEARCH_ENABLE_IMAGE_SEARCH) {
                searchTypes.imageSearch = {};
            }
            if (Object.keys(searchTypes).length > 0) {
                searchConfig.searchTypes = searchTypes;
            }

            // Configure time range filter if provided
            if (context.GOOGLE_SEARCH_TIME_RANGE_FILTER.startTime && context.GOOGLE_SEARCH_TIME_RANGE_FILTER.endTime) {
                searchConfig.timeRangeFilter = {
                    startTime: context.GOOGLE_SEARCH_TIME_RANGE_FILTER.startTime,
                    endTime: context.GOOGLE_SEARCH_TIME_RANGE_FILTER.endTime,
                };
            }

            body.tools = [{ google_search: Object.keys(searchConfig).length > 0 ? searchConfig : {} }];
        }

        if (referenceImages && referenceImages.length > 0) {
            const isUri = typeof referenceImages[0] === 'string' && referenceImages[0].startsWith('http');
            const type = isUri ? 'fileUri' : 'data';
            const dataType = isUri ? 'fileData' : 'inlineData';
            body.contents[0].parts.push(...referenceImages.map((i: any) => ({
                [dataType]: {
                    mimeType: 'image/jpeg',
                    [type]: i,
                },
            })));
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const resp = await response.text();
            applyVerdict('google', apiKey, classifyApiError({
                statusCode: response.status,
                responseBody: resp,
                provider: 'google',
            }));
            throw new Error(`${response.status} ${response.statusText}\n${resp}`);
        }
        const result = await response.json();
        markKeySuccess('google', apiKey);
        const data = result.candidates?.[0]?.content?.parts || [];
        if (data.length === 0) {
            throw new Error(`Data is null:\n${JSON.stringify(result)}`);
        }
        // Exclude interim "thought" images generated during the model's thinking process
        const images = data.filter((i: any) => i.inlineData !== undefined && !i.thought);
        const text = data.map((i: any) => i.text || '').join('');
        if (images.length === 0) {
            throw new Error(`No images found:\n${text || JSON.stringify(data)}`);
        }

        const usage = result.usageMetadata;
        if (usage) {
            const log = getLogSingleton({ config: context, init: false });
            log.model = result.modelVersion || this.model(context);
            log.tokens = {
                prompt: usage.promptTokenCount,
                completion: usage.candidatesTokenCount,
            };
        }
        return this.render(images, text);
    });

    readonly render = async (result: Response | GeneratedImage[] | any[], prompt: string): Promise<ImageResult> => {
        const images = result as { inlineData: { mimeType: string; data: string } }[];
        return {
            raw: await Promise.all(images.map(({ inlineData: { data } }) => base64StringToBlob(data))),
            text: prompt,
        };
    };
}

export class GoogleTTS extends GoogleBase {
    readonly modelKey = 'GOOGLE_TTS_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.GOOGLE_TTS_MODEL;
    };

    readonly request = async (text: string, context: AgentUserConfig): Promise<Blob> => {
        const apiKey = this.apikey(context);
        const url = `${context.GOOGLE_API_BASE}/models/${this.model(context)}:generateContent?key=${apiKey}`;
        const speech_config: { voice_config?: { prebuilt_voice_config: { voice_name: string } }; multi_speaker_voice_config?: Record<string, any> } = {
            voice_config: {
                prebuilt_voice_config: { voice_name: context.GOOGLE_TTS_VOICE },
            },
            ...context.GOOGLE_TTS_EXTRA_PARAMS,
        };
        if (speech_config.multi_speaker_voice_config) {
            delete speech_config.voice_config;
        }
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${context.GOOGLE_TTS_PROMPT}\n${text}`,
                    }],
                }],
                generation_config: {
                    response_modalities: ['audio'],
                    speech_config,
                },
            }),
        });
        if (resp.ok) {
            const result = await resp.json();
            markKeySuccess('google', apiKey);
            const { data, mimeType } = result.candidates?.[0]?.content?.parts?.[0]?.inlineData || {};
            if (!data || !mimeType) {
                throw new Error(`Data is not complete:\n${JSON.stringify(result)}`);
            }
            const command = mimeType.split(';').map((i: string) => {
                const [arg, value] = i.trim().split('=');
                switch (arg) {
                    // default little endian
                    case 'audio/L16':
                        return ['-f', 's16le'];
                    case 'audio/L24':
                        return ['-f', 's24le'];
                    case 'audio/L32':
                        return ['-f', 's32le'];
                    case 'rate':
                        return ['-ar', value];
                    case 'bitrate':
                        return ['-b:a', value];
                    case 'channels':
                        return ['-ac', value];
                    case 'codec':
                    default:
                        return [];
                }
            }).flat();
            const audio = await convertAudio({ file: new Blob([Buffer.from(data, 'base64')]), target: 'blob', inputType: 'raw', outputType: 'oga', command }) as Blob;
            return audio;
        } else {
            const errText = await resp.text();
            applyVerdict('google', apiKey, classifyApiError({
                statusCode: resp.status,
                responseBody: errText,
                provider: 'google',
            }));
            throw new Error(`${resp.status} ${resp.statusText}\n\n${errText}`);
        }
    };
}

export class GoogleASR extends GoogleBase implements ASRAgent {
    readonly modelKey = 'GOOGLE_STT_MODEL';

    model = (ctx: AgentUserConfig): string => {
        return ctx.GOOGLE_STT_MODEL;
    };

    // Unary transcription via the Interactions API: https://ai.google.dev/gemini-api/docs/transcribe
    request = withLogger(async (audio: Blob, context: AgentUserConfig): Promise<string> => {
        const apiKey = this.apikey(context);
        const url = `${context.GOOGLE_API_BASE}/interactions?key=${apiKey}`;
        const data = Buffer.from(await audio.arrayBuffer()).toString('base64');
        const body: any = {
            model: this.model(context),
            input: [{
                type: 'audio',
                data,
                mime_type: audio.type || 'audio/ogg',
            }],
        };
        if (context.GOOGLE_STT_EXTRA_PARAMS && Object.keys(context.GOOGLE_STT_EXTRA_PARAMS).length > 0) {
            body.generation_config = { transcription_config: context.GOOGLE_STT_EXTRA_PARAMS };
        }
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!resp.ok) {
            const errText = await resp.text();
            applyVerdict('google', apiKey, classifyApiError({
                statusCode: resp.status,
                responseBody: errText,
                provider: 'google',
            }));
            throw new Error(`${resp.status} ${resp.statusText}\n\n${errText}`);
        }
        const result = await resp.json();
        markKeySuccess('google', apiKey);
        const text = (result.steps || [])
            .flatMap((step: any) => step.content || [])
            .filter((content: any) => content.type === 'text' && content.text != null)
            .map((content: any) => content.text)
            .join('');
        if (!text) {
            log.error(JSON.stringify(result));
            throw new Error(`Data is not complete:\n${JSON.stringify(result)}`);
        }
        log.info(`Transcription: ${text}`);
        return text;
    });
}

export function handleUrl(messages: UserModelMessage): UserModelMessage {
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
                mediaType: i.mimeType,
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
    const urlRegex = new RegExp(`https?://\\S+\\.(${Object.keys(supportTypes).join('|')})$`, 'g');
    const matches = [...str.matchAll(urlRegex)];
    matches.push(...str.matchAll(/https?:\/\/(youtu\.be|www\.youtube\.com)\/.+/g));

    return {
        data: matches.map((i) => {
            const type = i[1] as keyof typeof supportTypes;
            return {
                mimeType: supportTypes[type] || 'video/webm',
                url: i[0],
                type: supportTypes[type]?.startsWith('image') ? 'image' : 'file',
            };
        }),
        text: str.replace(urlRegex, '').trim(),
    };
}
