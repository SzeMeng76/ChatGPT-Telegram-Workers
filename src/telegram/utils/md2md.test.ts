import { describe, expect, it } from 'vitest';
import { escape } from './md2tgmd';

const text1 = `LOGSTART>\`gpt-4o 12.5s\`
>\`search\`
>\`110,12\`LOGEND

>- Hello, Siri!
>- Hi!
>- What can I do for you?
>- Can you help me with my homework?
>- Yes, I can help you.
>- I'm sorry, I am just joking.

Whats the meaning of life?
Can you answer that?
Maybe you can.

> Luxun said:
> The meaning of life is to be happy.
> Its not to be rich.

>You said:
>The meaning of life is to be happy.`;

const tgmd1 = `**>\`gpt-4o 12.5s\`
>\`search\`
>\`110,12\`||

>• Hello, Siri\\!
>• Hi\\!
>• What can I do for you?
>• Can you help me with my homework?
>• Yes, I can help you\\.
>• I'm sorry, I am just joking\\.

Whats the meaning of life?
Can you answer that?
Maybe you can\\.

>Luxun said:
>The meaning of life is to be happy\\.
>Its not to be rich\\.

>You said:
>The meaning of life is to be happy\\.`;

const tgmd1_expand = `**>\`gpt-4o 12.5s\`
>\`search\`
>\`110,12\`
>
>• Hello, Siri\\!
>• Hi\\!
>• What can I do for you?
>• Can you help me with my homework?
>• Yes, I can help you\\.
>• I'm sorry, I am just joking\\.
>
>Whats the meaning of life?
>Can you answer that?
>Maybe you can\\.
>
>Luxun said:
>The meaning of life is to be happy\\.
>Its not to be rich\\.
>
>You said:
>The meaning of life is to be happy\\.||`;

const text2 = `\`Can you help me **with my math homework**\\? -_-|||\`
Yes, I can _help_ you with your math homework.
\`I'm sorry, I am just joking.\`
\\\`Shut' up\\'
The \`\\\\\` is a backslash.
The \`\\\\\`\` is used to escape the backslash.
\\1 is a number.`;

const tgmd2 = `\`Can you help me **with my math homework**\\? -_-|||\`
Yes, I can _help_ you with your math homework\\.
\`I'm sorry, I am just joking.\`
\\\`Shut' up\\\\'
The \`\\\\\` is a backslash\\.
The \`\\\\\`\\\` is used to escape the backslash\\.
\\\\1 is a number\\.`;

const tgmd2_expand = `**>\`Can you help me **with my math homework**\\? -_-|||\`
>Yes, I can _help_ you with your math homework\\.
>\`I'm sorry, I am just joking.\`
>\\\`Shut' up\\\\'
>The \`\\\\\` is a backslash\\.
>The \`\\\\\`\\\` is used to escape the backslash\\.
>\\\\1 is a number\\.||`;

const text3 = `\`\`\`ts
const a = 1;
\`\`\`
\`\`\`javascript
const a = 1;
const b = \`\${a}\`;`;

const tgmd3 = `\`\`\`ts
const a = 1;
\`\`\`
\`\`\`javascript
const a = 1;
const b = \\\`\${a}\\\`;
\`\`\``;

const tgmd3_expand = `**>\\\`\\\`\\\`ts
>const a \\= 1;
>\\\`\\\`\\\`
>\\\`\\\`\\\`javascript
>const a \\= 1;
>const b \\= \\\`$\\{a\\}\\\`;
>\\\`\\\`\\\`||`;

describe('text1', () => {
    it('fold quote', () => {
        const result = escape(text1, { addQuote: false, quoteExpandable: false });
        expect(result).toBe(tgmd1);
    });
    it('fold quote expandable', () => {
        const result = escape(text1, { addQuote: true, quoteExpandable: true });
        expect(result).toBe(tgmd1_expand);
    });
});

describe('text2', () => {
    it('new inline code escape logic', () => {
        const result = escape(text2);
        expect(result).toBe(tgmd2);
    });
    it('new inline code escape logic expandable', () => {
        const result = escape(text2, { addQuote: true, quoteExpandable: true });
        expect(result).toBe(tgmd2_expand);
    });
});
// // escape(text2);

describe('text3 code block', () => {
    it('code block', () => {
        expect(escape(text3)).toBe(tgmd3);
    });
    it('code block expandable', () => {
        expect(escape(text3, { addQuote: true, quoteExpandable: true })).toBe(tgmd3_expand);
    });
});

// // escape(text3);

// const result = quoteMessage(text1, 'group', true);
// console.log(result);
// console.log('quote expandable then escape--------------------------------');
// escape(result, true);

const text4 = `(\`test\`)

`;

const tgmd4 = `\\(\`test\`\\)

`;

const tgmd4_expand = `**>\\(\`test\`\\)
>
>||`;

