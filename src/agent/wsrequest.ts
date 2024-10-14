import type { CompletionData } from './types';
import { AsyncIter } from './readable';
import { iterStream } from './request';

const perplexityExtractor = {
    contentExtractor: (data: any): string => {
        if (data.chunks && data.chunks.length > 0) {
            const chunk = data.chunks.at(-1) || '';
            return chunk;
        }
        return '';
    },
    fullContentExtractor: (data: any): string => {
        return `${data?.answer || ''}\n\n${perplexityExtractor.finalAdd(data)}`;
    },
    finalAdd: (data: any): string => {
        if (data.web_results && data.web_results.length > 0) {
            return `${data.web_results.map((r: Record<string, string>, i: number) => `${i + 1}. [${r.name}](${r.url})`).join('\n')}`;
        }
        return '';
    },
};

function perplexityFormatter(message: any[]): { done: boolean; content: any } {
    const [event, data] = message;
    switch (event) {
        case 'query_progress':
            if (data.text) {
                return {
                    done: data.final,
                    content: JSON.parse(data.text),
                };
            }
            return {
                done: false,
                content: '',
            };
        case 'error':
            return {
                done: true,
                content: '[ERROR] Occur error',
            };
        case 'disconnect':
        default:
            return {
                done: true,
                content: '',
            };
    }
}

export async function WssRequest(url: string, protocols: string | string[] | null, options: Record<string, any>, messages: string[], handlers: Record<string, any>): Promise<any> {
    const { WebSocket } = await import('ws');
    let { extractor, formatter, onStream } = handlers;
    return new Promise((resolve) => {
        const ws = protocols ? new WebSocket(url, protocols, options) : new WebSocket(url, options);
        let result: any = {};
        let streamSender: Promise<CompletionData>;

        extractor = extractor || perplexityExtractor;
        formatter = formatter || perplexityFormatter;
        let streamIter: AsyncIter<any> | null = null;
        if (onStream) {
            streamIter = new AsyncIter();
            streamSender = iterStream(null, streamIter as unknown as AsyncIterable<any>, extractor, onStream);
        }

        ws.on('open', () => {
            console.log('wss connected.');
        });

        ws.on('message', async (data) => {
            const message = data.toString('utf-8');
            if (message.startsWith('0')) {
                const handshake = JSON.parse(message.substring(1));
                console.log('Handshake received:', handshake);
                // send connection confirm message
                ws.send('40');
                // send custom event message
                for (const message of messages) {
                    ws.send(message);
                }
            } else if (message.startsWith('42')) {
                const parsedMsg = JSON.parse(message.substring(2));
                const extracted = perplexityFormatter(parsedMsg);
                // console.log('Received data:', parsedMsg);
                if (streamIter && !streamIter.isDone) {
                    streamIter.add(extracted);
                    // console.log('added:\n', extracted);
                }
                if (extracted.done) {
                    console.log('Stream done.');
                    result = extracted.content;
                    ws.close();
                }
            } else if (message.startsWith('3')) {
                // handle heartbeat message
                console.log('Heartbeat received');
            } else {
                console.log('Received non-data message:', message);
            }
        });

        ws.on('close', async () => {
            console.log('wss closed.');
            closeWss(resolve, result, streamIter, streamSender, extractor);
        });

        ws.on('error', async (e) => {
            console.error(e.message);
            if (streamIter) {
                streamIter.return();
            }
            result.message = `Error: ${e.message}`;
        });
    });
}

async function closeWss(resolve: any, result: any, streamIter: AsyncIter<any> | null, streamSender: Promise<CompletionData> | null, extractor: any) {
    let data = '';
    if (streamIter) {
        data = (await streamSender)?.content || '';
        data += `\n\n${extractor.finalAdd(result)}`;
        data += result.message ? `\n${result.message}` : '';
    } else {
        data = `${extractor.fullContentExtractor(result)}\n${result.message || ''}`;
    }

    console.log('Result:', data.trim());
    resolve(data.trim());
}