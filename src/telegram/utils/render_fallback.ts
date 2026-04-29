/**
 * Telegram Message Rendering Fallback Strategy
 *
 * Based on best practices from:
 * - https://stackoverflow.com/questions/60130062/escaped-character-on-telegram-bot-api-4-5-markdownv2-gives-trouble-for-hyper-lin
 * - https://hexdocs.pm/telegex_marked/readme.html
 * - https://pypi.org/project/telegram-markdown-entities/0.1.0/
 *
 * Fallback order: MarkdownV2 → HTML → Plain Text → Telegraph
 */

import type * as Telegram from 'telegram-bot-api-types';
import { escape as escapeMarkdownV2 } from './md2tgmd';

export interface RenderResult {
    success: boolean;
    text: string;
    parseMode?: 'MarkdownV2' | 'HTML' | undefined;
    error?: string;
    fallbackUsed?: 'html' | 'plain' | 'telegraph';
}

/**
 * Auto-fix common MarkdownV2 issues
 * Repairs unbalanced markers by removing unpaired ones to prevent parse errors
 *
 * Strategy: When markers are unbalanced, remove all instances of that marker type
 * rather than trying to guess where to close them. This prevents incorrect formatting
 * but ensures the message can still be sent.
 */
export function autoFixMarkdownV2(text: string): string {
    let fixed = text;

    // Fix unbalanced bold markers (**)
    const boldMatches = fixed.match(/(?<!\\)\*\*/g) || [];
    if (boldMatches.length % 2 !== 0) {
        // Remove all bold markers instead of trying to fix
        fixed = fixed.replace(/(?<!\\)\*\*/g, '');
        console.warn('[AutoFix] Removed unbalanced bold markers (**)');
    }

    // Fix unbalanced italic markers (*)
    // Exclude list markers at start of line
    const textWithoutLists = fixed.replace(/^[\s]*\*\s+/gm, '');
    const italicMatches = textWithoutLists.match(/(?<!\\)(?<!\*)\*(?!\*)/g) || [];
    if (italicMatches.length % 2 !== 0) {
        // Remove all italic markers (preserve list markers)
        const lines = fixed.split('\n');
        fixed = lines.map((line) => {
            // Preserve list markers at start of line
            if (/^[\s]*\*\s+/.test(line)) {
                return line;
            }
            // Remove italic markers
            return line.replace(/(?<!\\)(?<!\*)\*(?!\*)/g, '');
        }).join('\n');
        console.warn('[AutoFix] Removed unbalanced italic markers (*)');
    }

    // Fix unbalanced underline markers (__)
    const underlineMatches = fixed.match(/(?<!\\)__/g) || [];
    if (underlineMatches.length % 2 !== 0) {
        fixed = fixed.replace(/(?<!\\)__/g, '');
        console.warn('[AutoFix] Removed unbalanced underline markers (__)');
    }

    // Fix unbalanced code block markers (```)
    const codeBlockMatches = fixed.match(/(?<!\\)```/g) || [];
    if (codeBlockMatches.length % 2 !== 0) {
        // Add closing ``` at the end for code blocks
        fixed += '\n```';
        console.warn('[AutoFix] Added closing code block marker (```)');
    }

    // Fix unbalanced inline code markers (`)
    const inlineCodeMatches = fixed.match(/(?<!\\)`(?!``)/g) || [];
    if (inlineCodeMatches.length % 2 !== 0) {
        // For inline code, remove all markers as they're likely broken
        fixed = fixed.replace(/(?<!\\)`(?!``)/g, '');
        console.warn('[AutoFix] Removed unbalanced inline code markers (`)');
    }

    // Fix unbalanced spoiler markers (||)
    const spoilerMatches = fixed.match(/(?<!\\)\|\|/g) || [];
    if (spoilerMatches.length % 2 !== 0) {
        fixed = fixed.replace(/(?<!\\)\|\|/g, '');
        console.warn('[AutoFix] Removed unbalanced spoiler markers (||)');
    }

    return fixed;
}

/**
 * Validate MarkdownV2 format before sending
 * Detects common issues that cause rendering failures
 */
