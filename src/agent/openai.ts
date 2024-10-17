import type { AgentUserConfig } from '../config/env';
import type { UnionData } from '../telegram/utils/utils';
import type { AudioAgent, ChatAgent, ChatStreamTextHandler, CompletionData, HistoryItem, ImageAgent, ImageResult, LLMChatParams } from './types';
import { ENV } from '../config/env';
import { Log } from '../extra/log/logDecortor';
import { log } from '../extra/log/logger';
import { imageToBase64String, renderBase64DataURI } from '../utils/image';
import { requestText2Image } from './chat';
import { requestChatCompletions } from './request';

export async function renderOpenAIMessage(item: HistoryItem): Promise<any> {
    // 由于增加函数调用数据，故直接使用item 再移除images
    const res: any = {
        ...item,
    };
    delete res?.images;
    if (item.images && item.images.length > 0) {
        res.content = [];
        if (item.content) {
            res.content.push({ type: 'text', text: item.content });
        } else {
            // 兼容claude模型必须附带文字进行图像识别
            res.content.push({ type: 'text', text: '请帮我解读这张图片' });
        }
        for (const image of item.images) {
            switch (ENV.TELEGRAM_IMAGE_TRANSFER_MODE) {
                case 'base64':
                    res.content.push({
                        type: 'image_url',
                        image_url: {
                            url: renderBase64DataURI(await imageToBase64String(image)),
                        },
                    });
                    break;
                case 'url':
                default:
                    res.content.push({ type: 'image_url', image_url: { url: image } });
                    break;
            }
        }
    }
    return res;
}

class OpenAIBase {
    readonly name = 'openai';
    type = 'chat';
    apikey = (context: AgentUserConfig): string => {
        if (this.type === 'tool' && context.FUNCTION_CALL_API_KEY) {
            return context.FUNCTION_CALL_API_KEY;
        }
        const length = context.OPENAI_API_KEY.length;
        return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
    };
}

export class OpenAI extends OpenAIBase implements ChatAgent {
    readonly modelKey = 'OPENAI_CHAT_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    readonly model = (ctx: AgentUserConfig, params?: LLMChatParams): string => {
        if (this.type === 'tool' && ctx.FUNCTION_CALL_MODEL) {
            return ctx.FUNCTION_CALL_MODEL;
        }
        return params?.images ? ctx.OPENAI_VISION_MODEL : ctx.OPENAI_CHAT_MODEL;
    };

    constructor(type: string = 'chat') {
        super();
        this.type = type;
    }

    // 仅文本对话使用该地址
    readonly base_url = (context: AgentUserConfig): string => {
        if (this.type === 'tool' && context.FUNCTION_CALL_BASE) {
            return context.FUNCTION_CALL_BASE;
        }
        return context.OPENAI_API_BASE;
    };

    private render = async (item: HistoryItem): Promise<any> => {
        return renderOpenAIMessage(item);
    };

    @Log
    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<CompletionData> => {
        const { prompt, history, extra_params } = params;
        const url = `${this.base_url(context)}/chat/completions`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apikey(context)}`,
        };

        const messages = [...(history || [])];

        if (prompt) {
            // 第一条消息不能是tool
            for (const message of messages) {
                if (message?.role === 'tool') {
                    messages.shift();
                } else {
                    break;
                }
            }
        }

        const body: Record<string, any> = {
            model: this.model(context, params),
            ...context.OPENAI_API_EXTRA_PARAMS,
            messages: await Promise.all(messages.map(this.render)),
            stream: !!onStream,
            ...extra_params,
            ...(context.ENABLE_SHOWTOKEN && !!onStream && { stream_options: { include_usage: true } }),
        };
        delete body.agent;
        delete body.type;
        // 过滤掉不支持的参数
        if (Object.keys(ENV.DROPS_OPENAI_PARAMS).length > 0) {
            for (const [models, params] of Object.entries(ENV.DROPS_OPENAI_PARAMS)) {
                if (models.includes(body.model)) {
                    params.split(',').forEach(p => delete body[p]);
                    break;
                }
            }
            if (!body.stream && onStream) {
                body.stream = false;
                onStream = null;
            }
        }

        if (!this.model(context, params).includes('gpt') && !ENV.MODEL_COMPATIBLE_OPENAI) {
            // claude 和 gemini 不支持content为空
            body.messages = body.messages.filter((m: any) => !!m.content).map(
                (m: any) => {
                    if (m.role === 'tool') {
                        return {
                            role: 'user',
                            content: `${m.name} result:${m.content}`,
                        };
                    }
                    return m;
                },
            );
            delete body.tool_choice;
            delete body.tool_calls;
        }

        // console.log(JSON.stringify(messages, null, 2));
        return requestChatCompletions(url, header, body, onStream);
    };
}

export class Dalle extends OpenAIBase implements ImageAgent {
    readonly modelKey = 'DALL_E_MODEL';

    enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    model = (ctx: AgentUserConfig): string => {
        return ctx.DALL_E_MODEL;
    };

    @Log
    request = async (prompt: string, context: AgentUserConfig): Promise<ImageResult> => {
        const url = `${context.OPENAI_API_BASE}/images/generations`;
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apikey(context)}`,
        };
        const body: any = {
            prompt,
            n: 1,
            size: context.DALL_E_IMAGE_SIZE,
            model: context.DALL_E_MODEL,
        };
        if (body.model === 'dall-e-3') {
            body.quality = context.DALL_E_IMAGE_QUALITY;
            body.style = context.DALL_E_IMAGE_STYLE;
        }
        return requestText2Image(url, header, body, this.render);
    };

    render = async (response: Response): Promise<ImageResult> => {
        const resp = await response.json();
        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        return {
            type: 'image',
            url: resp?.data?.map((i: { url: any }) => i?.url),
            text: resp?.data?.[0]?.revised_prompt || '',
        };
    };
}

export class Transcription extends OpenAIBase implements AudioAgent {
    readonly modelKey = 'OPENAI_STT_MODEL';

    enable = (context: AgentUserConfig): boolean => {
        return context.OPENAI_API_KEY.length > 0;
    };

    model = (ctx: AgentUserConfig): string => {
        return ctx.OPENAI_STT_MODEL;
    };

    @Log
    request = async (audio: Blob, context: AgentUserConfig, file_name: string): Promise<UnionData> => {
        const url = `${context.OPENAI_API_BASE}/audio/transcriptions`;
        const header = {
            Authorization: `Bearer ${this.apikey(context)}`,
            Accept: 'application/json',
        };
        const formData = new FormData();
        formData.append('file', audio, file_name);
        formData.append('model', this.model(context));
        if (context.OPENAI_STT_EXTRA_PARAMS) {
            Object.entries(context.OPENAI_STT_EXTRA_PARAMS as string).forEach(([k, v]) => {
                formData.append(k, v);
            });
        }
        formData.append('response_format', 'json');
        const resp = await fetch(url, {
            method: 'POST',
            headers: header,
            body: formData,
            redirect: 'follow',
        }).then(res => res.json());

        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        if (resp.text === undefined) {
            console.error(resp);
            throw new Error(resp);
        }
        log.info(`Transcription: ${resp.text}`);
        return {
            type: 'text',
            text: resp.text,
        };
    };
}
