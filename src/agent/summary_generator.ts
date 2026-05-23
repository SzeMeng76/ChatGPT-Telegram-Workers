/**
 * 摘要生成器 - 使用辅助 LLM 生成上下文摘要
 */

import type { AgentUserConfig } from '../config/env';
import type { HistoryItem } from './types';
import { loadChatLLM } from '.';
import { log } from '../log/logger';

/**
 * 使用 LLM 生成摘要
 * 使用快速、便宜的模型（如 GPT-3.5 或 Claude Haiku）
 */
export async function generateSummaryWithLLM(
    prompt: string,
    maxTokens: number,
    context: AgentUserConfig
): Promise<string | null> {
    try {
        // 创建一个临时配置，使用更便宜的模型进行摘要
        const summaryContext = { ...context };

        // 优先级 1：用户显式配置 SUMMARY_PROVIDER（彻底切换 provider，用于卸载流量）
        if (summaryContext.SUMMARY_PROVIDER) {
            summaryContext.AI_CHAT_PROVIDER = summaryContext.SUMMARY_PROVIDER;
        }

        // 优先级 2：用户显式配置 SUMMARY_MODEL
        // 支持两种格式：
        //   - "gemini-2.5-flash-lite"        → 用当前 provider
        //   - "oailike:openai/gpt-4o-mini"   → 同时切换 provider
        if (summaryContext.SUMMARY_MODEL) {
            const raw = summaryContext.SUMMARY_MODEL.trim();
            const sep = raw.indexOf(':');
            if (sep > 0 && sep < raw.length - 1) {
                const providerPart = raw.slice(0, sep);
                const modelPart = raw.slice(sep + 1);
                summaryContext.AI_CHAT_PROVIDER = providerPart;
                summaryContext[`${providerPart.toUpperCase()}_CHAT_MODEL`] = modelPart;
            } else {
                summaryContext[`${summaryContext.AI_CHAT_PROVIDER.toUpperCase()}_CHAT_MODEL`] = raw;
            }
        }

        // 优先级 3：没有显式配置 → 旧的自动选便宜模型逻辑（向后兼容）
        if (!summaryContext.SUMMARY_PROVIDER && !summaryContext.SUMMARY_MODEL) {
            const originalProvider = summaryContext.AI_CHAT_PROVIDER;
            if (originalProvider === 'openai') {
                summaryContext.OPENAI_CHAT_MODEL = 'gpt-4o-mini';
            } else if (originalProvider === 'anthropic') {
                summaryContext.ANTHROPIC_CHAT_MODEL = 'claude-haiku-4-5';
            } else if (originalProvider === 'google') {
                summaryContext.GOOGLE_CHAT_MODEL = 'gemini-2.5-flash-lite';
            } else if (originalProvider === 'xai') {
                summaryContext.XAI_CHAT_MODEL = 'grok-4.1-fast';
            }
        }

        const agent = loadChatLLM(summaryContext);
        if (!agent) {
            log.error('[SUMMARY GENERATOR] No agent available for summary generation');
            return null;
        }

        const usedModel = summaryContext[`${summaryContext.AI_CHAT_PROVIDER.toUpperCase()}_CHAT_MODEL`];
        log.info(`[SUMMARY GENERATOR] Using ${summaryContext.AI_CHAT_PROVIDER}:${usedModel} for summary generation`);

        const messages: HistoryItem[] = [
            {
                role: 'user',
                content: prompt,
            },
        ];

        const result = await agent.request(
            {
                messages,
                cache: [],
            },
            summaryContext,
            null // 不需要流式输出
        );

        const summary = result.content.trim();

        if (!summary) {
            log.error('[SUMMARY GENERATOR] Empty summary generated');
            return null;
        }

        log.info(`[SUMMARY GENERATOR] Summary generated successfully (${summary.length} chars)`);
        return summary;
    } catch (error) {
        log.error('[SUMMARY GENERATOR] Failed to generate summary:', error);
        return null;
    }
}
