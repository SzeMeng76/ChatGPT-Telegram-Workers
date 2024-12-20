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

**>• Hello, Siri\\!
>• Hi\\!
>• What can I do for you?
>• Can you help me with my homework?
>• Yes, I can help you\\.
>• I'm sorry, I am just joking\\.||

Whats the meaning of life?
Can you answer that?
Maybe you can\\.

**>Luxun said:
>The meaning of life is to be happy\\.
>Its not to be rich\\.||

>You said:
>The meaning of life is to be happy\\.`;

const text2 = `\`Can you help me **with my math homework**\\? -_-|||\`
Yes, I can _help_ you with your math homework.
\`I'm sorry, I am just joking.\`
\`Shut' up\\'
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

const text3 = `\`\`\`ts
const a = 1;
\`\`\`
\`\`\`javascript
const a = 1;
const b = \\\`\${a}\\\`;`;

const tgmd3 = `\`\`\`ts
const a = 1;
\`\`\`
\`\`\`javascript
const a = 1;
const b = \\\`\${a}\\\`;
\`\`\``;

describe('fold quote', () => {
    it('should fold quote', () => {
        const result = escape(text1.split('\n'));
        expect(result).toBe(tgmd1);
    });
});

describe('inlineCode', () => {
    it('new inline code escape logic', () => {
        const result = escape(text2.split('\n'));
        expect(result).toBe(tgmd2);
    });
});

describe('code block', () => {
    it('should correctly identify missing code blocks', () => {
        const result = escape(text3.split('\n'));
        expect(result).toBe(tgmd3);
    });
});
