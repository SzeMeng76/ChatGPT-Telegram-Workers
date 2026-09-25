import type { AgentUserConfig } from '../../config/types';
import { selectKey } from '../../agent/key-manager';
import { createXai } from '@ai-sdk/xai';
import { experimental_generateVideo as generateVideo } from 'ai';

export default {
    schema: {
        name: 'xai_video',
        description: 'xAI Grok Imagine Video generation tool. Supports text-to-video, image-to-video, first-last-frame interpolation, keyframes, and video editing. Generates videos up to 5 seconds in 720p or 480p resolution (1080p for reference-to-video is capped to 720p).',
        parameters: {
            type: 'object',
            required: ['prompt'],
            properties: {
                prompt: {
                    type: 'string',
                    description: 'The text prompt to generate or edit a video. For video editing, describe the transformation you want.',
                },
                mode: {
                    type: 'string',
                    description: 'Video generation mode',
                    enum: ['text-to-video', 'image-to-video', 'video-edit'],
                    default: 'text-to-video',
                },
                imageUrl: {
                    type: 'string',
                    description: 'Image URL for image-to-video mode, or the first frame when combined with lastFrameImageUrl.',
                },
                lastFrameImageUrl: {
                    type: 'string',
                    description: 'Image URL to pin as the last frame of the video (first-last-frame interpolation). Combine with imageUrl for the first frame.',
                },
                videoUrl: {
                    type: 'string',
                    description: 'Video URL for video editing mode. The video will be transformed based on the prompt.',
                },
                aspectRatio: {
                    type: 'string',
                    description: 'The aspect ratio of the video (not supported for video editing)',
                    enum: ['16:9', '9:16', '1:1'],
                    default: '16:9',
                },
                duration: {
                    type: 'number',
                    description: 'Video duration in seconds (not supported for video editing)',
                    enum: [5],
                    default: 5,
                },
                resolution: {
                    type: 'string',
                    description: 'Video resolution (not supported for video editing)',
                    enum: ['480p', '720p'],
                    default: '720p',
                },
                generateAudio: {
                    type: 'boolean',
                    description: 'Whether to generate audio alongside the video (not supported for video editing/extension).',
                },
                keyframes: {
                    type: 'array',
                    description: 'Up to 4 mid-video image anchors (text-to-video / image-to-video only). Each timestamp must fall strictly inside the video duration.',
                    items: {
                        type: 'object',
                        required: ['imageUrl', 'timestampSeconds'],
                        properties: {
                            imageUrl: { type: 'string', description: 'Image URL for this keyframe.' },
                            timestampSeconds: { type: 'number', description: 'Timestamp in seconds where this keyframe should appear.' },
                        },
                    },
                },
                storageFilename: {
                    type: 'string',
                    description: 'If set, stores the generated video in the xAI Files API under this filename instead of returning it inline.',
                },
                storageExpiresAfterSeconds: {
                    type: 'number',
                    description: 'How long the stored file should be retained, in seconds (up to 30 days). Only used when storageFilename is set.',
                },
            },
        },
    },
    func: generateXaiVideo,
    send_type: 'message',
};

async function generateXaiVideo({
    prompt,
    mode = 'text-to-video',
    imageUrl,
    lastFrameImageUrl,
    videoUrl,
    aspectRatio = '16:9' as `${number}:${number}`,
    duration = 5,
    resolution = '720p',
    generateAudio,
    keyframes,
    storageFilename,
    storageExpiresAfterSeconds,
}: {
    prompt: string;
    mode?: string;
    imageUrl?: string;
    lastFrameImageUrl?: string;
    videoUrl?: string;
    aspectRatio?: `${number}:${number}`;
    duration?: number;
    resolution?: string;
    generateAudio?: boolean;
    keyframes?: Array<{ imageUrl: string; timestampSeconds: number }>;
    storageFilename?: string;
    storageExpiresAfterSeconds?: number;
}, _env: Record<string, any>, config: AgentUserConfig) {
    const apiKey = selectKey('xai', config.XAI_API_KEY) || '';

    if (!apiKey) {
        return {
            content: [{
                type: 'text',
                text: 'Error: XAI_API_KEY is not configured'
            }],
        };
    }

    // Validate mode-specific requirements
    if (mode === 'image-to-video' && !imageUrl) {
        return {
            content: [{
                type: 'text',
                text: 'Error: imageUrl is required for image-to-video mode'
            }],
        };
    }

    if (mode === 'video-edit' && !videoUrl) {
        return {
            content: [{
                type: 'text',
                text: 'Error: videoUrl is required for video-edit mode'
            }],
        };
    }

    const xaiClient = createXai({
        apiKey,
        baseURL: config.XAI_API_BASE,
    });

    const videoModel = xaiClient.video(config.XAI_VIDEO_MODEL || 'grok-imagine-video-1.5');

    const frameImages = lastFrameImageUrl && mode !== 'video-edit'
        ? [{ image: lastFrameImageUrl, frameType: 'last_frame' as const }]
        : undefined;

    const storageOptions = storageFilename
        ? {
                filename: storageFilename,
                ...(storageExpiresAfterSeconds != null ? { expiresAfter: storageExpiresAfterSeconds } : {}),
            }
        : undefined;

    console.log('=== xAI Grok Imagine Video Request ===');
    console.log('Mode:', mode);
    console.log('Prompt:', prompt);
    console.log('======================================');

    try {
        let videoResult;

        if (mode === 'video-edit') {
            // Video editing mode
            videoResult = await generateVideo({
                model: videoModel,
                prompt,
                providerOptions: {
                    xai: {
                        videoUrl,
                        pollTimeoutMs: 600000, // 10 minutes
                        pollIntervalMs: 5000,
                    },
                },
            });
        } else if (mode === 'image-to-video') {
            // Image-to-video mode
            videoResult = await generateVideo({
                model: videoModel,
                prompt: {
                    image: imageUrl!,
                    text: prompt,
                },
                duration,
                aspectRatio,
                frameImages,
                generateAudio,
                providerOptions: {
                    xai: {
                        resolution,
                        pollTimeoutMs: 600000,
                        pollIntervalMs: 5000,
                        ...(keyframes != null ? { keyframes } : {}),
                        ...(storageOptions != null ? { storageOptions } : {}),
                    },
                },
            });
        } else {
            // Text-to-video mode
            videoResult = await generateVideo({
                model: videoModel,
                prompt,
                duration,
                aspectRatio,
                frameImages,
                generateAudio,
                providerOptions: {
                    xai: {
                        resolution,
                        pollTimeoutMs: 600000,
                        pollIntervalMs: 5000,
                        ...(keyframes != null ? { keyframes } : {}),
                        ...(storageOptions != null ? { storageOptions } : {}),
                    },
                },
            });
        }

        const { videos } = videoResult;

        if (!videos || videos.length === 0) {
            throw new Error('No videos generated');
        }

        console.log(`xAI video generated successfully: ${videos.length} video(s)`);

        return {
            content: videos.map(video => ({
                type: 'video',
                data_type: 'base64',
                data: video.base64,
                mimeType: video.mediaType || 'video/mp4',
            })),
        };
    } catch (error: any) {
        console.error('xAI video generation failed:', error);
        return {
            content: [{
                type: 'text',
                text: `xAI video generation failed: ${error.message || error}`
            }],
        };
    }
}
