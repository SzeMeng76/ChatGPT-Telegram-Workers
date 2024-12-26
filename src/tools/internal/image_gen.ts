import type { ImageResult } from '../../agent/types';
import type { AgentUserConfig } from '../../config/env';

import type { FuncTool, ToolResult } from '../types';
import { IMAGE_AGENTS } from '../../agent';
import { log } from '../../log/logger';

export const image_gen: FuncTool = {
    schema: {
        name: 'image_gen',
        description: 'A drawing tool that supports different agents.',
        parameters: {
            type: 'object',
            properties: {
                agent: {
                    type: 'string',
                    description: 'The agent to use, You can only set values from the following options: \'openai\', \'workers\', \'azure\', \'vertex\', \'oailike\', \'kling\', where openai is aliased as dalle, google is aliased as vertex, and if the information provided by the user is incorrect, please use the most similar option. if user dont specify, use openai',
                    enum: ['openai', 'workers', 'azure', 'vertex', 'oailike', 'kling'],
                    default: 'openai',
                },
                prompts: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'If the description user given is not in English, translate it. Always mention the image type (photo, oil painting, watercolor, illustration, cartoon, painting, vector, rendering, etc.) at the beginning of the title.\nIn addition, focus on creating diverse, inclusive, and explorative scenes through the properties you choose in the rewriting process.\nSometimes make choices that may have insight or be unique.\nThe prompt must describe each part of the image in detail, specifically and objectively.\nConsider the final goal of the description and infer what will make the image satisfactory.\nAll descriptions sent to the tool should be a very detailed text. Including but not limited to: time, location, object, and art style to perfect the prompt. Each description should be more than 4 sentences.',
                },
                quantity: {
                    type: 'integer',
                    description: 'The number of images to generate, the maximum is 4. If the user does not specify a specific number of images, set it to 1.',
                    default: 1,
                },
                size: {
                    type: 'string',
                    enum: ['1024x1024', '1792x1024', '1024x1792'],
                    description: 'The size of the images to generate, default is 1024x1024',
                    default: '1024x1024',
                },
                radio: {
                    type: 'string',
                    description: 'The raido of the images to generate, default is 1:1',
                    enum: ['1:1', '16:9', '9:16'],
                    default: '1:1',
                },
                style: {
                    type: 'string',
                    description: 'The style of the images to generate, default is vivid',
                    enum: ['vivid', 'natural'],
                    default: 'vivid',
                },
            },
            required: ['agent', 'prompts', 'quantity', 'size', 'radio'],
            additionalProperties: false,
        },
    },

    func: async (args: Record<string, any>, options?: { signal?: AbortSignal;[key: string]: any }, config?: AgentUserConfig): Promise<ToolResult> => {
        if (!config) {
            throw new Error('Missing config');
        }
        const startTime = Date.now();
        const { agent: agent_name, prompts, quantity, size, radio, style } = args;
        log.info(`tool image_gen request start: agent: ${agent_name}`);
        log.info(`params: ${JSON.stringify(args)}`);
        const agent = IMAGE_AGENTS.find(a => a.name === agent_name);
        if (!agent?.enable(config)) {
            throw new Error(`Image agent ${agent_name} is not available`);
        }
        const result: ImageResult[] = [];
        for (const prompt of prompts) {
            const res = await agent.request(prompt, config, { quantity, size, radio, style });
            result.push(res);
        }
        log.info(`${agent_name} result: ${JSON.stringify(result)}`);
        return { result, time: ((Date.now() - startTime) / 1e3).toFixed(1) };
    },

    extra_params: { temperature: 1.2 },
    type: 'text2image',
    not_send_to_ai: true,
    buildin: true,
    result_type: 'image',
};
