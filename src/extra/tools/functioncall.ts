/* eslint-disable antfu/if-newline */
import type { ParseMode } from 'telegram-bot-api-types';
import type { ChatAgent, ChatStreamTextHandler, CompletionData, HistoryItem, LLMChatParams, MessageAssistantFunction, MessageTool } from '../../agent/types';
import type { WorkerContext } from '../../config/context';
import type { MessageSender } from '../../telegram/utils/send';
import type { SchemaData } from './types';
import { OpenAI } from '../../agent/openai';
import { ENV } from '../../config/env';
import { OnStreamHander } from '../../telegram/handler/chat';
import { getLog, Log } from '../log/logDecortor';
import { log } from '../log/logger';

interface FunctionCallResult {
    id: string;
    name: string;
    args: Record<string, any>;
}

interface ToolStruct {
    type: string;
    function: SchemaData;
    strict: boolean;
}

export function getValidToolStructs(tools: string[]): Record<string, ToolStruct> {
    return tools
        .filter(tool => tool in ENV.TOOLS)
        .reduce((acc, tool) => {
            acc[tool] = {
                type: 'function',
                function: ENV.TOOLS[tool].schema,
                strict: true,
            };
            return acc;
        }, {} as Record<string, ToolStruct>);
}

export class FunctionCall {
    context: WorkerContext;
    vaildTools: Record<string, ToolStruct>;
    history: HistoryItem[];
    agent: ChatAgent;
    sender: MessageSender | null;
    prompt: string;
    default_params = {
        prompt: '##TOOLS\n\nYou can use these tools below:\n\n',
        extra_params: { temperature: 0.5, top_p: 0.4, max_tokens: 100 },
    };

    constructor(context: WorkerContext, vaildTools: Record<string, ToolStruct>, history: HistoryItem[] = [], sender: MessageSender | null = null, agent: ChatAgent = new OpenAI('tool')) {
        this.context = context;
        this.vaildTools = vaildTools;
        this.history = history;
        this.agent = agent;
        this.sender = sender;
        this.prompt = context.USER_CONFIG.SYSTEM_INIT_MESSAGE || '';
    }

    validCalls(tool_calls: any[]): FunctionCallResult[] {
        return tool_calls.filter(i => i.function.name in this.vaildTools).map(func => ({
            id: func.id,
            name: func.function.name,
            args: JSON.parse(func.function.arguments),
        }));
    }

    async call(params: Record<string, any>, onStream: ChatStreamTextHandler | null): Promise<CompletionData> {
        return this.agent.request(params as LLMChatParams, this.context.USER_CONFIG, onStream);
    }

    @Log
    async exec(func: FunctionCallResult, env: Record<string, string>): Promise<string> {
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = ENV.FUNC_TIMEOUT > 0 ? setTimeout(() => controller.abort(), ENV.FUNC_TIMEOUT * 1e3) : null;
        const { name, args } = func;
        if (ENV.TOOLS[name]?.ENV_KEY) {
            args[ENV.TOOLS[name].ENV_KEY] = env[ENV.TOOLS[name].ENV_KEY];
        }
        const content = await ENV.TOOLS[name].func(args, signal) || '';
        if (timeoutId) clearTimeout(timeoutId);
        return content;
    }

    async run(): Promise<any> {
        let FUNC_LOOP_TIMES = ENV.FUNC_LOOP_TIMES;
        const ASAP = this.context.USER_CONFIG.FUNCTION_REPLY_ASAP;
        const onStream = ENV.STREAM_MODE && this.sender ? OnStreamHander(this.sender, this.context) : null;
        // 目前只支持一个 后续增加需要改进读取方式
        const INTERNAL_ENV = this.extractInternalEnv(['JINA_API_KEY']);
        const params = this.trimParams(ASAP);

        while (FUNC_LOOP_TIMES !== 0) {
            const llm_resp = await this.call(params, onStream);
            let func_params = this.paramsExtract(llm_resp);

            if (func_params.length === 0) {
                if (!llm_resp) {
                    throw new Error('No answer from LLM');
                }
                if (ASAP) {
                    await this.sendLastResponse(llm_resp, onStream);
                    this.history.push(...this.trimMessage(llm_resp));
                }
                return {
                    isFinished: true,
                    extra_params: params.extra_params,
                    prompt: this.prompt,
                };
            }

            // 裁剪响应与函数调用参数
            llm_resp.tool_calls = llm_resp.tool_calls!.slice(0, ENV.CON_EXEC_FUN_NUM);
            func_params = func_params.slice(0, ENV.CON_EXEC_FUN_NUM);

            const func_result = await Promise.all(func_params.map(i => this.exec(i, INTERNAL_ENV)));
            log.debug('func_result:', func_result);
            this.history.push(...this.trimMessage(llm_resp, func_result));
            FUNC_LOOP_TIMES--;
        }
        return {
            isFinished: false,
            extra_params: params.extra_params,
            prompt: this.prompt,
        };
    }

    private trimParams(ASAP: boolean): Record<string, any> {
        const toolDetails = Object.entries(this.vaildTools);
        const toolPrompts = toolDetails
            .map(([k, v]) => `##${k}\n\n###${v.function.description}\n\n####${ENV.TOOLS[k]?.prompt || ''}`)
            .join('\n\n');
        this.prompt += `\n\n${this.default_params.prompt}${toolPrompts}`;

        const params: LLMChatParams = {
            history: this.history,
            prompt: this.prompt,
            extra_params: {
                tools: toolDetails.map(([, v]) => v),
                tool_choice: 'auto',
                ...this.default_params.extra_params,
            },
        };
        if (ASAP && params.extra_params?.max_tokens) {
            delete params.extra_params.max_tokens;
        }
        log.debug('params:', params);
        return params;
    }

    private extractInternalEnv(keys: string[]): Record<string, any> {
        return keys.reduce((acc, key) => {
            acc[key] = this.context.USER_CONFIG[key];
            return acc;
        }, {} as Record<string, any>);
    }

    private async sendLastResponse(llm_resp: CompletionData, onStream: ChatStreamTextHandler | null): Promise<void> {
        if (onStream) {
            const nextTime = onStream.nextEnableTime?.() ?? 0;
            if (nextTime > Date.now()) {
                await new Promise(resolve => setTimeout(resolve, nextTime - Date.now()));
            }
            await onStream(llm_resp.content, true);
        } else if (this.sender) {
            await this.sender.sendRichText(`${getLog(this.context.USER_CONFIG)}\n${llm_resp.content}`, ENV.DEFAULT_PARSE_MODE as ParseMode, 'chat');
        }
    }

    paramsExtract(llm_resp: CompletionData): FunctionCallResult[] {
        return this.validCalls(llm_resp?.tool_calls || []);
    }

    trimMessage(llm_content: CompletionData, func_result?: string[]): (MessageAssistantFunction | MessageTool)[] {
        const llm_result = [{ role: 'assistant', content: llm_content.content, tool_calls: llm_content.tool_calls }] as any[];
        if (!func_result) {
            return llm_result;
        }

        log.debug('func_result length:', func_result.length);

        llm_result.push(...func_result.map((content, index) => ({
            role: 'tool',
            content,
            name: llm_content.tool_calls![index].function.name,
            tool_call_id: llm_content.tool_calls![index].id,
        })));
        return llm_result;
    }
}
