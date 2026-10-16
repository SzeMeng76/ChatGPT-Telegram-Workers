import { afterEach, describe, expect, it, vi } from 'vitest';
// 先加载 env,避免 openailike -> log -> env -> agent/index 的循环导入导致 OpenAILike 未定义
import '../config/env';
import { assertSafeDownloadUrl, downloadImage } from '../utils/image/download';
import { renderOpenAILikeImage } from './openailike';

const imageBytes = new Uint8Array([137, 80, 78, 71]);
const imageUrl = 'https://cdn.example.com/image.png';

function apiResponse(data: unknown[]): Response {
    return Response.json({ data });
}

async function blobBytes(blob: Blob): Promise<number[]> {
    return Array.from(new Uint8Array(await blob.arrayBuffer()));
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe('renderOpenAILikeImage', () => {
    it('returns URLs untouched for URL-only responses without downloading', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch');
        const result = await renderOpenAILikeImage(apiResponse([{ url: imageUrl }, { url: `${imageUrl}?2` }]), 'p');
        expect(result.url).toEqual([imageUrl, `${imageUrl}?2`]);
        expect(result.raw).toBeUndefined();
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('converts base64-only responses to blobs', async () => {
        const result = await renderOpenAILikeImage(apiResponse([{ b64_json: 'AQID' }, { b64_json: 'BAUG', url: null }]), 'p');
        expect(result.url).toBeUndefined();
        expect(await Promise.all(result.raw!.map(blobBytes))).toEqual([[1, 2, 3], [4, 5, 6]]);
    });

    it('preserves order in mixed responses and prefers base64 when both fields exist', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => new Response(imageBytes));
        const result = await renderOpenAILikeImage(apiResponse([
            { url: imageUrl },
            { b64_json: 'AQID', url: 'https://cdn.example.com/unused.png' },
            { b64_json: 'BAUG', url: null },
        ]), 'p');
        expect(await Promise.all(result.raw!.map(blobBytes))).toEqual([
            Array.from(imageBytes),
            [1, 2, 3],
            [4, 5, 6],
        ]);
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toBe(imageUrl);
    });

    it('treats a first item with both fields as base64 even if later items are URLs', async () => {
        vi.spyOn(globalThis, 'fetch').mockImplementation(async () => new Response(imageBytes));
        const result = await renderOpenAILikeImage(apiResponse([{ b64_json: 'AQID', url: imageUrl }, { url: imageUrl }]), 'p');
        expect(await Promise.all(result.raw!.map(blobBytes))).toEqual([[1, 2, 3], Array.from(imageBytes)]);
    });

    it('rejects items with neither b64_json nor url', async () => {
        await expect(renderOpenAILikeImage(apiResponse([{}]), 'p')).rejects.toThrow('Expected b64_json or url');
        await expect(renderOpenAILikeImage(apiResponse([{ b64_json: null, url: null }]), 'p')).rejects.toThrow('Expected b64_json or url');
    });

    it('rejects private download URLs without fetching them', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch');
        await expect(renderOpenAILikeImage(apiResponse([{ b64_json: 'AQID' }, { url: 'http://127.0.0.1/a.png' }]), 'p')).rejects.toThrow('not allowed');
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('allows URLs on the configured API origin (self-hosted)', async () => {
        vi.spyOn(globalThis, 'fetch').mockImplementation(async () => new Response(imageBytes));
        const result = await renderOpenAILikeImage(
            apiResponse([{ b64_json: 'AQID' }, { url: 'http://127.0.0.1:8000/a.png' }]),
            'p',
            'http://127.0.0.1:8000/v1',
        );
        expect(result.raw).toHaveLength(2);
    });

    it('still blocks private hosts that are not the configured origin', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch');
        await expect(renderOpenAILikeImage(
            apiResponse([{ b64_json: 'AQID' }, { url: 'http://127.0.0.1:9999/a.png' }]),
            'p',
            'http://127.0.0.1:8000/v1',
        )).rejects.toThrow('not allowed');
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('propagates API errors', async () => {
        await expect(renderOpenAILikeImage(Response.json({ error: { message: 'boom' } }), 'p')).rejects.toThrow('boom');
    });
});

describe('downloadImage', () => {
    it('sends no credentials and follows safe redirects', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch')
            .mockResolvedValueOnce(new Response(null, { status: 302, headers: { location: 'https://cdn2.example.com/final.png' } }))
            .mockResolvedValueOnce(new Response(imageBytes));
        const blob = await downloadImage(imageUrl);
        expect(await blobBytes(blob)).toEqual(Array.from(imageBytes));
        expect(fetchMock).toHaveBeenCalledTimes(2);
        for (const call of fetchMock.mock.calls) {
            expect((call[1] as RequestInit).headers).toBeUndefined();
            expect((call[1] as RequestInit).redirect).toBe('manual');
        }
    });

    it('rejects redirects to private addresses before requesting them', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch')
            .mockResolvedValueOnce(new Response(null, { status: 302, headers: { location: 'http://169.254.169.254/latest/meta-data' } }));
        await expect(downloadImage(imageUrl)).rejects.toThrow('not allowed');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('fails on non-ok responses without leaking the query string', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('nope', { status: 404, statusText: 'Not Found' }));
        const error = await downloadImage(`${imageUrl}?sig=secret`).then(() => new Error('unexpected success'), (e: Error) => e);
        expect(error.message).toContain('404');
        expect(error.message).not.toContain('secret');
    });

    it('rejects oversized images', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(imageBytes, { headers: { 'content-length': '999' } }));
        await expect(downloadImage(imageUrl, { maxBytes: 10 })).rejects.toThrow('too large');
    });

    it('stops after too many redirects', async () => {
        vi.spyOn(globalThis, 'fetch').mockImplementation(async () => new Response(null, { status: 302, headers: { location: imageUrl } }));
        await expect(downloadImage(imageUrl)).rejects.toThrow('Too many redirects');
    });
});

describe('assertSafeDownloadUrl', () => {
    it.each([
        'http://localhost/a.png',
        'http://foo.localhost/a.png',
        'http://printer.local/a.png',
        'http://10.0.0.1/a.png',
        'http://172.16.5.5/a.png',
        'http://192.168.1.1/a.png',
        'http://169.254.169.254/a.png',
        'http://100.64.0.1/a.png',
        'http://[::1]/a.png',
        'http://[fe80::1]/a.png',
        'http://[fd00::1]/a.png',
        'http://[::ffff:127.0.0.1]/a.png',
        'http://[64:ff9b::169.254.169.254]/a.png',
        'ftp://example.com/a.png',
        'file:///etc/passwd',
        'not a url',
    ])('blocks %s', (url) => {
        expect(() => assertSafeDownloadUrl(url)).toThrow();
    });

    it.each([
        'https://cdn.example.com/a.png',
        'http://8.8.8.8/a.png',
        'https://[2606:4700::1111]/a.png',
    ])('allows %s', (url) => {
        expect(() => assertSafeDownloadUrl(url)).not.toThrow();
    });
});
