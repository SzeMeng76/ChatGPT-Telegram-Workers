import type { ToolCallPart, ToolResultPart } from 'ai';
import type { ImageResult, ResponseMessage } from '../agent/types';
import type { AgentUserConfig } from '../config/env';
import type { MessageSender } from '../telegram/utils/send';
/* eslint-disable no-eval */
import type { FuncTool, ToolResult } from './types';
import { jsonSchema, tool } from 'ai';
import { ENV } from '../config/env';
import { log } from '../log/logger';
import { sendImages } from '../telegram/handler/chat';
import externalTools from './external';
import internalTools from './internal';

export const tools = {
    ...externalTools,
    ...internalTools,
} as Record<string, FuncTool>;

export function executeTool(toolName: string) {
    return async (args: any, options: Record<string, any> & { signal?: AbortSignal }) => {
        const { signal } = options;
        let filledPayload = JSON.stringify(tools[toolName].payload).replace(/\{\{([^}]+)\}\}/g, (match, p1) => args[p1] || match);
        if (tools[toolName].required) {
            tools[toolName].required.forEach((key: string) => {
                if (!ENV.PLUGINS_ENV[key]) {
                    throw new Error(`Missing required key: ${key}`);
                }
                filledPayload = filledPayload.replace(`{{${key}}}`, ENV.PLUGINS_ENV[key]);
            });
        }

        const parsedPayload = JSON.parse(filledPayload);
        const startTime = Date.now();
        log.info(`tool request start, url: ${parsedPayload.url}`);
        let result: any = await fetch(parsedPayload.url, {
            method: parsedPayload.method,
            headers: parsedPayload.headers,
            body: JSON.stringify(parsedPayload.body),
            signal,
        });
        log.info(`tool request end`);
        if (!result.ok) {
            throw new Error(`Tool call error: ${result.statusText}`);
        }
        result = await result.text();
        if (tools[toolName].handler) {
            const f = eval(tools[toolName].handler);
            result = f(result);
        }
        return { result, time: ((Date.now() - startTime) / 1e3).toFixed(1) };
    };
}

export function vaildTools(tools_config: string[]) {
    const useTools = Object.entries(tools).reduce((acc: Record<string, any>, [name, t]) => {
        acc[name] = tool({
            description: t.schema.description,
            parameters: jsonSchema(t.schema.parameters as any),
            execute: t.send_to_ai ? (t.is_internal ? t.func : executeTool(name)) : undefined as any,
        });
        return acc;
    }, {});

    const activeTools = Object.keys(tools).filter(name => tools_config.includes(name));
    return {
        tools: useTools,
        activeTools,
    };
}

export async function manualRequestTool(messages: ResponseMessage[], config: AgentUserConfig) {
    if (messages.at(-1)?.role === 'tool') {
        throw new Error('Maximum steps reached, please increase the number of steps to get the answer');
    }
    const isToolCallResponse = messages.at(-1)?.role === 'assistant'
        && Array.isArray(messages.at(-1)?.content)
        && (messages.at(-1)?.content as (ToolCallPart | ToolResultPart)[]).some(c => c.type === 'tool-call');
    if (!isToolCallResponse) {
        return;
    }
    const toolCallResult = messages.at(-1)?.content as ToolCallPart[];
    messages.push({
        role: 'tool',
        content: [],
    });
    await Promise.all(toolCallResult.filter(c => c.type === 'tool-call').map(async (c) => {
        const tool_func = tools[c.toolName].func || executeTool(c.toolName);
        if (!tool_func) {
            throw new Error(`Tool ${c.toolName} not found`);
        }
        const toolResult = await tool_func(c.args, { signal: undefined }, config);
        (messages.at(-1)?.content as ToolResultPart[]).push({
            type: 'tool-result',
            toolCallId: c.toolCallId,
            toolName: c.toolName,
            result: toolResult,
        });
    }));
}

export async function sendToolResult(toolResult: ToolResultPart[], sender: MessageSender, config: AgentUserConfig) {
    const resultType = tools[toolResult.at(-1)?.toolName || '']?.result_type || 'text';
    switch (resultType) {
        case 'text':
            return sender.sendRichText(toolResult.map(r => (r.result as ToolResult).result).join('\n'));
        case 'image':
            return sendImages(toolResult.map(r => (r.result as ToolResult).result)[0][0], ENV.SEND_IMAGE_FILE, sender, config);
        default:
            break;
    }
}
