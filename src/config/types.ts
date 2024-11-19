export interface KVNamespace {
    get: (key: string | string[]) => Promise<string | any>;
    put: (key: string, value: string, info?: { expirationTtl?: number; expiration?: number; condition?: 'NX' | 'XX' }) => Promise<any>;
    delete: (key: string) => Promise<void>;
    list: (prefix?: string) => Promise<string[]>;
}

export interface APIGuard {
    fetch: (request: Request) => Promise<Response>;
}

export interface CommandConfig {
    value: string;
    description?: string | null;
    scope?: string[] | null;
}

type FlowType = 'text' | 'image' | 'audio';

export type FlowStruct = {
    [key in FlowType]?: {
        // isParallel?: boolean;
        disableHistory?: boolean;
        disableTool?: boolean;
        workflow?: {
            agent?: string;
            prompt?: string;
            model?: string;
            type?: FlowType;
            text?: string;
        }[];
    };
};

export type LogLevelType = 'debug' | 'info' | 'warn' | 'error';
