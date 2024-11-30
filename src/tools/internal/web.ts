import type { PatternInfo } from '../types';
import { log } from '../../log/logger';
import { interpolate } from '../../plugins/interpolate';

export function processHtmlText(patterns: PatternInfo[], text: string): string {
    let results: string[] = [text];
    for (const { pattern, group = 0, clean } of patterns) {
        results = results.flatMap((text) => {
            const regex = new RegExp(pattern, 'g');
            const matches = Array.from(text.matchAll(regex));
            return matches.map((match) => {
                let extractedText = match[group];
                if (clean) {
                    const cleanRegex = new RegExp(clean[0], 'g');
                    extractedText = extractedText.replace(cleanRegex, clean[1] ?? '');
                }
                return extractedText.replace(/\s+/g, ' ').trim();
            });
        });
    }
    return results.join('\n');
}

export interface WebCrawlerInfo {
    url: string;
    patterns?: PatternInfo[];
}

export async function webCrawler(webcrawler: WebCrawlerInfo, data: Record<string, any>) {
    let result: string | Record<string, any> = '';
    const url = interpolate(webcrawler.url, data);
    log.info(`webcrawler url: ${url}`);
    const resp = await fetch(url).then(r => r.text());
    result = {
        result: processHtmlText(webcrawler.patterns || [], resp),
        source: url,
    };
    return result;
}
