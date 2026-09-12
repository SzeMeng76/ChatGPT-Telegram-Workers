import type { AgentUserConfig } from '../../config/types';
import { applyVerdict, classifyApiError, markKeySuccess, selectKey } from '../../agent/key-manager';

export default {
    schema: {
        name: 'google_lyria',
        description: 'Google Lyria music generation tool. Generate high-quality 44.1kHz stereo music from text prompts, optionally guided by up to 10 images. Supports two models: Clip (lyria-3-clip-preview, always 30s) and Lyria 3.5 (lyria-3.5, full-length songs with verses, choruses, bridges).',
        parameters: {
            type: 'object',
            required: ['prompt'],
            properties: {
                prompt: {
                    type: 'string',
                    description: 'The text prompt to generate music from. Be specific: include genre, instruments, BPM, key, mood, structure tags like [Verse], [Chorus], [Bridge], and timestamps like [0:00-0:10]. For custom lyrics, prefix with "Lyrics:" and use section tags. Add "Instrumental only, no vocals" for instrumental tracks.',
                },
                model: {
                    type: 'string',
                    description: 'The Lyria model to use. lyria-3-clip-preview always generates a 30-second clip; lyria-3.5 generates full-length songs (a couple of minutes, controllable via prompt).',
                    enum: ['lyria-3-clip-preview', 'lyria-3.5'],
                    default: 'lyria-3-clip-preview',
                },
                language: {
                    type: 'string',
                    description: 'Language for lyrics generation. The model generates lyrics in the language of your prompt. Examples: "en" for English, "fr" for French, "zh" for Chinese.',
                    default: 'en',
                },
                images: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional. Up to 10 images (URLs or base64-encoded JPEG data) to guide music generation based on their mood and visual content.',
                },
                outputFormat: {
                    type: 'string',
                    description: 'Audio output format. Defaults to MP3.',
                    enum: ['mp3', 'wav'],
                    default: 'mp3',
                },
            },
        },
    },
    func: generateMusic,
    send_type: 'message',
};

async function generateMusic({
    prompt,
    model = 'lyria-3-clip-preview',
    language = 'en',
    images,
    outputFormat = 'mp3',
}: {
    prompt: string;
    model: string;
    language: string;
    images?: string[];
    outputFormat?: string;
}, _env: Record<string, any>, config: AgentUserConfig) {
    const apiKey = selectKey('google', config.GOOGLE_API_KEY) || '';
    const url = `${config.GOOGLE_API_BASE}/models/${model}:generateContent?key=${apiKey}`;

    // Add language hint to prompt if not English
    let finalPrompt = prompt;
    if (language !== 'en') {
        const languageHints: Record<string, string> = {
            'fr': 'Crée une chanson en français. ',
            'es': 'Crea una canción en español. ',
            'de': 'Erstelle ein Lied auf Deutsch. ',
            'it': 'Crea una canzone in italiano. ',
            'zh': '创作一首中文歌曲。',
            'ja': '日本語で曲を作成してください。',
            'ko': '한국어로 노래를 만들어주세요. ',
        };
        const hint = languageHints[language] || '';
        finalPrompt = hint + prompt;
    }

    const parts: Array<Record<string, any>> = [{ text: finalPrompt }];
    if (images && images.length > 0) {
        for (const image of images.slice(0, 10)) {
            const isUri = image.startsWith('http');
            parts.push({
                [isUri ? 'fileData' : 'inlineData']: {
                    mimeType: 'image/jpeg',
                    [isUri ? 'fileUri' : 'data']: image,
                },
            });
        }
    }

    const generationConfig: Record<string, any> = {
        responseModalities: ['AUDIO', 'TEXT'],
    };
    if (outputFormat === 'wav') {
        generationConfig.responseFormat = { audio: { mimeType: 'audio/wav' } };
    }

    const requestBody = {
        contents: [{ parts }],
        generationConfig,
    };

    console.log('=== Google Lyria Request ===');
    console.log('Model:', model);
    console.log('Language:', language);
    console.log('Images:', images?.length || 0);
    console.log('Output format:', outputFormat);
    console.log('Prompt:', finalPrompt);
    console.log('=============================');

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!resp.ok) {
        const detail = await resp.json();
        applyVerdict('google', apiKey, classifyApiError({
            statusCode: resp.status,
            responseBody: JSON.stringify(detail),
            provider: 'google',
        }));
        console.error(`Google Lyria generation failed: ${detail.error?.message || 'Unknown error'}`);
        return {
            content: [{
                type: 'text',
                text: `Google Lyria generation failed: ${detail.error?.message || 'Unknown error'}`
            }],
        };
    }

    const result = await resp.json();
    markKeySuccess('google', apiKey);
    console.log('Lyria response received');

    // Parse the response
    const lyrics: string[] = [];
    let audioData: string | null = null;
    let mimeType = outputFormat === 'wav' ? 'audio/wav' : 'audio/mpeg';

    for (const candidate of result.candidates || []) {
        for (const part of candidate.content?.parts || []) {
            if (part.text) {
                lyrics.push(part.text);
            } else if (part.inlineData) {
                audioData = part.inlineData.data;
                mimeType = part.inlineData.mimeType || 'audio/mpeg';
            }
        }
    }

    const content: any[] = [];

    // Add lyrics if available
    if (lyrics.length > 0) {
        content.push({
            type: 'text',
            text: `🎵 Generated Music\n\nLyrics/Structure:\n${lyrics.join('\n\n')}`,
        });
    }

    // Add audio if available
    if (audioData) {
        content.push({
            type: 'audio',
            data_type: 'base64',
            data: audioData,
            mimeType,
        });
        console.log(`Generated ${model === 'lyria-3-clip-preview' ? '30-second clip' : 'full-length song'} (${mimeType}) with ${lyrics.length > 0 ? 'lyrics' : 'instrumental only'}`);
    } else {
        content.push({
            type: 'text',
            text: 'Error: No audio data generated',
        });
    }

    return { content };
}
