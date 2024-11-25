import type { ReadableStream as WebReadableStream } from 'node:stream/web';
import { Readable, Transform } from 'node:stream';

class Base64Encode extends Transform {
    private bufferCache = '';

    _transform(chunk: Buffer, encoding: string, callback: () => void) {
        this.bufferCache += chunk.toString('base64');
        callback();
    }

    _flush(callback: () => void) {
        if (this.bufferCache.length) {
            this.push(this.bufferCache);
        }
        callback();
    }
}

async function streamToBase64(audioUrl: string) {
    try {
        const response = await fetch(audioUrl);
        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.statusText}`);
        }

        return new Promise((resolve, reject) => {
            const base64EncodeStream = new Base64Encode();
            let base64Data = '';

            base64EncodeStream.on('data', chunk => base64Data += chunk);
            base64EncodeStream.on('end', () => resolve(base64Data));
            base64EncodeStream.on('error', reject);

            // 将 Web Stream 转换为 Node Stream
            Readable.fromWeb(response.body as unknown as WebReadableStream).pipe(base64EncodeStream);
        });
    } catch (error) {
        console.error('Error processing stream:', error);
        throw error;
    }
}

export { streamToBase64 };
