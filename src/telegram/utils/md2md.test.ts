import { describe, expect, it } from 'vitest';
import { escape } from './md2tgmd';

const text1 = `>\`gpt-4o 12.5s\`
>\`search\`
>\`110,12\`

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

describe('fold quote', () => {
    it('should fold quote', () => {
        const result = escape(text1.split('\n'));
        expect(result).toBe(tgmd1);
    });
});

describe('fold quote expandable', () => {
    it('should fold quote', () => {
        const result = escape(text1.split('\n'), { addQuote: true, quoteExpandable: true });
        expect(result).toBe(tgmd1_expand);
    });
});

describe('inlineCode', () => {
    it('new inline code escape logic', () => {
        const result = escape(text2.split('\n'));
        expect(result).toBe(tgmd2);
    });
});

describe('inlineCode expandable', () => {
    it('new inline code escape logic', () => {
        const result = escape(text2.split('\n'), { addQuote: true, quoteExpandable: true });
        expect(result).toBe(tgmd2_expand);
    });
});

// // escape(text2.split('\n'));

describe('code block', () => {
    it('should correctly identify missing code blocks', () => {
        expect(escape(text3.split('\n'))).toBe(tgmd3);
    });
});

// // escape(text3.split('\n'));

describe('code block expandable', () => {
    it('should expand the code block message', () => {
        expect(escape(text3.split('\n'), { addQuote: true, quoteExpandable: true })).toBe(tgmd3_expand);
    });
});

// const result = quoteMessage(text1, 'group', true);
// console.log(result);
// console.log('quote expandable then escape--------------------------------');
// escape(result.split('\n'), true);

const text4 = `(\`test\`)

`;

const tgmd4 = `\\(\`test\`\\)

`;

const tgmd4_expand = `**>\\(\`test\`\\)
>
>||`;

describe('inline code in inline code', () => {
    it('should correctly identify missing code blocks', () => {
        expect(escape(text4.split('\n'))).toBe(tgmd4);
    });
});

describe('inline code in inline code expandable', () => {
    it('should correctly identify missing code blocks', () => {
        expect(escape(text4.split('\n'), { addQuote: true, quoteExpandable: true })).toBe(tgmd4_expand);
    });
});

// const result = escape(text2.split('\n'));
// console.log(result);

// const text = `>\`gemini-2.0-flash-exp 1.5s\`
// >\`47,24\`
// > Hi\\! 👋 It's nice to hear from you again\\. Is there anything I can do for you today\\?
// >Goodbye\\!
// >Kakao
// >wowo`;
// addExpandable(text, true);

// const text5 = `LOGSTART\n>\`gemini-2.0-flash-exp c_t: 4.3s\`
// >\`imagen-3.0-fast-generate-001 6.5s\`
// >\`1240,307\`LOGEND
// A photo of a small, fluffy, white kitten sitting with a slight lean to the left, its legs together. Its head is turned approximately 20 degrees to the right, and its gaze is directed towards the upper right, giving it a pensive expression. Its fur is long and soft, with a naturally messy look, appearing slightly damp. Some strands fall over its forehead, partially obscuring its left eye, while the rest cascades over its shoulders and chest. It has soft facial features and fair skin, with thin, naturally shaped eyebrows. Its almond-shaped eyes have narrow eyelids and black pupils. Its nose is small and straight, and its lips are slightly thin with a light coral pink lipstick. Small, almost unnoticeable earrings adorn its ears. It wears a white, shirt-style dress with a relatively low V-neck that reveals its collarbone. The dress material is thin and breathable, slightly sheer, with natural folds and a subtle sheen. The sleeves are loose and lantern-styled, reaching its wrists with slightly tightened cuffs. The skirt falls to the floor, covering its legs. Its hands are clasped together and rest on its left knee. The lighting comes from the upper left and is soft, casting gentle highlights on the left side of its face, shoulder, arm, and skirt, while the right side is subtly shadowed. The moderate contrast in lighting creates a hazy atmosphere. The background is a solid, dark bluish-gray color with a smooth, soft texture.`;

// const data = escape(text5.split('\n'), { quoteExpandable: true, addQuote: true });
