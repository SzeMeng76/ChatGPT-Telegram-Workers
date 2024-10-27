import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '../../config/env';
import { findPhotoFileID } from '../handler/chat';

export function isTelegramChatTypeGroup(type: string): boolean {
    return type === 'group' || type === 'supergroup';
}

type MsgType = 'text' | 'audio' | 'image'; // animation sticker.emoji video
export interface UnionData {
    type: MsgType;
    text?: string;
    // reply_text?: string;
    id?: string[];
    url?: string[];
    raw?: Blob[];
}

export function extractMessage(message: Telegram.Message, currentBotId: number): UnionData | null {
    const acceptMsgType: string[] = ENV.ENABLE_FILE ? ['document', 'photo', 'voice', 'audio', 'text'] : ['text'];
    const messageData = extractTypeFromMessage(message, acceptMsgType);

    if (messageData && messageData.type === 'text' && isNeedGetReplyMessage(message, currentBotId)) {
        const { type, id /* , text = '' */ } = extractTypeFromMessage(message.reply_to_message as any, acceptMsgType) || {};
        if (type && type !== 'text')
            messageData.type = type;
        // if (text)
        //     messageData.reply_text = text;
        if (id && id.length > 0)
            messageData.id = id;
    }

    return messageData;
}

function extractTypeFromMessage(message: Telegram.Message, supportType: string[]): UnionData | null {
    let msgType = supportType.find(t => t in message);
    // const text = message.text ?? message.caption ?? '';
    if (!msgType)
        return null;

    switch (msgType) {
        case 'text':
            return {
                type: 'text',
                // text,
            };
        case 'photo':
        {
            const file_id = findPhotoFileID(message.photo as Telegram.PhotoSize[], ENV.TELEGRAM_PHOTO_SIZE_OFFSET);
            if (!file_id) {
                return { type: 'text' /* , text */ };
            }
            return {
                type: 'image',
                id: [file_id],
                // text,
            };
        }
        case 'document':
        case 'audio':
        case 'voice':
        {
            if (msgType === 'document') {
                const type = message.document?.mime_type?.match(/(audio|image)/)?.[1];
                if (!type) {
                    return null;
                }
                msgType = type;
            }
            const id = message[msgType as 'document' | 'voice' | 'audio']?.file_id;
            return {
                type: ['audio', 'voice'].includes(msgType) ? 'audio' : 'image',
                ...(id && { id: [id] }),
                // text,
            };
        }
    }
    return null;
}

function isNeedGetReplyMessage(message: Telegram.Message, currentBotId: number) {
    return ENV.EXTRA_MESSAGE_CONTEXT && message.reply_to_message && (message.reply_to_message.from?.id !== currentBotId || message.reply_to_message.photo);
}

export function UUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const isCfWorker = typeof globalThis !== 'undefined'
    && typeof (globalThis as any).ServiceWorkerGlobalScope !== 'undefined'
    && globalThis instanceof ((globalThis as any).ServiceWorkerGlobalScope);

export function chunckArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}