describe('text4', () => {
    it('inline code in inline code', () => {
        expect(escape(text4)).toBe(tgmd4);
    });
    it('inline code in inline code expandables', () => {
        expect(escape(text4, { addQuote: true, quoteExpandable: true })).toBe(tgmd4_expand);
    });
});

// const result = escape(text2);
// console.log(result);

// const text = `>\`gemini-2.0-flash-exp 1.5s\`
// >\`47,24\`
// > Hi\\! 👋 It's nice to hear from you again\\. Is there anything I can do for you today\\?
// >Goodbye\\!
// >Kakao
// >wowo`;
// addExpandable(text, true);

const text5 = `LOGSTART>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`LOGEND
A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression. Its fur is long and soft, with a naturally messy look, appearing slightly damp. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest. It has soft facial features and fair skin, with thin, naturally shaped eyebrows`;

// const data = escape(text5, { quoteExpandable: true, addQuote: true });

const thmd5_noquote = `**>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`||
A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together\\. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression\\. Its fur is long and soft, with a naturally messy look, appearing slightly damp\\. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest\\. It has soft facial features and fair skin, with thin, naturally shaped eyebrows`;

const thmd5_expand = `**>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`
>A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together\\. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression\\. Its fur is long and soft, with a naturally messy look, appearing slightly damp\\. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest\\. It has soft facial features and fair skin, with thin, naturally shaped eyebrows||`;

describe('text5', () => {
    it('log data no quote, no expandable', () => {
        expect(escape(text5, { quoteExpandable: false, addQuote: false })).toBe(thmd5_noquote);
    });
    it('log data no quote, expandable', () => {
        expect(escape(text5, { quoteExpandable: true, addQuote: false })).toBe(thmd5_noquote);
    });
    it('log data quote, expandable', () => {
        expect(escape(text5, { quoteExpandable: true, addQuote: true })).toBe(thmd5_expand);
    });
});

const text6 = `>A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression. Its fur is long and soft, with a naturally messy look, appearing slightly damp. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest. It has soft facial features and fair skin, with thin, naturally shaped eyebrows.
It's a photo.
LOGSTART>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`LOGEND`;

const tgmd6_noquote_expand = `**>A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together\\. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression\\. Its fur is long and soft, with a naturally messy look, appearing slightly damp\\. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest\\. It has soft facial features and fair skin, with thin, naturally shaped eyebrows\\.||
It's a photo\\.
**>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`||`;

const tgmd6_quote_expand = `**>A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together\\. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression\\. Its fur is long and soft, with a naturally messy look, appearing slightly damp\\. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest\\. It has soft facial features and fair skin, with thin, naturally shaped eyebrows\\.
>It's a photo\\.
>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`||`;

const tgmd6_noquote_noexpand = `>A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together\\. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression\\. Its fur is long and soft, with a naturally messy look, appearing slightly damp\\. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest\\. It has soft facial features and fair skin, with thin, naturally shaped eyebrows\\.
It's a photo\\.
**>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`||`;

const tgmd6_quote_noexpand = `>A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together\\. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression\\. Its fur is long and soft, with a naturally messy look, appearing slightly damp\\. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest\\. It has soft facial features and fair skin, with thin, naturally shaped eyebrows\\.
>It's a photo\\.
**>\`gemini-2.0-flash-exp c_t: 4.3s\`
>\`imagen-3.0-fast-generate-001 6.5s\`
>\`1240,307\`||`;

describe('text6', () => {
    it('log data expandable no quote', () => {
        expect(escape(text6, { quoteExpandable: true, addQuote: false })).toBe(tgmd6_noquote_expand);
    });
    it('log data quote expandable', () => {
        expect(escape(text6, { quoteExpandable: true, addQuote: true })).toBe(tgmd6_quote_expand);
    });
    it('log data no quote, no expandable', () => {
        expect(escape(text6, { quoteExpandable: false, addQuote: false })).toBe(tgmd6_noquote_noexpand);
    });
    it('log data quote, no expandable', () => {
        expect(escape(text6, { quoteExpandable: false, addQuote: true })).toBe(tgmd6_quote_noexpand);
    });
});

const text7 = `\`test code\`
link_1: [link 1](https://google.com/test/link_1_2.html)
link_2: [link 2](https://google.com/test/link_2_2.html)
\`incode **not bold**, not link [link](https://google.com/test/link_2_2.html)\`
`;

const md7_linktest = `\`test code\`
link\\_1: [link 1](https://google\\.com/test/link\\_1\\_2\\.html)
link\\_2: [link 2](https://google\\.com/test/link\\_2\\_2\\.html)
\`incode **not bold**, not link [link](https://google.com/test/link_2_2.html)\`
`;

describe('text7', () => {
    it('link test', () => {
        expect(escape(text7)).toBe(md7_linktest);
    });
});