export function validateMarkdownV2(text: string): { valid: boolean; issues: string[]; fixed?: string } {
    const issues: string[] = [];

    // Check for unbalanced bold markers
    const boldCount = (text.match(/(?<!\\)\*\*/g) || []).length;
    if (boldCount % 2 !== 0) {
        issues.push('Unbalanced bold markers (**)');
    }

    // Check for unbalanced italic markers (excluding list markers)
    // List markers: "* " or "*   " at start of line
    const textWithoutLists = text.replace(/^[\s]*\*\s+/gm, '');
    const italicCount = (textWithoutLists.match(/(?<!\\)(?<!\*)\*(?!\*)/g) || []).length;
    if (italicCount % 2 !== 0) {
        issues.push('Unbalanced italic markers (*)');
    }

    // Check for unbalanced underline markers
    const underlineCount = (text.match(/(?<!\\)__/g) || []).length;
    if (underlineCount % 2 !== 0) {
        issues.push('Unbalanced underline markers (__)');
    }

    // Check for unbalanced code markers
    const codeCount = (text.match(/(?<!\\)```/g) || []).length;
    if (codeCount % 2 !== 0) {
        issues.push('Unbalanced code block markers (```)');
    }

    // Check for unbalanced inline code markers
    const inlineCodeCount = (text.match(/(?<!\\)`(?!``)/g) || []).length;
    if (inlineCodeCount % 2 !== 0) {
        issues.push('Unbalanced inline code markers (`)');
    }

    // Check for unbalanced spoiler markers
    const spoilerCount = (text.match(/(?<!\\)\|\|/g) || []).length;
    if (spoilerCount % 2 !== 0) {
        issues.push('Unbalanced spoiler markers (||)');
    }

    // Check for malformed links [text](url)
    const linkPattern = /\[([^\]]*)\]\(([^)]*)\)/g;
    const links = text.matchAll(linkPattern);
    for (const link of links) {
        if (!link[1] || !link[2]) {
            issues.push(`Malformed link: [${link[1]}](${link[2]})`);
        }
    }

    // Check for invalid nested formatting patterns
    const invalidPatterns = [
        { pattern: /\*\*_[^_]*_\*\*/, desc: 'Invalid nested bold+italic (**_text_**), use ***text*** instead' },
        { pattern: /__\*[^*]*\*__/, desc: 'Invalid nested underline+italic (__*text*__), use ___text___ instead' },
    ];

    for (const { pattern, desc } of invalidPatterns) {
        if (pattern.test(text)) {
            issues.push(desc);
        }
    }

    // If there are issues, auto-fix them
    let fixed: string | undefined;
    if (issues.length > 0) {
        fixed = autoFixMarkdownV2(text);
    }

    return {
        valid: issues.length === 0,
        issues,
        fixed,
    };
}

/**
 * Preprocess text for MarkdownV2 compatibility
 * Converts unsupported Markdown features to MarkdownV2-safe format
 */
export function preprocessMarkdownV2(text: string): string {
    let processed = text;

    // Convert unordered lists (* item) to bullet points (• item)
    // Telegram MarkdownV2 doesn't support list syntax
    // Handle both regular lists and lists inside blockquotes
    // Pattern: optional whitespace + optional '>' + optional whitespace + '*' + space
    processed = processed.replace(/^([\s]*>?[\s]*)\*\s+/gm, '$1• ');

    return processed;
}

/**
 * Convert MarkdownV2 to safe HTML
 * Fallback when MarkdownV2 fails
 */
