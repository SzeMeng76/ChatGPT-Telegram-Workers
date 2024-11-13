import type { ImageResult } from '../../agent/types';
import type { AgentUserConfig } from '../../config/env';

import type { FuncTool, ToolResult } from '../types';
import { Dalle } from '../../agent/openai';
import { log } from '../../log/logger';

export const dalle: FuncTool = {
    schema: {
        name: 'dalle',
        description: 'Generating images with the dalle tool',
        parameters: {
            type: 'object',
            properties: {
                prompts: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'The prompts for the images to generate, the length of the array should be the same as the quantity. As a professional image generation ai. According to the user\'s prompts for optimization, the prompt should be expanded to be more comprehensive and diverse.',
                },
                quantity: {
                    type: 'integer',
                    description: 'The number of images to generate, the maximum is 4',
                },
                size: {
                    type: 'string',
                    enum: ['1024x1024', '1792x1024', '1024x1792'],
                    description: 'The size of the images to generate, default is 1024x1024',
                },
            },
            required: ['prompts', 'quantity', 'size'],
            additionalProperties: false,
        },
    },

    func: async (args: Record<string, any>, options?: { signal?: AbortSignal;[key: string]: any }, config?: AgentUserConfig): Promise<ToolResult> => {
        if (!config) {
            throw new Error('Missing config');
        }
        const startTime = Date.now();
        log.info(`tool dalle request start`);
        const { prompts, quantity, size } = args;
        const agent = new Dalle();
        const result: ImageResult[] = [];
        for (const prompt of prompts) {
            const res = await agent.request(prompt, config, { quantity, size });
            result.push(res);
        }
        log.info(`dalle result: ${JSON.stringify(result)}`);
        return { result, time: ((Date.now() - startTime) / 1e3).toFixed(1) };
    },
    prompt:
        `As a professional image generation ai. According to the user's prompts for optimization, the prompt should be expanded to be more comprehensive and diverse.`,

    extra_params: { temperature: 1.2 },
    type: 'text2image',
    send_to_ai: false,
    is_internal: true,
    result_type: 'image',
};
