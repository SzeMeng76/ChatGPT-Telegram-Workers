/* eslint-disable regexp/no-super-linear-backtracking */
const escapeChars = /[_*[\]()\\~`>#+\-=|{}.!?]/g;
export const SEGMENTATION_MARK = '//SEGMENTATIONMARK//';
export const escapedChars = {
    '\\*': 'ESCAPEASTERISK',
    '\\_': 'ESCAPEUNDERSCORE',
    '\\~': 'ESCAPETILDE',
    '\\|': 'ESCAPEPIP',
    '\\`': 'ESCAPEBACKTICK',
    '\\\\': 'ESCAPEBACKSLASH',
    '\\(': 'ESCAPELEFTPARENTHESIS',
    '\\)': 'ESCAPERIGHTPARENTHESIS',
    '\\[': 'ESCAPELEFTBRACKET',
    '\\]': 'ESCAPERIGHTBRACKET',
    '\\{': 'ESCAPELEFTBRACE',
    '\\}': 'ESCAPERIGHTBRACE',
    '\\>': 'ESCAPEGREATERTHAN',
    '\\#': 'ESCAPEHASH',
    '\\+': 'ESCAPEPLUS',
    '\\-': 'ESCAPEMINUS',
    '\\=': 'ESCAPEEQUAL',
    '\\.': 'ESCAPEDOT',
    '\\!': 'ESCAPEEXCLAMATION',
    '\\?': 'ESCAPEQUESTION',
};
export const escapedRegexp = /\\[*_~|`\\()[\]{}>#+\-=.!?]/g;
const reverseCodeRegexp = /\\`\\`\\`([\s\S]+?)\\`\\`\\`/g;
const inlineCodeRegexp = /(?<!\\)`(?:[^`\n]|\\`)*?(?<!\\)`/g;
// Match markdown links before escaping - raw format [text](url)
const linkRegexp = /\[([^\]\n]+?)\]\(([^)]+)\)/g;
const escapeRegexpMatch = [
    // bold & italic
    {
        regex: /(\\\*\\\*\\\*)(\S|\S[^\n]*?\S)\1/g,
        value: '*_$2_*',
    },
    // bold
    {
        regex: /(\\\*\\\*)(\S|\S[^\n]*?\S)\1/g,
        value: '*$2*',
    },
    // underline
    {
        regex: /\\_\\_(\S|\S[^\n]*?\S)\\_\\_/g,
        value: '__$1__',
    },
    // italic
    {
        regex: /\\(_|\*)(\S|\S[^\n]*?\S)\\\1/g,
        value: '_$2_',
    },
    // strikethrough
    {
        regex: /\\~(\S|\S[^\n]*?\S)\\~/g,
        value: '~$1~',
    },
    // spoiler
    {
        regex: /\\\|\\\|(\S|\S[^\n]*?\S)\\\|\\\|/g,
        value: '||$1||',
    },
    // url
    // {
    //     regex: /\\\[([^\n]+)\\\]\\\((.+?)\\\)/g,
    //     value: '[$1]($2)',
    // },
    // quote
    {
        regex: /^(\x20*(?:\\\*\\\*)?)\\>\x20?([^\n]*)$/gm,
        value: '$1>$2',
    },
    // item
    {
        regex: /^(>?\x20*)\\(?:-|\*)\s+([^\n]*)$/gm,
        value: '$1•\x20$2',
    },
    // number sign
    {
        regex: /^(>?\x20*(?:\\#){1,6})\x20+([^\n]+)$/gm,
        value: '$1\x20*$2*',
    },
];

export const escapedCharsReverseMap = new Map(Object.entries(escapedChars).map(([key, value]) => [value, key]));

/**
 * Validate and fix nested formatting issues
 * Prevents invalid combinations like **_text_** which should be ***text***
 */
function normalizeNestedFormatting(text: string): string {
    // Fix **_text_** -> ***text***
    text = text.replace(/\*\*_([^_]+)_\*\*/g, '***$1***');
    // Fix __*text*__ -> ___text___
    text = text.replace(/__\*([^*]+)\*__/g, '___$1___');
    // Fix *_text_* -> _text_ (prefer single underscore for italic)
    text = text.replace(/\*_([^_]+)_\*/g, '_$1_');
    return text;
}

export function escape(text: string, expandParams: ExpandParams = { addQuote: false, quoteExpandable: false }): string {
    // Normalize nested formatting before processing
    text = normalizeNestedFormatting(text);

    const lines = text.split('\n');
    const codeStack: number[] = [];
    const result: string[] = [];
    let lineTrim = '';
    // let modifiedLine = '';
    let textStartIndex = 0;

    for (const [i, line] of lines.entries()) {
        lineTrim = line.trim();
        let startIndex: number | undefined;
        // if line starts with ```xx, push current line index to codeStack
        if (/^>?```.+/.test(lineTrim)) {
            codeStack.push(i);
            if (textStartIndex < i) {
                result.push(handleEscape(lines.slice(textStartIndex, i).join('\n'), 'text', expandParams));
            }
        } else if (/^>?```$/.test(lineTrim)) {
            // if line is ```, and codeStack is not empty, pop last element from codeStack
            if (codeStack.length > 0) {
                startIndex = codeStack.pop();
                // if codeStack is empty now, push content to result and handle code escape
                if (codeStack.length === 0) {
                    const content = lines.slice(startIndex, i + 1).join('\n');
                    result.push(handleEscape(content, 'code', expandParams));
                    textStartIndex = i + 1;
                }
            } else {
                // code start
                codeStack.push(i);
                if (textStartIndex < i) {
                    result.push(handleEscape(lines.slice(textStartIndex, i).join('\n'), 'text', expandParams));
                }
            }
        }
    }
    // if (codeStack.length > 0) {
    //     const last = `${lines.slice(codeStack[0]).join('\n')}\n\`\`\``;
    //     result.push(handleEscape(last, 'code', expandParams));
    if (codeStack.length === 0 && textStartIndex < lines.length) {
        result.push(handleEscape(lines.slice(textStartIndex).join('\n'), 'text', expandParams));
    }
    return addExpandable(result.join('\n'), expandParams.quoteExpandable);
}