export function markdownToHTML(text: string): string {
    let html = text;

    // Escape HTML special characters first
    html = html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Convert unordered lists (must be done before italic conversion)
    // Match: "* item" or "*   item" at start of line
    html = html.replace(/^[\s]*\*\s+(.+)$/gm, '• $1');

    // Convert code blocks (must be done before inline code)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    html = html.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>');

    // Convert inline code
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

    // Convert bold + italic (must be before individual bold/italic)
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>');
    html = html.replace(/___(.+?)___/g, '<b><i>$1</i></b>');

    // Convert bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    html = html.replace(/__(.+?)__/g, '<u>$1</u>');

    // Convert italic
    html = html.replace(/\*(.+?)\*/g, '<i>$1</i>');
    html = html.replace(/_(.+?)_/g, '<i>$1</i>');

    // Convert strikethrough
    html = html.replace(/~~(.+?)~~/g, '<s>$1</s>');
    html = html.replace(/~(.+?)~/g, '<s>$1</s>');

    // Convert spoiler
    html = html.replace(/\|\|(.+?)\|\|/g, '<span class="tg-spoiler">$1</span>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    return html;
}

/**
 * Strip all formatting and return plain text
 * Last resort before Telegraph
 */
export function stripFormatting(text: string): string {
    let plain = text;

    // Remove code blocks
    plain = plain.replace(/```[\s\S]*?```/g, (match) => {
        return match.replace(/```\w*\n?/g, '').replace(/```/g, '');
    });

    // Remove inline code markers
    plain = plain.replace(/`([^`]+)`/g, '$1');

    // Remove bold/italic/underline markers
    plain = plain.replace(/\*\*\*(.+?)\*\*\*/g, '$1');
    plain = plain.replace(/\*\*(.+?)\*\*/g, '$1');
    plain = plain.replace(/__(.+?)__/g, '$1');
    plain = plain.replace(/\*(.+?)\*/g, '$1');
    plain = plain.replace(/_(.+?)_/g, '$1');

    // Remove strikethrough
    plain = plain.replace(/~~(.+?)~~/g, '$1');
    plain = plain.replace(/~(.+?)~/g, '$1');

    // Remove spoiler
    plain = plain.replace(/\|\|(.+?)\|\|/g, '$1');

    // Convert links to text
    plain = plain.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

    // Remove escape characters
    plain = plain.replace(/\\([_*[\]()~`>#+\-=|{}.!\\])/g, '$1');

    return plain;
}

/**
 * Attempt to send message with automatic fallback
 * Returns the successful render result or throws if all methods fail
 */
export async function sendWithFallback(
    api: any,
    chatId: number | string,
    text: string,
    options: Partial<Telegram.SendMessageParams> = {},
): Promise<RenderResult> {
    const maxLength = 4096;

    // If text is too long, immediately return telegraph flag
    if (text.length > maxLength) {
        return {
            success: false,
            text,
            error: 'Message too long (>4096 chars)',
            fallbackUsed: 'telegraph',
        };
    }

    // Try MarkdownV2 first
    try {
        // Preprocess text to convert unsupported Markdown features
        const processedText = preprocessMarkdownV2(text);

        const validation = validateMarkdownV2(processedText);
        if (!validation.valid) {
            console.warn('[Render] MarkdownV2 validation failed:', validation.issues);
        }

        const resp = await api.sendMessage({
            chat_id: chatId,
            text: processedText,
            parse_mode: 'MarkdownV2',
            ...options,
        });

        if (resp.ok) {
            return {
                success: true,
                text: processedText,
                parseMode: 'MarkdownV2',
            };
        }

        const errorData = await resp.json();
        console.warn('[Render] MarkdownV2 failed:', errorData.description);
    } catch (e) {
        console.error('[Render] MarkdownV2 error:', (e as Error).message);
    }

    // Try HTML fallback
    try {
        const htmlText = markdownToHTML(text);
        const resp = await api.sendMessage({
            chat_id: chatId,
            text: htmlText,
            parse_mode: 'HTML',
            ...options,
        });

        if (resp.ok) {
            return {
                success: true,
                text: htmlText,
                parseMode: 'HTML',
                fallbackUsed: 'html',
            };
        }

        const errorData = await resp.json();
        console.warn('[Render] HTML fallback failed:', errorData.description);
    } catch (e) {
        console.error('[Render] HTML error:', (e as Error).message);
    }

    // Try plain text fallback
    try {
        const plainText = stripFormatting(text);
        const resp = await api.sendMessage({
            chat_id: chatId,
            text: plainText,
            ...options,
        });

        if (resp.ok) {
            return {
                success: true,
                text: plainText,
                parseMode: undefined,
                fallbackUsed: 'plain',
            };
        }

        const errorData = await resp.json();
        console.warn('[Render] Plain text fallback failed:', errorData.description);
    } catch (e) {
        console.error('[Render] Plain text error:', (e as Error).message);
    }

    // All methods failed, return telegraph flag
    return {
        success: false,
        text,
        error: 'All rendering methods failed',
        fallbackUsed: 'telegraph',
    };
}
