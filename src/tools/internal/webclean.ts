export interface PatternInfo {
    pattern: string;
    group?: number;
    cleanPattern?: string;
}

class HTMLTextProcessor {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    extractAndClean(patterns: PatternInfo[]): string {
        let results: string[] = [this.text];

        for (const { pattern, group = 0, cleanPattern } of patterns) {
            results = results.flatMap((text) => {
                const regex = new RegExp(pattern, 'g');
                const matches = Array.from(text.matchAll(regex));
                return matches.map((match) => {
                    let extractedText = match[group];
                    if (cleanPattern) {
                        const cleanRegex = new RegExp(cleanPattern, 'g');
                        extractedText = extractedText.replace(cleanRegex, '');
                    }
                    return extractedText.replace(/\s+/g, ' ').trim();
                });
            });
        }

        return results.join('\n');
    }
}

function processHtmlText(text: string, patterns: PatternInfo[]): string {
    const processor = new HTMLTextProcessor(text);
    return processor.extractAndClean(patterns);
}

export default processHtmlText;
