import type { AgentUserConfig } from '../config/env';
import type { GeneratedImage, ImageAgent, ImageResult } from './types';
import { Log } from '../log/logDecortor';
import { log } from '../log/logger';
import { createTelegramBotAPI } from '../telegram/api';

export class KlingAI implements ImageAgent {
    readonly name = 'kling';
    readonly enable = (context: AgentUserConfig): boolean => {
        return context.KLINGAI_COOKIE.length > 0;
    };

    model = (_ctx: AgentUserConfig): string => {
        return 'kling';
    };

    @Log
    readonly request = async (prompt: string, context: AgentUserConfig, extraParams?: Record<string, any>): Promise<ImageResult> => {
        const { n, radio, inputs = [], args, type } = extraParams || {};
        const COOKIES = context.KLINGAI_COOKIE;
        let cookie = '';
        if (COOKIES.length > 0) {
            cookie = COOKIES[Math.floor(Math.random() * COOKIES.length)];
        } else {
            throw new Error('No KlingAI cookie found');
        }
        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'Cookie': cookie,
        };

        const body = {
            arguments: [
                { name: 'prompt', value: prompt },
                { name: 'style', value: '默认' },
                { name: 'aspect_ratio', value: radio || context.KLINGAI_IMAGE_RATIO },
                { name: 'imageCount', value: n || context.KLINGAI_IMAGE_COUNT },
                { name: 'biz', value: 'klingai' },
                ...(args || []),
            ],
            type: type || 'mmu_txt2img_aiweb',
            inputs,
        };

        const resp = await fetch(`https://klingai.com/api/task/submit`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }).then(res => res.json());
        const taskId = resp.data?.task?.id;
        if (!taskId) {
            console.error(JSON.stringify(resp));
            throw new Error(resp.data?.message || 'Failed to get task id, see logs for more details');
        }
        return this.handleTask(taskId, headers, prompt);
    };

    readonly handleTask = async (taskId: string, headers: Record<string, string>, prompt: string) => {
        // max wait time 600s
        const MAX_WAIT_TIME = 600_000;
        const startTime = Date.now();
        while (true) {
            const resp = await fetch(`https://klingai.com/api/task/status?taskId=${taskId}`, {
                headers,
            }).then(res => res.json());
            if ([5, 98, 99].includes(resp.data?.status)) {
                const urls = resp.data.works.map(({ resource }: { resource: { resource: string } }) => resource.resource).filter(Boolean);
                if (urls.length > 0) {
                    log.info(`KlingAI image urls: ${urls.join(', ')}`);
                    return this.render(urls, prompt);
                }
            } else if (resp.data?.status !== 10) {
                log.error(JSON.stringify(resp));
                throw new Error(`${resp.data?.message || resp.message || JSON.stringify(resp)}`);
            }
            if (Date.now() - startTime > MAX_WAIT_TIME) {
                throw new Error(`KlingAI Task timeout`);
            }
            await new Promise(resolve => setTimeout(resolve, 10_000));
        }
    };

    readonly getFileUrl = async (file_id: string, context: AgentUserConfig, headers: Record<string, string>) => {
        const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
        const img_path = (await api.getFileWithReturns({ file_id }).then(res => res.result)).file_path;
        const img_blob = await fetch(`https://api.telegram.org/file/bot${context.SHARE_CONTEXT.botToken}/${img_path}`, {
        }).then(res => res.blob());

        const { token, domain } = await this.getUploadFileTokenAndEndpoint(headers);
        await fetch(`https://${domain}/api/upload/fragment?upload_token=${token}&fragment_id=0`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/octet-stream',
            },
            body: img_blob,
        });

        await fetch(`https://${domain}/api/upload/complete?fragment_count=1&upload_token=${token}`, {
            method: 'POST',
            headers,
        });

        const url_resp = await fetch(`https://klingai.com/api/upload/verify/token?token=${token}`, {
            headers,
        }).then(res => res.json());
        if (!url_resp.data?.url) {
            throw new Error(url_resp.data.message || 'Failed to get file url, see logs for more details');
        }
        return url_resp.data.url;
    };

    readonly getUploadFileTokenAndEndpoint = async (headers: Record<string, string>) => {
        const resp = await fetch(`https://klingai.com/api/upload/issue/token?filename=image.jpg`, {
            headers,
        }).then(res => res.json());
        if (!resp.data.token || !resp.data?.httpEndpoints?.[0]) {
            throw new Error(`Failed to upload file, see logs for more details`);
        }
        return {
            token: resp.data.token,
            domain: resp.data.httpEndpoints[0],
        };
    };

    readonly render = async (data: Response | GeneratedImage[] | string[], prompt: string): Promise<ImageResult> => {
        return { type: 'image', url: data as string[], text: prompt };
    };
}
