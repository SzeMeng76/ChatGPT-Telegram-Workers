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

export type ToolHandler =
    // | {
    //     type: 'function';
    //     data?: string;
    //     patterns?: PatternInfo[];
    // }
    | {
        type: 'template';
        data: string;
        patterns?: PatternInfo[];
        dynamic_patterns?: PatternInfo[];

    }
    | {
        type: 'webclean';
        patterns?: PatternInfo[];
        dynamic_patterns?: PatternInfo[];

    };

/**
 * Function ToolType
 * @schema tool json schema
 * @func tool function, only supported in internal function
 * @prompt tool prompt
 * @extra_params tool extra params
 * @type options: search, web_crawler, command, llm, workflow
 * @required tool required env variables
 * @not_send_to_ai options: not send tool output to ai, default: fasle
 * @is_stream options: is tool output stream, default: false
 * @scope tool scope, options: private, supergroup, group
 * @payload tool payload, default is {}
 * @buildin is internal tool, default: false
 * @handler type options: HandlerType
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
    payload?: Record<string, any>;
    buildin?: boolean;
    result_type?: 'text' | 'image' | 'audio' | 'file';
    // next_tool?: string;
    handler?: ToolHandler;
    webcrawler?: {
        url: string;
        patterns?: PatternInfo[];
    };
    copyright?: string;
}

export interface PatternInfo {
    pattern?: string;
    group?: number;
    clean?: Array<string | string[]>;
}

export interface ToolResult {
    result: any;
    time: string;
}
