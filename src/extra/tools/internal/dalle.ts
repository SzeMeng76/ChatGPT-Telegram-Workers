/* eslint-disable unused-imports/no-unused-vars */
import { log } from '../../log/logger';

export const dalle = {
    schema: {
        name: 'dalle',
        description: 'Generating images with the dalle tool',
        parameters: {
            type: 'object',
            properties: {
                prompts: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'The prompts for the images to generate, the length of the array should be the same as the quantity',
                },
                quantity: {
                    type: 'integer',
                    description: 'The number of images to generate',
                },
                size: {
                    enum: ['1024x1024', '1792x1024', '1024x1792'],
                    description: 'The size of the images to generate, default is 1024x1024',
                },
            },
            required: ['prompts', 'quantity', 'size'],
            additionalProperties: false,
        },
    },

    func: async (args: any, options?: { signal?: AbortSignal }) => {
        const startTime = Date.now();
        log.info(`tool dalle request start`);
        try {
            // TODO
            return { result: 'Failed to generate images', time: ((Date.now() - startTime) / 1e3).toFixed(1) };
        } catch (e) {
            console.error(e);
            return { result: 'Failed to get search results', time: ((Date.now() - startTime) / 1e3).toFixed(1) };
        }
    },
    prompt:
      `As a professional image generation ai. According to the user's prompts for optimization, the prompt should be expanded to be more comprehensive and diverse.`,
    extra_params: { temperature: 1.2 },
};
