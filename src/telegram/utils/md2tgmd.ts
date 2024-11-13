/* eslint-disable regexp/no-super-linear-backtracking */
const escapeChars = /([_*[\]()\\~`>#+\-=|{}.!])/g;
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
const escapedCharsReverseMap = new Map(Object.entries(escapedChars).map(([key, value]) => [value, key]));

export function escape(lines: string[]): string {
    const stack: number[] = [];
    const result: string[] = [];
    let lineTrim = '';
    let modifiedLine = '';

    for (const [i, line] of lines.entries()) {
        lineTrim = line.trim();
        modifiedLine = line;

        let startIndex: number | undefined = 0;
        if (/^```.+/.test(lineTrim)) {
            stack.push(i);
        } else if (lineTrim === '```') {
            if (stack.length) {
                startIndex = stack.pop();
                if (!stack.length) {
                    const content = lines.slice(startIndex, i + 1).join('\n');
                    result.push(handleEscape(content, 'code'));
                    continue;
                }
            } else {
                stack.push(i);
            }
            // If the current line does not start with > and the previous line starts with >,
            // add > to the beginning of the current line.
        } else if (lineTrim && i > 0 && /^\s*>/.test(result.at(-1) ?? '') && !lineTrim.startsWith('>')) {
            modifiedLine = `>${line}`;
        }

        if (!stack.length) {
            result.push(handleEscape(modifiedLine));
        }
    }
    if (stack.length) {
        const last = `${lines.slice(stack[0]).join('\n')}\n\`\`\``;
        result.push(handleEscape(last, 'code'));
    }
    const regexp = /^LOGSTART\n(.*?)LOGEND/s;
    return result.join('\n')
        .replace(regexp, '**$1||')
        .replace(new RegExp(Object.values(escapedChars).join('|'), 'g'), match => escapedCharsReverseMap.get(match) ?? match);
}

function handleEscape(text: string, type: string = 'text'): string {
    if (!text.trim()) {
        return text;
    }
    text = text.replace(/\\[*_~|`\\()[\]{}>#+\-=.!]/g, match => escapedChars[match as keyof typeof escapedChars]);
    if (type === 'text') {
        text = text
            // force all characters that need to be escaped to be escaped once.
            .replace(escapeChars, '\\$1')
            .replace(/\\\*\\\*(\S|\S.*?\S)\\\*\\\*/g, '*$1*') // bold
            .replace(/\\_\\_(\S|\S.*?\S)\\_\\_/g, '__$1__') // underline
            .replace(/\\_(\S|\S.*?\S)\\_/g, '_$1_') // italic
            .replace(/\\~(\S|\S.*?\S)\\~/g, '~$1~') // strikethrough
            .replace(/\\\|\\\|(\S|\S.*?\S)\\\|\\\|/g, '||$1||') // spoiler
            .replace(/\\\[([^\]]+)\\\]\\\((.+?)\\\)/g, '[$1]($2)') // url
            .replace(/\\`(.*?)\\`/g, '`$1`') // inline code
            .replace(/^\s*\\>\s*(.+)$/gm, '>$1') // >
            .replace(/^(>?\s*)\\(-|\*)\s+(.+)$/gm, '$1• $3') // item
            .replace(/^((\\#){1,3}\s)(.+)/gm, '$1*$3*'); // number sign
    } else {
        const codeBlank = text.length - text.trimStart().length;
        if (codeBlank > 0) {
            const blankReg = new RegExp(`^\\s{${codeBlank}}`, 'gm');
            text = text.replace(blankReg, '');
        }
        text = text
            .trimEnd()
            .replace(/([\\`])/g, '\\$1')
            .replace(/^\\`\\`\\`([\s\S]+)\\`\\`\\`$/g, '```$1```'); // code block
    }
    return text;
}

export function chunkDocument(text: string, chunkSize: number = 4096): string[][] {
    const textList = text.split('\n');
    const chunks: string[][] = [[]];
    let chunkIndex = 0;
    const codeStack: string[] = [];
    for (const line of textList) {
        if (chunks[chunkIndex].join('\n').length + line.length >= chunkSize) {
            chunkIndex++;
            chunks.push([]);
            if (codeStack.length) {
                if (chunks[chunkIndex - 1].join('\n').length + codeStack.length * 4 >= chunkSize) {
                    chunks[chunkIndex - 1].push(...chunks[chunkIndex - 1].slice(-codeStack.length));
                    chunks[chunkIndex - 1].length -= codeStack.length;
                }
                chunks[chunkIndex - 1].push(...Array.from({ length: codeStack.length }).fill('```') as string[]);
                chunks[chunkIndex].push(...codeStack);
            }
            if (line.length > chunkSize) {
                const lineSplit = chunkText(chunks[chunkIndex].join('\n') + line, chunkSize);
                if (lineSplit.length > 1) {
                    chunks.length -= 1;
                    chunks.push(...lineSplit.map(item => item.split('\n')));
                    chunkIndex = chunks.length - 1;
                } else {
                    chunks[chunkIndex].push(line);
                }
            } else {
                chunks[chunkIndex].push(line);
            }
            continue;
        }
        if (/^```.+/.test(line.trim())) {
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
    return chunks;
}

function chunkText(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}
