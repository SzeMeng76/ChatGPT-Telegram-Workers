import type { AgentUserConfig } from '../config/env';
import type { PatternInfo } from './internal/webclean';

export interface SchemaData<T extends Record<string, any>> {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: Record<string, T>;
        $defs?: Record<string, T>;
        required: string[];
        additionalProperties: boolean;
    };
}

/**
 * Function ToolType
 * @schema tool json schema
 * @func tool function, only supported in internal function
 * @prompt tool prompt
 * @extra_params tool extra params
 * @type options: search, web_crawler, command, llm, workflow
 * @required tool required env variables
 * @not_send_to_ai not send tool output to ai, default: fasle
 * - @is_stream is tool output stream, default: false
 * @scope tool scope, options: private, supergroup, group
 * @handler tool handler, default is content => content
 * @payload tool payload, default is {}
 * @buildin is internal tool, default: false
 * @webcrawler support input template(same as plugin input template but only support variable interpolation not support loop and condition) and patterns
 */

export interface FuncTool {
    schema: SchemaData<Record<string, any>>;
    func?: (params: Record<string, any>, options?: { signal?: AbortSignal;[key: string]: any }, config?: AgentUserConfig) => Promise<ToolResult>;
    prompt?: string;
    extra_params?: Record<string, any>;
    type?: 'search' | 'web_crawler' | 'command' | 'text2image';
    required?: string[];
    not_send_to_ai?: boolean;
    // is_stream?: boolean;
    scope?: 'private' | 'supergroup' | 'group';
    handler?: string;
    payload?: Record<string, any>;
    buildin?: boolean;
    result_type?: 'text' | 'image' | 'audio' | 'file';
    next_tool?: string;
    webcrawler?: {
        template?: string;
        patterns?: PatternInfo[];
    };
}

export interface ToolResult {
    result: any;
    time: string;
}
