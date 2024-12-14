import { FFmpeg } from '@ffmpeg.wasm/main';

async function convertOgaToMp3(file: Blob | Response, target: 'base64' | 'blob' = 'base64') {
    const ffmpeg = await FFmpeg.create({ core: '@ffmpeg.wasm/core-st' });
    try {
        const uint8Array = new Uint8Array(await file.arrayBuffer());
        ffmpeg.fs.writeFile('input.oga', uint8Array);
        await ffmpeg.run('-i', 'input.oga', 'output.mp3');
        const output = ffmpeg.fs.readFile('output.mp3');
        return target === 'base64' ? uint8ArrayToBase64(output) : new Blob([output], { type: 'audio/mp3' });
    } catch (error) {
        console.error('Error in convertOgaToMp3:', error);
        throw error;
    } finally {
        ffmpeg.exit();
    }
}

function uint8ArrayToBase64(uint8Array: Uint8Array) {
    const binaryString = new TextDecoder().decode(uint8Array);
    return btoa(binaryString);
}

function base64ToBlob(base64File: string, format: 'oga' | 'mp3' = 'oga') {
    return new Blob([Buffer.from(base64File, 'base64')], { type: `audio/${format}` });
}

export { base64ToBlob, convertOgaToMp3 };
