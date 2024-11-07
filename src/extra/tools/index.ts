/* eslint-disable no-eval */
import { jsonSchema, tool } from 'ai';

import externalTools from './external';
import { duckduckgo } from './internal/duckduckgo';

export { default as tasks } from './scheduletask';

function executeTool(payload: Record<string, any>, required?: string[], envs?: Record<string, any>, hander?: string) {
    return async (args: any, options: Record<string, any> & { signal?: AbortSignal }) => {
        const { signal } = options;
        let filledPayload = JSON.stringify(payload).replace(/\{\{([^}]+)\}\}/g, (match, p1) => args[p1] || match);
        if (required && envs) {
            required.forEach((key) => {
                if (!envs[key]) {
                    throw new Error(`Missing required argument: ${key}`);
                }
                filledPayload = filledPayload.replace(`{{${key}}}`, envs[key]);
            });
        }

        const parsedPayload = JSON.parse(filledPayload);
        const startTime = Date.now();
        let result: any = await fetch(parsedPayload.url, {
            method: parsedPayload.method,
            headers: parsedPayload.headers,
            body: JSON.stringify(parsedPayload.body),
            signal,
        });
        if (!result.ok) {
            throw new Error(`Tool call error: ${result.statusText}`);
        }
        result = await result.text();
        if (hander) {
            const f = eval(hander);
            result = f(result);
        }
        return { result, time: `${((Date.now() - startTime) / 1000).toFixed(1)}s` };
    };
}

export const toolsName = ['duckduckgo', ...Object.keys(externalTools)];

export function vaildTools(tools_config: string[], tool_envs: Record<string, any>) {
    const tools: Record<string, any> = {
        duckduckgo: tool({
            description: duckduckgo.schema.description,
            parameters: jsonSchema(duckduckgo.schema.parameters as any),
            execute: duckduckgo.func,
        }),
    };
    Object.entries(externalTools).forEach(([name, { description, parameters, execute_unstructured, hander }]) => {
        tools[name] = tool({
            description,
            parameters,
            execute: executeTool(execute_unstructured.payload, execute_unstructured.required, tool_envs, hander),
        });
    });
    const activeTools = Object.keys(tools).filter(name => tools_config.includes(name));
    let tools_prompt = '';
    if (activeTools.length > 0) {
        tools_prompt = `\n\nYou can consider using the following tools:\n##TOOLS${activeTools.map(name =>
            `\n\n### ${name}\n- desc: ${(externalTools[name] || tools.duckduckgo).description} \nThe requirements are as follows: ${(externalTools[name] || tools.duckduckgo).prompt || ''}`,
        ).join('')}`;
    }
    return {
        tools,
        activeTools,
        tools_prompt,
    };
}
