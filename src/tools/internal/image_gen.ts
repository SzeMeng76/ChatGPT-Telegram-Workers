import type { ImageResult } from '../../agent/types';
import type { AgentUserConfig } from '../../config/types';

import type { MediaToolResultContent, TextToolResultContent, ToolResult } from '../types';
import { IMAGE_AGENTS } from '../../agent';
import { log } from '../../log/logger';

export default {
    schema: {
        name: 'image_gen',
        description: `A drawing tool that supports different agents. Please comply with the following requirements when using:\nYour role is to:\n   1. Carefully analyze the user's image description.\n 2. Expand on the given details, adding relevant visual elements that enhance the scene.\n 3. Consider lighting, perspective, color palette, and composition to create a vivid mental image.\n 4. Incorporate specific artistic styles or techniques if mentioned or appropriate.\n 5. Ensure all added details are consistent with the user's original vision.\n 6. Translate the expanded description into clear, detailed instructions for image generation. Be creative yet faithful to the original concept.`,
        parameters: {
            type: 'object',
            properties: {
                agent: {
                    type: 'string',
                    description: 'The image agent to use. Default is "default".',
                    enum: ['default', 'dalle', 'openai', 'workers', 'azure', 'vertex', 'oailike', 'kling', 'google', 'xai', 'bfl'],
                    default: 'default',
                },
                prompts: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'If the description user given is not in English, translate it. Always mention the image type (photo, oil painting, watercolor, illustration, cartoon, painting, vector, rendering, etc.) at the beginning of the title.\nIn addition, focus on creating diverse, inclusive, and explorative scenes through the properties you choose in the rewriting process.\nSometimes make choices that may have insight or be unique.\nThe prompt must describe each part of the image in detail, specifically and objectively.\nConsider the final goal of the description and infer what will make the image satisfactory.\nAll descriptions sent to the tool should be a very detailed text. Including but not limited to: time, location, object, and art style to perfect the prompt. Each description should be more than 4 sentences.',
                },
                quantity: {
                    type: 'integer',
                    description: 'The number of images to generate, the maximum is 4. Default is 1.',
                    default: 1,
                },
                size: {
                    type: 'string',
                    enum: ['1024x1024', '1792x1024', '1024x1792'],
                    description: 'The size of the images to generate. Default is "1024x1024".',
                    default: '1024x1024',
                },
                radio: {
                    type: 'string',
                    description: 'The raido of the images to generate. Default is "16:9".',
                    enum: ['1:1', '16:9', '9:16'],
                    default: '16:9',
                },
                style: {
                    type: 'string',
                    description: 'The style of the images to generate. Default is "vivid".',
                    enum: ['vivid', 'natural'],
                    default: 'vivid',
                },
                referenceImages: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Reference images for image-to-image generation. Can be URLs or base64-encoded images. Supported by vertex, google, xai, and bfl agents.',
                },
                mask: {
                    type: 'string',
                    description: 'Mask image for inpainting (optional). Can be URL or base64-encoded image. Supported by vertex and bfl (flux-pro-1.0-fill) agents.',
                },
                editMode: {
                    type: 'string',
                    enum: [
                        'EDIT_MODE_INPAINT_INSERTION',
                        'EDIT_MODE_INPAINT_REMOVAL',
                        'EDIT_MODE_OUTPAINT',
                        'EDIT_MODE_CONTROLLED_EDITING',
                        'EDIT_MODE_PRODUCT_IMAGE',
                        'EDIT_MODE_BGSWAP',
                    ],
                    description: 'Edit mode for Vertex AI image editing. INPAINT_INSERTION: Insert objects/content into the image. INPAINT_REMOVAL: Remove objects from the image. OUTPAINT: Extend image boundaries. CONTROLLED_EDITING: Precise editing with fine control. PRODUCT_IMAGE: Product-focused editing. BGSWAP: Replace the background. Only supported by vertex agent.',
                },
                maskMode: {
                    type: 'string',
                    enum: [
                        'MASK_MODE_DEFAULT',
                        'MASK_MODE_USER_PROVIDED',
                        'MASK_MODE_DETECTION_BOX',
                        'MASK_MODE_CLOTHING_AREA',
                        'MASK_MODE_PARSED_PERSON',
                    ],
                    description: 'Mask mode for Vertex AI. USER_PROVIDED: Use the provided mask image. DETECTION_BOX: Auto-detect bounding boxes. CLOTHING_AREA: Segment clothing areas. PARSED_PERSON: Parse person body/clothing. Only supported by vertex agent when mask is provided or editMode requires it.',
                },
                maskDilation: {
                    type: 'number',
                    minimum: 0,
                    maximum: 1,
                    description: 'Mask dilation value (0-1). Controls how much to expand the mask area. Recommended: 0.01. Only supported by vertex agent.',
                },
                negativePrompt: {
                    type: 'string',
                    description: 'Negative prompt to exclude certain elements from the generated/edited image. Helps avoid unwanted features. Only supported by vertex agent.',
                },
                baseSteps: {
                    type: 'integer',
                    minimum: 35,
                    maximum: 75,
                    description: 'Number of base steps for image generation (35-75). Higher values produce better quality but take longer. Only supported by vertex agent.',
                },
                resolution: {
                    type: 'string',
                    enum: ['768sq', '1k', '1.5k', '2k', '4k'],
                    description: 'Output resolution class for FLUX 3 image generation. Higher resolutions produce more detailed images but take longer. Default is "1k". Only supported by bfl agent with flux-3-image model.',
                },
                grounding: {
                    type: 'boolean',
                    description: 'Enable web and image search grounding for FLUX 3. When enabled, the model can use web search results to ground the generation. Default is true. Only supported by bfl agent with flux-3-image model.',
                },
                version: {
                    type: 'string',
                    enum: ['latest'],
                    description: 'FLUX 3 endpoint version. Currently only "latest" is available. Only supported by bfl agent with flux-3-image model.',
                },
                steps: {
                    type: 'integer',
                    description: 'Number of generation steps. Higher values can improve quality but increase generation time. Only supported by bfl agent with FLUX 1/2 models (not flux-3-image).',
                },
                guidance: {
                    type: 'number',
                    description: 'Guidance scale for image generation. Controls how closely the image follows the prompt. Only supported by bfl agent with FLUX 1/2 models (not flux-3-image).',
                },
                safetyTolerance: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 6,
                    description: 'Moderation level for inputs and outputs (0 = most strict, 6 = more permissive). For FLUX 3, the range is 0-4 with default 2. Only supported by bfl agent.',
                },
                outputFormat: {
                    type: 'string',
                    enum: ['jpeg', 'png'],
                    description: 'Desired format of the output image. Only supported by bfl agent with FLUX 1/2 models (not flux-3-image).',
                },
                imagePromptStrength: {
                    type: 'number',
                    minimum: 0,
                    maximum: 1,
                    description: 'Strength of the image prompt influence on generation (0.0 to 1.0). Only supported by bfl agent with FLUX 1/2 models (not flux-3-image).',
                },
            },
            required: ['prompts'],
        },
    },

    func: async ({
        agent: agent_name = 'default',
        prompts,
        quantity = 1,
        size = '1024x1024',
        radio = '16:9',
        style = 'vivid',
        referenceImages,
        mask,
        editMode,
        maskMode,
        maskDilation,
        negativePrompt,
        baseSteps,
        resolution,
        grounding,
        version,
        steps,
        guidance,
        safetyTolerance,
        outputFormat,
        imagePromptStrength,
    }: {
        agent: string;
        prompts: string[];
        quantity: number;
        size: string;
        radio: string;
        style: string;
        referenceImages?: string[];
        mask?: string;
        editMode?: string;
        maskMode?: string;
        maskDilation?: number;
        negativePrompt?: string;
        baseSteps?: number;
        resolution?: string;
        grounding?: boolean;
        version?: string;
        steps?: number;
        guidance?: number;
        safetyTolerance?: number;
        outputFormat?: string;
        imagePromptStrength?: number;
    }, _env: Record<string, any>, config: AgentUserConfig): Promise<ToolResult> => {
        if (!config) {
            return { content: [{ type: 'text', text: 'Missing config' }] };
        }
        if (agent_name === 'dalle') {
            agent_name = 'openai';
        }
        if (agent_name === 'default') {
            agent_name = config.AI_IMAGE_PROVIDER;
        }
        log.info(`tool image_gen request start: agent: ${agent_name}`);
        log.info(`params: ${JSON.stringify({ agent: agent_name, prompts, quantity, size, radio, style, referenceImages, mask, editMode, maskMode, maskDilation, negativePrompt, baseSteps, resolution, grounding, version, steps, guidance, safetyTolerance, outputFormat, imagePromptStrength })}`);
        const agent = IMAGE_AGENTS.find(a => a.name === agent_name);
        if (!agent?.enable(config)) {
            return { content: [{ type: 'text', text: `Image agent ${agent_name} is not available`, is_error: true }] };
        }
        const result: ImageResult[] = await Promise.all(prompts.map(async (prompt) => {
            try {
                return await agent.request(prompt, config, {
                    quantity,
                    size,
                    radio,
                    style,
                    referenceImages,
                    mask,
                    editMode,
                    maskMode,
                    maskDilation,
                    negativePrompt,
                    baseSteps,
                    resolution,
                    grounding,
                    version,
                    steps,
                    guidance,
                    safetyTolerance,
                    outputFormat,
                    imagePromptStrength,
                });
            } catch (e) {
                return { message: (e as Error).message };
            }
        }));
        log.info(`${agent_name} result: ${JSON.stringify(result)}`);
        const type = result[0].url ? 'url' : 'blob';
        const messages = result.filter(({ message }) => message).map(({ message }) => ({
            type: 'text',
            text: message,
        })) as TextToolResultContent[];
        const images = result.flatMap(r => (r.url || r.raw || []).map(data => ({
            type: 'image',
            data_type: type,
            data,
            mimeType: 'image/png',
            text: result[0].text ?? '',
        }))) as MediaToolResultContent[];
        return {
            content: [...messages, ...images],
        };
    },

    extra_params: { temperature: 1.2 },
    type: 'text2image',
    send_type: 'message',
};