function handleEscape(text: string, type: 'text' | 'code', { addQuote }: ExpandParams): string {
    if (!text.trim()) {
        return text;
    }
    text = text.replace(escapedRegexp, match => escapedChars[match as keyof typeof escapedChars]);
    if (type === 'text') {
        const markd: Record<string, string> = {};
        // Extract inline code first
        text = markData(text, markd, 'INCODE').text;
        // Extract links BEFORE escaping to preserve [text](url) format
        text = markData(text, markd, 'LINK').text;
        // Now escape special characters (links are already extracted as placeholders)
        text = text.replace(escapeChars, match => `\\${match}`);

        escapeRegexpMatch.forEach(item => text = text.replace(item.regex, item.value));
        Object.entries(markd).forEach(([key, value]) => {
            text = text.replace(key, value);
        });
    } else {
        // 清理代码块前多余空白符
        const codeBlank = text.length - text.trimStart().length;
        if (codeBlank > 0) {
            const blankReg = new RegExp(`^\\s{${codeBlank}}`, 'gm');
            text = text.replace(blankReg, '');
        }
        // 非引用代码块
        if ((!addQuote && !text.trimStart().startsWith('>'))) {
            text = text
                .trimEnd()
                .replace(/([\\`])/g, '\\$1')
                .replace(reverseCodeRegexp, '```$1```'); // code block
        } else {
            text = text.replace(escapeChars, match => `\\${match}`).replace(/^\\>/gm, '>');
        }
    }
    text = quoteMessage(text, addQuote);
    return text.replace(
        new RegExp(Object.values(escapedChars).join('|'), 'g'),
        match => escapedCharsReverseMap.get(match) ?? match,
    );
}
export function chunkDocument(text: string, chunkSize: number = 4000): string[] {
    const cleanText = text.trim();
    const textList = lineSegment(cleanText);
    const chunks: string[][] = [[]];
    let chunkIndex = 0;
    const codeStack: string[] = [];
    for (const line of textList) {
        if (chunks[chunkIndex].join('\n').length + line.length > chunkSize) {
            chunkIndex++;
            chunks.push([]);
            if (codeStack.length > 0) {
                // 存在末尾行为代码块起始导致分块异常，已存在冗余长度故不在处理
                // // 如果插入结尾标记后超出长度限制
                // if (chunks[chunkIndex - 1].join('\n').length + codeStack.length * 4 >= chunkSize) {
                //     // 将上一个块中的末尾数据插入到新块开头
                //     chunks[chunkIndex].push(...chunks[chunkIndex - 1].slice(-codeStack.length));
                //     // 将上一个块中的末尾行取出
                //     chunks[chunkIndex - 1].length -= codeStack.length;
                // }

                const lastLineIsCodeStart = chunks[chunkIndex - 1].at(-1)?.trimStart()?.startsWith('```');
                lastLineIsCodeStart && chunks[chunkIndex - 1].pop();
                // 插入结尾标记
                chunks[chunkIndex - 1].push(...Array.from({ length: lastLineIsCodeStart ? codeStack.length - 1 : codeStack.length }, () => '```'));

                if (line.trim() === '```') {
                    codeStack.pop();
                    // 插入开头标记
                    chunks[chunkIndex].unshift(...codeStack);
                    continue;
                }
                // 插入开头标记
                chunks[chunkIndex].unshift(...codeStack);
                // 存在冗余, 不考虑以下情况: 新块代码行加line超出限制
                // if (chunks[chunkIndex].join('\n').length + line.length > chunkSize) {
                // // 插入结尾标记
                //     chunks[chunkIndex].push(...Array.from({ length: codeStack.length }).fill('```') as string[]);
                //     // 插入开头标记
                //     chunkIndex++;
                //     chunks[chunkIndex] = codeStack;
                // }
            }

            chunks[chunkIndex].push(line);
            continue;
        }
        if (/^```.+/.test(line.trimStart())) {
            codeStack.push(line);
        } else if (line.trim() === '```') {
            if (codeStack.length) {
                codeStack.pop();
            } else {
                codeStack.push(line);
            }
        }

        chunks[chunkIndex].push(line);
    }
    if (codeStack.length) {
        chunks[chunkIndex].push(...Array.from({ length: codeStack.length }).fill('```') as string[]);
    }
    return chunks.map(c => c.join('\n'));
}

function lineSegment(text: string, chunkSize: number = 4000): string[] {
    const chunkText = (text: string) => {
        const chunks: string[] = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            // add quote
            const isNeedAddQuote = i > 0 && text.trimStart().startsWith('>');
            chunks.push((isNeedAddQuote ? '>' : '') + text.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const newLines: string[] = [];
    const lines = text.split('\n');
    for (const line of lines) {
        if (line.length > chunkSize) {
            newLines.push(...chunkText(line));
            continue;
        }
        newLines.push(line);
    }
    return newLines;
}

function markData(text: string, markd: Record<string, string>, type: 'INCODE' | 'LINK' = 'INCODE') {
    const isIncode = type === 'INCODE';
    const matches = text.matchAll(isIncode ? inlineCodeRegexp : linkRegexp);
    let i = 0;
    for (const match of matches) {
        if (isIncode) {
            markd[`${type} ${i}`] = match[0];
        } else {
            // For links: don't escape the link text, only escape ) and \ in URL
            const linkText = match[1];
            const url = match[2].replace(/([)\\])/g, '\\$1');
            markd[`${type} ${i}`] = `[${linkText}](${url})`;
        }
        text = text.replace(match[0], `${type} ${i}`);
        i++;
    }
    return {
        text,
        markd,
    };
}

export function addExpandable(text: string, quoteExpandable: boolean): string {
    // Match all quote blocks (multi-line blocks starting with > or **>)
    return text.replace(/^((?:\*\*)?>[^\n]*(?:\n>[^\n]*)*)(\n|$)/gm, (match, content, lineEnd) => {
        // Check if this block already starts with **>
        const isExpandable = content.trimStart().startsWith('**>');

        // If block is already expandable (has **>), or if quoteExpandable is true, ensure it has ||
        if (isExpandable || quoteExpandable) {
            // Check if already has || at the end
            if (content.trimEnd().endsWith('||')) {
                return match; // Already properly formatted
            }

            // Add || marker
            if (isExpandable) {
                // Already has **, just add ||
                return `${content.trimEnd()}||${lineEnd}`;
            } else {
                // Add both ** and ||
                return `**${content.trimEnd()}||${lineEnd}`;
            }
        }

        // Not expandable, return as-is
        return match;
    });
}

export interface ExpandParams {
    addQuote: boolean;
    quoteExpandable: boolean;
}

function quoteMessage(text: string, addQuote: boolean) {
    // 不添加引用时，若下一行不为引用，则删除分隔符与换行符 否则只删除分隔符
    if (!addQuote) {
        return text.replace(new RegExp(`^${SEGMENTATION_MARK}(?:\n([^>]))?`, 'gm'), '$1');
    }
    const textList = text.split('\n');
    textList.forEach((line, index) => {
        if (line === SEGMENTATION_MARK) {
            textList[index] = '';
        } else {
            !line.startsWith('>') && (textList[index] = `>${line}`);
        }
    });
    return textList.join('\n');
}

/**
 * 将内部使用的 MarkdownV2 风格文本（单个 \n 视为硬换行）转换为标准 GFM 语义
 * （单个 \n 是软换行，会被渲染器合并为空格），供 Rich Message 的 markdown 字段使用。
 * - 引用块（连续 > 开头的行）内部每行间插入单独的 ">" 行，强制 GFM 渲染为独立行
 * - 非引用块的单个换行转为空行，形成独立段落
 * - SEGMENTATION_MARK 转换为分段边界（空行），结束引用块或段落
 */
export function toRichMarkdown(text: string): string {
    const lines = text.split('\n');
    const result: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === SEGMENTATION_MARK) {
            // 分隔标记转为空行(段落/引用块边界)
            if (result.length > 0 && result.at(-1) !== '') {
                result.push('');
            }
            continue;
        }
        result.push(line);
        const nextLine = lines[i + 1];
        if (nextLine === undefined || nextLine === '' || nextLine === SEGMENTATION_MARK) {
            // 已到末尾/空行/标记,不插入任何分隔
            continue;
        }
        const isQuoteLine = /^\*{0,2}>/.test(line);
        const nextIsQuoteLine = /^\*{0,2}>/.test(nextLine);
        if (isQuoteLine && nextIsQuoteLine) {
            // 引用行→引用行: 插入单独的 ">" 行,强制 GFM 视为独立行而非软换行合并
            result.push('>');
        } else if (isQuoteLine && !nextIsQuoteLine) {
            // 引用行→普通行: 插入空行结束引用块
            result.push('');
        } else if (!isQuoteLine && nextIsQuoteLine) {
            // 普通行→引用行: 插入空行开始新引用块
            result.push('');
        } else {
            // 普通行→普通行: 插入空行分段
            result.push('');
        }
    }
    let output = result.join('\n');

    // Convert expandable blockquote syntax (**>...||) to HTML <details> for Rich Message
    output = convertExpandableBlockquoteToDetails(output);

    return output;
}

/**
 * Convert MarkdownV2 expandable blockquote syntax (**>...||) to Rich Message <details> tag
 */
function convertExpandableBlockquoteToDetails(text: string): string {
    // Match expandable blockquote blocks: **>...||
    const expandablePattern = /\*\*>((?:[^\n]*\n)*?[^\n]*?)\|\|/gm;

    return text.replace(expandablePattern, (match, content) => {
        // Extract lines and remove leading '>'
        const lines = content.split('\n')
            .map((line: string) => line.replace(/^>?\s*/, '').trim())
            .filter((line: string) => line !== '');

        if (lines.length === 0) {
            return ''; // Empty block
        }

        // First line = summary, rest = details content
        const firstLine = lines[0];
        const restLines = lines.slice(1);

        if (restLines.length > 0) {
            return `<details><summary>${firstLine}</summary>\n\n${restLines.join('\n')}\n\n</details>`;
        } else {
            // Only summary, no content - return as plain blockquote instead
            // This avoids RICH_MESSAGE_EMPTY error for short messages
            return `>${firstLine}`;
        }
    });
}

