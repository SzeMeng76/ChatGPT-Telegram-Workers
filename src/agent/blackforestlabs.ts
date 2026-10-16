import type { AgentUserConfig } from '../config/env';
import type { GeneratedImage, ImageAgent, ImageResult } from './types';
import { createBlackForestLabs } from '@ai-sdk/black-forest-labs';
import { generateImage } from 'ai';
import { withLogger } from '../log';
import { selectKey } from './key-manager';

export class BlackForestLabsImage implements ImageAgent {
    readonly name = 'bfl';
    readonly modelKey = 'BFL_IMAGE_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return context.BFL_API_KEY.length > 0;
    };

    readonly model = (ctx: AgentUserConfig): string => {
        return ctx.BFL_IMAGE_MODEL || 'flux-kontext-pro';
    };

    request = withLogger(async (prompt: string, context: AgentUserConfig, extraParams?: Record<string, any>): Promise<ImageResult> => {
        const {
            referenceImages,
            mask,
            aspectRatio,
            // FLUX 3 specific parameters
            resolution,
            grounding,
            version,
            // FLUX 1/2 parameters
            steps,
            guidance,
            safetyTolerance,
            outputFormat,
            imagePromptStrength,
        } = extraParams || {};

        const bflClient = createBlackForestLabs({
            apiKey: selectKey('bfl', context.BFL_API_KEY) || undefined,
            baseURL: context.BFL_API_BASE,
        });

        const modelId = this.model(context);
        // 与 @ai-sdk/black-forest-labs 的 modelApi 判断保持一致:
        // 旧系列走 legacy;flux-3-image 有独立 API;其余未知 ID(含 flux-3-image-klein)默认走最新 API
        const isLegacy = modelId === 'flux-pro'
            || modelId === 'flux-dev'
            || modelId.startsWith('flux-pro-')
            || modelId.startsWith('flux-kontext-')
            || /^flux-[12](?:[.-]|$)/.test(modelId);
        const isFlux3Base = modelId === 'flux-3-image';
        const isFlux3Latest = !isLegacy && !isFlux3Base;
        const isFlux3 = isFlux3Base || isFlux3Latest;

        // FLUX 3 does not support masks
        if (isFlux3 && mask) {
            throw new Error('FLUX 3 does not support masks. Use flux-pro-1.0-fill for inpainting instead.');
        }

        const providerOptions: Record<string, any> = {};

        if (isFlux3) {
            // FLUX 3 系列共有选项
            if (resolution !== undefined) {
                providerOptions.resolution = resolution;
            }
            // FLUX 3 safety tolerance range is 0-7 (实际上限由端点和组织决定)
            if (safetyTolerance !== undefined) {
                if (safetyTolerance < 0 || safetyTolerance > 7) {
                    throw new Error('FLUX 3 safetyTolerance must be between 0 and 7.');
                }
                providerOptions.safetyTolerance = safetyTolerance;
            }
            if (isFlux3Base) {
                // 仅 flux-3-image 支持联网检索和 version
                if (grounding !== undefined) {
                    providerOptions.grounding = grounding;
                }
                if (version !== undefined) {
                    providerOptions.version = version;
                }
            } else {
                // 仅 Klein(最新 API)支持 steps(1-16)和 outputFormat
                if (steps !== undefined) {
                    providerOptions.steps = steps;
                }
                if (outputFormat !== undefined) {
                    providerOptions.outputFormat = outputFormat;
                }
            }
        } else {
            // FLUX 1/2 options
            if (steps !== undefined) {
                providerOptions.steps = steps;
            }
            if (guidance !== undefined) {
                providerOptions.guidance = guidance;
            }
            if (safetyTolerance !== undefined) {
                providerOptions.safetyTolerance = safetyTolerance;
            }
            if (outputFormat !== undefined) {
                providerOptions.outputFormat = outputFormat;
            }
            if (imagePromptStrength !== undefined) {
                providerOptions.imagePromptStrength = imagePromptStrength;
            }
        }

        const providerOptionsParam = Object.keys(providerOptions).length > 0
            ? { blackForestLabs: providerOptions }
            : undefined;

        // 支持图片编辑（Image-to-Image，使用 flux-kontext-pro/max）
        if (referenceImages && referenceImages.length > 0) {
            const result = await generateImage({
                model: bflClient.image(this.model(context)),
                prompt: {
                    text: prompt,
                    images: referenceImages,
                    ...(mask && { mask }),
                },
                ...(aspectRatio && { aspectRatio }),
                ...(providerOptionsParam && { providerOptions: providerOptionsParam }),
            } as any);

            return this.render(result.images);
        }

        // 文本到图片生成（Text-to-Image）
        const result = await generateImage({
            model: bflClient.image(this.model(context)),
            prompt,
            ...(aspectRatio && { aspectRatio }),
            ...(providerOptionsParam && { providerOptions: providerOptionsParam }),
        } as any);

        return this.render(result.images);
    });

    readonly render = async (result: Response | GeneratedImage[] | string[]): Promise<ImageResult> => {
        const images = result as GeneratedImage[];
        if (images.length === 0) {
            throw new Error('No images generated');
        }
        return {
            raw: images.map(({ uint8Array }) => new Blob([Buffer.from(uint8Array)], { type: 'image/png' })),
            text: '',
        };
    };
}
