import type { PatternInfo } from '../types';
import { log } from '../../log/logger';
import { interpolate } from '../../plugins/interpolate';

export function processHtmlText(patterns: PatternInfo[], text: string): string {
    let results: string[] = [text];
    for (const { pattern = '', group = 0, clean = [] } of patterns) {
        results = results.flatMap((text) => {
            let matches = [[text]];
            if (pattern) {
                const regex = new RegExp(pattern, 'gi');
                matches = Array.from(text.matchAll(regex));
            }

            const cleanRegex = clean.filter(Boolean).map(c => (
                { reg: new RegExp(Array.isArray(c) ? c[0] : c, 'g'), replacer: Array.isArray(c) ? c[1] ?? '' : '' }));
            return matches.map((match) => {
                let extractedText = match[group];
                for (const c of cleanRegex) {
                    extractedText = extractedText.replace(c.reg, c.replacer);
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
