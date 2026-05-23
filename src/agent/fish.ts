import type { AgentUserConfig } from '../config/env';
import type { TTSAgent } from './types';
import { ENV } from '../config/env';
import { selectKey } from './key-manager';

export class FishTTS implements TTSAgent {
    readonly name = 'fish';
    readonly modelKey = 'FISH_TTS_MODEL';

    readonly enable = (context: AgentUserConfig): boolean => {
        return (context.FISH_TTS_MODEL !== '' || context.FISH_TTS_VOICE !== '') && context.FISH_API_KEY.length > 0;
    };

    model = (ctx: AgentUserConfig): string => {
        return ctx.FISH_TTS_MODEL;
    };

    readonly request = async (text: string, context: AgentUserConfig): Promise<Blob> => {
        const url = `${context.FISH_API_BASE}/tts`;
        const reference_id = ENV.FISH_REFERENCE_IDS[context.FISH_TTS_VOICE as keyof typeof ENV.FISH_REFERENCE_IDS] || context.FISH_TTS_VOICE || undefined;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${selectKey('fish', context.FISH_API_KEY) || ''}`,
                ...(reference_id && { model: context.FISH_TTS_MODEL }),
            },
            body: JSON.stringify({
                text,
                reference_id,
                format: 'opus',
                opus_bitrate: -1000,
                ...context.FISH_TTS_EXTRA_PARAMS,
            }),
        });
        if (resp.ok) {
            return resp.blob();
        } else {
            throw new Error(`${resp.status} ${resp.statusText}\n\n${await resp.text()}`);
        }
    };
}
