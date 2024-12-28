/* eslint-disable regexp/no-super-linear-backtracking */
const escapeChars = /[_*[\]()\\~`>#+\-=|{}.!]/g;
const escapedChars = {
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
const escapedRegexp = /\\[*_~|`\\()[\]{}>#+\-=.!]/g;
const logRegexp = /^>?LOGSTART\\>([\s\S]*?)LOGEND$/m;
const reverseCodeRegexp = /\\`\\`\\`([\s\S]+)\\`\\`\\`$/g;
const inlineCodeRegexp = /`[^\n]*?`/g;
const linkRegexp = /\\\[([^\n]+?)\\\]\\\((.+?)\\\)/g;
const escapeRegexpMatch = [
    // bold
    {
        regex: /\\\*\\\*(\S|\S[^\n]*?\S)\\\*\\\*/g,
        value: '*$1*',
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
        regex: /^ *\\> *([^\n]*)$/gm,
        value: '>$1',
    },
    // item
    {
        regex: /^(>? *)\\(?:-|\*)\s+([^\n]*)$/gm,
        value: '$1• $2',
    },
    // number sign
    {
        regex: /^((?:\\#){1,6} )([^\n]+)$/g,
        value: '$1*$2*',
    },
];

const escapedCharsReverseMap = new Map(Object.entries(escapedChars).map(([key, value]) => [value, key]));

export function escape(text: string, expandParams: ExpandParams = { addQuote: false, quoteExpandable: false }): string {
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
        if (/^```.+/.test(lineTrim)) {
            codeStack.push(i);
            if (textStartIndex < i) {
                result.push(handleEscape(lines.slice(textStartIndex, i).join('\n'), 'text', expandParams));
            }
        } else if (lineTrim === '```') {
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
    if (codeStack.length > 0) {
        const last = `${lines.slice(codeStack[0]).join('\n')}\n\`\`\``;
        result.push(handleEscape(last, 'code', expandParams));
    } else if (textStartIndex < lines.length) {
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
        text = markData(text, markd).text;
        text = text.replace(escapeChars, match => `\\${match}`);
        text = markData(text, markd, 'LINK').text;

        escapeRegexpMatch.forEach(item => text = text.replace(item.regex, item.value));
        Object.entries(markd).forEach(([key, value]) => {
            text = text.replace(key, value);
        });
    } else if (!addQuote) {
        const codeBlank = text.length - text.trimStart().length;
        if (codeBlank > 0) {
            const blankReg = new RegExp(`^\\s{${codeBlank}}`, 'gm');
            text = text.replace(blankReg, '');
        }
        text = text
            .trimEnd()
            .replace(/([\\`])/g, '\\$1')
            .replace(reverseCodeRegexp, '```$1```'); // code block
    } else {
        text = text.replace(escapeChars, match => `\\${match}`);
    }
    text = quoteMessage(text, addQuote);
    return text.replace(
        new RegExp(Object.values(escapedChars).join('|'), 'g'),
        match => escapedCharsReverseMap.get(match) ?? match,
    );
}
export function chunkDocument(text: string, chunkSize: number = 4000): string[] {
    const cleanText = text.replace(/\n\s+\n/g, '\n\n');
    const textList = lineSegment(cleanText);
    const chunks: string[][] = [[]];
    let chunkIndex = 0;
    const codeStack: string[] = [];
    for (const line of textList) {
        if (chunks[chunkIndex].join('\n').length + line.length > chunkSize) {
            chunkIndex++;
            chunks.push([]);
            if (codeStack.length > 0) {
                // 如果插入结尾标记后超出长度限制
                if (chunks[chunkIndex - 1].join('\n').length + codeStack.length * 4 >= chunkSize) {
                    // 将上一个块中的末尾数据插入到新块开头
                    chunks[chunkIndex].push(...chunks[chunkIndex - 1].slice(-codeStack.length));
                    // 将上一个块中的末尾行取出
                    chunks[chunkIndex - 1].length -= codeStack.length;
                }
                // 插入结尾标记
                chunks[chunkIndex - 1].push(...Array.from({ length: codeStack.length }).fill('```') as string[]);
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
    const isincode = type === 'INCODE';
    const matches = text.matchAll(isincode ? inlineCodeRegexp : linkRegexp);
    let i = 0;
    for (const match of matches) {
        markd[`${type} ${i}`] = isincode ? match[0] : `[${match[1]}](${match[2]})`;
        text = text.replace(match[0], `${type} ${i}`);
        i++;
    }
    return {
        text,
        markd,
    };
}

export function addExpandable(text: string, quoteExpandable: boolean): string {
    if (!quoteExpandable) {
        // replace log data to expandable
        // can't replace log data directly, because there may be other quote marks after the log data, tg doesn't allow expandable quote to be continuous quote
        text = text.replace(/^>?LOGSTART\\>([\s\S]*?)LOGEND((?:\n>[^\n]*)*)$/m, `**>$1$2||`);
        // maybe split by log start and log end
        text = text.replace(/^(>?)LOGSTART/m, '$1').replace(/LOGEND$/m, '');
        return text;
    }
    // replace log data to expandable
    text = text.replace(logRegexp, `>$1`);
    text = text
        // fold quote
        // .replace(/((?:^>[^\n]+(?:\n|$))+)/gm, (match, p1) => `**${p1.trimEnd()}||\n`)
        .replace(/(?:^>[^\n]*(\n|$))+/gm, (match, p1) => `**${match.trimEnd()}||${p1}`);
    // maybe split by log start and log end
    text = text.replace(/^(>?)LOGSTART/m, '$1').replace(/LOGEND$/m, '');
    return text;
}

export interface ExpandParams {
    addQuote: boolean;
    quoteExpandable: boolean;
}

function quoteMessage(text: string, addQuote: boolean) {
    if (!addQuote) {
        return text;
    }
    const textList = text.split('\n');
    textList.forEach((line, index) => {
        if (!line.trimStart().startsWith('>')) {
            textList[index] = `>${line}`;
        }
    });
    return textList.join('\n');
}
