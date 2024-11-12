/* eslint-disable unused-imports/no-unused-vars */
import type * as Telegram from 'telegram-bot-api-types';
import type { WorkerContext } from '../../config/context';
import type { MessageSender } from '../utils/send';
import type { UnionData } from '../utils/utils';

const scopeTypes = [
    'default',
    'all_private_chats',
    'all_group_chats',
    'all_chat_administrators',
    'chat',
    'chat_member',
    'chat_administrators',
] as const;

export type ScopeType = typeof scopeTypes[number];

export interface CommandHandler {
    command: string;
    scopes?: ScopeType[];
    relaxAuth?: boolean;
    handle: (message: Telegram.Message, subcommand: string, context: WorkerContext, sender: MessageSender) => Promise<Response | UnionData | null>;
    needAuth?: (chatType: string) => string[] | null;
}

export interface InlineItem {
    label: string;
    data: string;
    config_key: string;
    available_values: string[];
}
