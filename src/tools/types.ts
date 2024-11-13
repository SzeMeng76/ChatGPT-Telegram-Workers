import type { AgentUserConfig } from '../config/env';

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
 * @send_to_ai send tool output to ai, default: true
 * @is_stream is tool output stream, default: false
 * @scope tool scope, options: private, supergroup, group
 * @handler tool handler, default is content => content
 * @payload tool payload, default is {}
 * @is_internal is internal tool, default: false
 */

export interface FuncTool {
    schema: SchemaData<Record<string, any>>;
    func?: (params: Record<string, any>, options?: { signal?: AbortSignal;[key: string]: any }, config?: AgentUserConfig) => Promise<ToolResult>;
    prompt?: string;
    extra_params?: Record<string, any>;
    type?: 'search' | 'web_crawler' | 'command' | 'text2image';
    required?: string[];
    send_to_ai?: boolean;
    is_stream?: boolean;
    scope?: 'private' | 'supergroup' | 'group';
    handler?: string;
    payload?: Record<string, any>;
    is_internal?: boolean;
    result_type?: 'text' | 'image' | 'audio' | 'file';
}

export interface ToolResult {
    result: any;
    time: string;
}
