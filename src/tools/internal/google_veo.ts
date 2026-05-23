import type { AgentUserConfig } from '../../config/types';
import { applyVerdict, classifyApiError, markKeySuccess, selectKey } from '../../agent/key-manager';

export default {
    schema: {
        name: 'google_veo',
        description: 'Google Veo 3.1 Fast video generation tool with native audio support. Generates videos (4-8 seconds) with synchronized audio in 720p, 1080p, or 4K resolution.',
        parameters: {
            type: 'object',
            required: ['prompt'],
            properties: {
                prompt: {
                    type: 'string',
                    description: 'The text prompt to generate a video from. Include audio cues like dialogue, sound effects, or music descriptions.',
                },
                aspectRatio: {
                    type: 'string',
                    description: 'The aspect ratio of the video',
                    enum: ['16:9', '9:16'],
                    default: '16:9',
                },
                resolution: {
                    type: 'string',
                    description: 'Video resolution. Note: 1080p and 4k require durationSeconds to be 8.',
                    enum: ['720p', '1080p', '4k'],
                    default: '720p',
                },
                durationSeconds: {
                    type: 'number',
                    description: 'Video duration in seconds. Must be 8 if using 1080p or 4k resolution.',
                    enum: [4, 6, 8],
                    default: 8,
                },
                personGeneration: {
                    type: 'string',
                    description: 'The person generation of the video. For text-to-video, use "allow_all". Some regions may have restrictions.',
                    enum: ['allow_all', 'allow_adult', 'dont_allow'],
                    default: 'allow_all',
                },
                numberOfVideos: {
                    type: 'number',
                    description: 'The number of videos to generate; minimum 1, maximum 4',
                    default: 1,
                },
                negativePrompt: {
                    type: 'string',
                    description: 'Negative prompt to exclude specific elements from the generated video (e.g., "cartoon, drawing, low quality")',
                },
            },
        },
    },
    func: generateVideo,
    send_type: 'message',
};

async function generateVideo({
    prompt,
    aspectRatio = '16:9',
    resolution = '720p',
    durationSeconds = 8,
    personGeneration = 'allow_all',
    numberOfVideos = 1,
    negativePrompt,
}: {
    prompt: string;
    aspectRatio: string;
    resolution: string;
    durationSeconds: number;
    personGeneration: string;
    numberOfVideos: number;
    negativePrompt?: string;
}, _env: Record<string, any>, config: AgentUserConfig) {
    // Validate resolution and duration constraints
    if ((resolution === '1080p' || resolution === '4k') && durationSeconds !== 8) {
        return {
            content: [{
                type: 'text',
                text: `Error: ${resolution} resolution requires durationSeconds to be 8. Current value: ${durationSeconds}`
            }],
        };
    }

    const model = 'veo-3.1-fast-generate-preview';
    const apiKey = selectKey('google', config.GOOGLE_API_KEY) || '';
    const url = `${config.GOOGLE_API_BASE}/models/${model}:predictLongRunning?key=${apiKey}`;

    const requestBody = {
        instances: [{
            prompt,
        }],
        parameters: {
            aspectRatio,
            resolution,
            durationSeconds,
            personGeneration,
            sampleCount: numberOfVideos,
            ...(negativePrompt && { negativePrompt }),
        },
    };
    
    console.log('=== Google Veo 3.1 Request ===');
    console.log('Model:', model);
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));
    console.log('==============================');
    
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    
    if (!resp.ok) {
        const detail = await resp.json();
        applyVerdict('google', apiKey, classifyApiError({
            statusCode: resp.status,
            responseBody: JSON.stringify(detail),
            provider: 'google',
        }));
        console.error(`Google veo operation failed: ${detail.error.message}`);
        return {
            content: [{ type: 'text', text: `Google veo operation failed: ${detail.error.message}` }],
        };
    }

    const { name: op_name } = await resp.json();
    markKeySuccess('google', apiKey);
    console.log(`Google veo operation name: ${op_name}`);
    const operationUrl = `${config.GOOGLE_API_BASE}/${op_name}?key=${apiKey}`;
    
    // max wait time: 15 minutes
    const MAX_TIME = 15 * 60 * 1000;
    let elapsedTime = 0;
    const video_urls = [];
    while (true) {
        const resp = await fetch(operationUrl);
        if (resp.ok) {
            const { done, response } = await resp.json();
            if (done) {
                for (const { video } of response?.generateVideoResponse?.generatedSamples || []) {
                    video_urls.push(`${video.uri}&key=${apiKey}`);
                }
                break;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 10_000));
        elapsedTime += 10_000;
        if (elapsedTime > MAX_TIME) {
            throw new Error(`Failed to generate video: timeout, please see the operation in log`);
        }
    }

    console.log(`Google veo operation ${op_name} generated ${video_urls.length} videos with native audio: ${video_urls.join(', ')}`);
    return {
        content: video_urls.map(url => ({
            type: 'video',
            data_type: 'url',
            data: url,
            mimeType: 'video/mp4',
        })),
    };
}
