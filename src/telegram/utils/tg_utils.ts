import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '../../config/env';
import { log } from '../../log';
import { createTelegramBotAPI } from '../api';
import { findPhotoFileID } from '../handler/chat';

export function isTelegramChatTypeGroup(type: string): boolean {
    return type === 'group' || type === 'supergroup';
}

// 群匿名管理员: message.from 是 fake bot, sender_chat 指向群本身
export function isAnonymousGroupSender(message: Telegram.Message): boolean {
    return !!message.from?.is_bot
        && !!message.sender_chat
        && message.sender_chat.id === message.chat.id;
}

// 代表某个 chat 发言 (匿名管理员 / 频道身份 / 关联频道自动转发)
// 真正的发言主体在 sender_chat,不在 from
export function isOnBehalfOfChat(message: Telegram.Message): boolean {
    return !!message.sender_chat;
}

type MsgType = 'text' | 'photo' | 'voice' | 'image' | 'audio' | 'document' | 'sticker' | 'video' | 'animation' | 'unknown' | 'unsupported';
export interface UnionData {
    type: MsgType;
    original_type?: MsgType;
    mime_type?: string;
    media_group_id?: string;
    text?: string;
    // reply_text?: string;
    id?: string[];
    url?: string[];
    raw?: Blob[];
}

export function extractMessageInfo(message: Telegram.Message, currentBotId: number): UnionData {
    const messageData = extractTypeFromMessage(message);

    if (messageData.type === 'text' && isNeedGetReplyMessage(message, currentBotId)) {
        const { type, id, mime_type, media_group_id } = extractTypeFromMessage(message.reply_to_message as any) || {};
        if (type && type !== 'text' && type !== 'unknown')
            messageData.type = type;
        if (id && id.length > 0)
            messageData.id = id;
        if (mime_type)
            messageData.mime_type = mime_type;
        if (media_group_id)
            messageData.media_group_id = media_group_id;
    }

    return messageData;
}

function extractTypeFromMessage(message: Telegram.Message): UnionData {
    const msgTypes: string[] = ['text', 'photo', 'voice', 'document', 'audio', 'animation', 'sticker', 'video'];
    const msgType = Object.keys(message).find(t => msgTypes.includes(t));
    const typeInfo = {
        type: msgType ?? 'unknown',
        original_type: msgType ?? 'unknown',
    } as UnionData;

    switch (msgType) {
        case 'text':
            return typeInfo;
        case 'photo':
        {
            const file_id = findPhotoFileID(message.photo as Telegram.PhotoSize[], ENV.TELEGRAM_PHOTO_SIZE_OFFSET);
            if (!file_id) {
                console.error('photo file_id not found', message);
            }
            return {
                type: msgType,
                original_type: 'photo',
                id: file_id ? [file_id] : undefined,
                media_group_id: message.media_group_id,
            };
        }
        case 'document':
        case 'audio':
        case 'voice':
        case 'animation':
        case 'sticker':
        case 'video':
        {
            // const MAX_FILE_SIZE = 20 * 1024 * 1024; // 能直接下载的文件大小为20MB
            // const fileSize = message[msgType]?.file_size;
            // if (fileSize && fileSize > MAX_FILE_SIZE) {
            //     throw new Error(`File size over limit: ${(fileSize / 1024 / 1024).toFixed(1)}MB\nThe maximum file size to download is 20 MB`);
            // }
            const id = message[msgType]?.file_id;
            if (!id) {
                throw new Error('file_id not found');
            }
            if (msgType === 'document') {
                const testSupport = message.document?.mime_type?.match(/(audio|image|text|video)/)?.[1];
                testSupport && (typeInfo.type = testSupport as UnionData['type']);
            }
            return {
                type: typeInfo.type,
                original_type: msgType,
                id: id ? [id] : undefined,
                media_group_id: message.media_group_id,
            };
        }
        default:
            return typeInfo;
    }
}

function isNeedGetReplyMessage(message: Telegram.Message, currentBotId: number) {
    const replyMsg = message.reply_to_message;
    return ENV.EXTRA_MESSAGE_CONTEXT && replyMsg && (replyMsg.from?.id !== currentBotId || replyMsg.photo || replyMsg.audio || replyMsg.document || replyMsg.video || replyMsg.voice);
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

export function chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export async function getTelegramFile(fileIds: string[], botToken: string, type: 'url' | 'blob' | 'base64' = 'url') {
    const api = createTelegramBotAPI(botToken);
    const files = await Promise.all(fileIds.map(id => api.getFileWithReturns({ file_id: id })));
    const errorFile = files.find(f => !f.ok) as unknown as Telegram.ResponseError | undefined;
    if (errorFile) {
        throw new Error(errorFile.description);
    }

    const paths = files.map(f => f.result?.file_path).filter(Boolean) as string[];
    log.info(`[getTelegramFile] raw file_path from Telegram API: ${JSON.stringify(paths)}`);
    const urls = paths.map(p => `https://api.telegram.org/file/bot${botToken}/${p}`);
    log.info(`files urls:\n${urls.join('\n')}`);

    switch (type) {
        case 'url':
            return urls;
        case 'blob':
            return await Promise.all(paths.map(p => fetch(`https://api.telegram.org/file/bot${botToken}/${p}`, {
            }).then(res => res.blob())));
        case 'base64':
            return await Promise.all(paths.map(p => fetch(`https://api.telegram.org/file/bot${botToken}/${p}`, {
            }).then(res => res.arrayBuffer()).then(buffer => Buffer.from(buffer).toString('base64'))));
    }
}

// export async function getStoreMediaIds(context: ShareContext, media_group_id: string | undefined): Promise<string[]> {
//     if (!media_group_id || !context.storeMediaMessageKey) {
//         return [];
//     }
//     const fileIds = JSON.parse(await ENV.DATABASE.get(context.storeMediaMessageKey) || '{}');
//     return fileIds[media_group_id] || [];
// }

export async function waitUntil(timestamp: number) {
    return new Promise(resolve => setTimeout(resolve, Math.max(0, timestamp - Date.now())));
}
