/**
 * API Key Manager - 简化版 Key 轮换与冷却管理
 *
 * 功能：
 * - 多 Key 轮换（Round-Robin by lastUsed）
 * - 失败自动冷却（指数退避）
 * - 限流感知
 * - 向后兼容单 Key
 */

export interface KeyState {
    key: string;
    lastUsed: number;
    errorCount: number;
    cooldownUntil?: number;
    lastError?: string;
    // 永久停用标记：suspended / invalid_key 等致命错误
    disabled?: boolean;
    disabledAt?: number;
    disabledReason?: string;
}

export type FailureReason =
    | 'rate_limit'        // RPM/TPM — 短冷却
    | 'rate_limit_daily'  // RPD — 长冷却到 Pacific 午夜
    | 'auth'              // 401/403 暂态
    | 'invalid_key'       // dead forever
    | 'suspended'         // dead forever
    | 'billing'           // 计费问题 — 长冷却
    | 'timeout'
    | 'server'            // 5xx — 短冷却不升级
    | 'unknown';

// 内存存储：provider -> KeyState[]
const keyStates: Map<string, KeyState[]> = new Map();

/**
 * 计算冷却时间（指数退避）
 * 1st: 1min, 2nd: 5min, 3rd: 25min, 4th+: 60min (1h cap)
 */
function calculateCooldownMs(errorCount: number, reason: FailureReason): number {
    // 计费错误使用更长的冷却时间
    if (reason === 'billing') {
        // 5h -> 10h -> 20h -> 24h (cap)
        const hours = Math.min(24, 5 * Math.pow(2, Math.max(0, errorCount - 1)));
        return hours * 60 * 60 * 1000;
    }

    // 每日配额：冷却到 Pacific 时区午夜（固定 UTC-8，忽略 DST），最长 12h
    if (reason === 'rate_limit_daily') {
        const now = new Date();
        // Pacific = UTC-8 (PST) — 忽略 DST 1h 漂移
        const pacificOffsetMs = 8 * 60 * 60 * 1000;
        const pacificNow = new Date(now.getTime() - pacificOffsetMs);
        const pacificMidnight = new Date(Date.UTC(
            pacificNow.getUTCFullYear(),
            pacificNow.getUTCMonth(),
            pacificNow.getUTCDate() + 1,
            0, 0, 0, 0,
        ));
        const msUntilMidnight = pacificMidnight.getTime() - pacificNow.getTime();
        return Math.min(12 * 60 * 60 * 1000, Math.max(60 * 1000, msUntilMidnight));
    }

    // 服务端 5xx：固定 30s，不升级
    if (reason === 'server') {
        return 30 * 1000;
    }

    // 其他错误：1min -> 5min -> 25min -> 60min (cap)
    const normalized = Math.max(1, errorCount);
    return Math.min(
        60 * 60 * 1000, // 1 hour max
        60 * 1000 * Math.pow(5, Math.min(normalized - 1, 3)),
    );
}

/**
 * 初始化 provider 的 key 状态
 */
function initKeyStates(provider: string, keys: string[]): KeyState[] {
    if (!keyStates.has(provider)) {
        keyStates.set(provider, keys.map(key => ({
            key,
            lastUsed: 0,
            errorCount: 0,
        })));
    } else {
        // 同步新增/移除的 keys
        const existing = keyStates.get(provider)!;
        const existingKeys = new Set(existing.map(s => s.key));
        const newKeys = new Set(keys);

        // 添加新 keys
        for (const key of keys) {
            if (!existingKeys.has(key)) {
                existing.push({ key, lastUsed: 0, errorCount: 0 });
            }
        }

        // 移除已删除的 keys
        const filtered = existing.filter(s => newKeys.has(s.key));
        keyStates.set(provider, filtered);
    }

    return keyStates.get(provider)!;
}

/**
 * 检查 key 是否在冷却中
 */
function isInCooldown(state: KeyState): boolean {
    return state.cooldownUntil ? Date.now() < state.cooldownUntil : false;
}

/**
 * 选择最佳 API Key
 * - 跳过永久停用的 key（suspended / invalid_key）
 * - 跳过冷却中的 key
 * - Round-robin by lastUsed（最久未用的优先）
 * - 如果所有 key 都在冷却，选择最快恢复的
 * - 如果只剩 disabled key，返回 null
 */
export function selectKey(provider: string, keys: string | string[] | null): string | null {
    // 处理空值
    if (!keys) return null;

    // 单 key 直接返回
    const keyArray = Array.isArray(keys) ? keys : [keys];
    if (keyArray.length === 0) return null;
    if (keyArray.length === 1) return keyArray[0];

    // 初始化状态
    const states = initKeyStates(provider, keyArray);

    // 分离可用、冷却中、永久停用
    const available: KeyState[] = [];
    const inCooldown: KeyState[] = [];

    for (const state of states) {
        if (state.disabled) continue; // 永远不选中
        if (isInCooldown(state)) {
            inCooldown.push(state);
        } else {
            available.push(state);
        }
    }

    let selected: KeyState;

    if (available.length > 0) {
        // Round-robin: 选择 lastUsed 最早的
        available.sort((a, b) => a.lastUsed - b.lastUsed);
        selected = available[0];
    } else if (inCooldown.length > 0) {
        // 所有可用 key 都在冷却，选择最快恢复的
        inCooldown.sort((a, b) => (a.cooldownUntil || 0) - (b.cooldownUntil || 0));
        selected = inCooldown[0];
    } else {
        // 全部停用 — 返回 null，调用方按 `|| undefined` / `|| ''` 处理
        return null;
    }

    // 更新 lastUsed
    selected.lastUsed = Date.now();

    return selected.key;
}

/**
 * 标记 key 使用成功 - 重置错误计数
 * 注意：不会自动恢复永久停用的 key，需要通过 reviveKey 手动恢复
 */
export function markKeySuccess(provider: string, key: string): void {
    const states = keyStates.get(provider);
    if (!states) return;

    const state = states.find(s => s.key === key);
    if (state && !state.disabled) {
        state.errorCount = 0;
        state.cooldownUntil = undefined;
        state.lastError = undefined;
    }
}

/**
 * 标记 key 失败 - 设置冷却时间
 * - 已停用的 key 直接 no-op
 * - server 错误不升级 errorCount
 */
export function markKeyFailure(provider: string, key: string, reason: FailureReason): void {
    const states = keyStates.get(provider);
    if (!states) return;

    const state = states.find(s => s.key === key);
    if (!state || state.disabled) return;

    if (reason !== 'server') {
        state.errorCount++;
    } else if (state.errorCount === 0) {
        state.errorCount = 1; // 至少标记一次
    }
    state.cooldownUntil = Date.now() + calculateCooldownMs(state.errorCount, reason);
    state.lastError = reason;
}

/**
 * 永久停用 key — 用于 suspended / invalid_key 这类无法自动恢复的错误
 * 只有通过 reviveKey 才能恢复
 */
export function disableKey(provider: string, key: string, reason: string): void {
    const states = keyStates.get(provider);
    if (!states) return;

    const state = states.find(s => s.key === key);
    if (state) {
        state.disabled = true;
        state.disabledAt = Date.now();
        state.disabledReason = reason;
        state.cooldownUntil = undefined; // disabled 状态独立于冷却
        state.lastError = reason;
    }
}

/**
 * 手动恢复被停用的 key（用户在 Google 端处理好后通过 /keystats revive 触发）
 * 接受 key 前缀匹配，方便用户从 /keystats 显示的 masked key 复制
 * 返回恢复的 KeyState，未匹配返回 null
 */
export function reviveKey(provider: string, keyPrefix: string): KeyState | null {
    const states = keyStates.get(provider);
    if (!states) return null;

    const state = states.find(s => s.key.startsWith(keyPrefix));
    if (!state) return null;

    state.disabled = false;
    state.disabledAt = undefined;
    state.disabledReason = undefined;
    state.errorCount = 0;
    state.cooldownUntil = undefined;
    state.lastError = undefined;
    return state;
}

/**
 * 从错误消息判断失败原因
 */
export function classifyError(error: Error | string): FailureReason {
    const message = typeof error === 'string' ? error.toLowerCase() : (error.message || '').toLowerCase();

    // Rate limit
    if (message.includes('rate limit') ||
        message.includes('rate_limit') ||
        message.includes('too many requests') ||
        message.includes('429')) {
        return 'rate_limit';
    }

    // Auth errors
    if (message.includes('invalid api key') ||
        message.includes('incorrect api key') ||
        message.includes('authentication') ||
        message.includes('unauthorized') ||
        message.includes('401') ||
        message.includes('403')) {
        return 'auth';
    }

    // Billing errors
    if (message.includes('billing') ||
        message.includes('quota') ||
        message.includes('exceeded') ||
        message.includes('insufficient') ||
        message.includes('credit') ||
        message.includes('payment')) {
        return 'billing';
    }

    // Timeout
    if (message.includes('timeout') ||
        message.includes('timed out') ||
        message.includes('econnreset') ||
        message.includes('etimedout')) {
        return 'timeout';
    }

    return 'unknown';
}

/**
 * 获取 provider 的 key 状态（用于调试/监控）
 */
export function getKeyStats(provider: string): KeyState[] | undefined {
    return keyStates.get(provider);
}

/**
 * 清除 provider 的所有 key 状态
 */
export function clearKeyStates(provider?: string): void {
    if (provider) {
        keyStates.delete(provider);
    } else {
        keyStates.clear();
    }
}

/**
 * 获取所有 provider 的状态摘要
 */
export function getAllKeyStats(): Record<string, { total: number; available: number; inCooldown: number; disabled: number }> {
    const result: Record<string, { total: number; available: number; inCooldown: number; disabled: number }> = {};

    for (const [provider, states] of keyStates) {
        const disabled = states.filter(s => s.disabled).length;
        const inCooldown = states.filter(s => !s.disabled && isInCooldown(s)).length;
        const available = states.length - disabled - inCooldown;
        result[provider] = {
            total: states.length,
            available,
            inCooldown,
            disabled,
        };
    }

    return result;
}

// ============================================================
// 结构化错误分类（用于 Google API 等的 4xx/5xx 响应）
// ============================================================

export interface ErrorVerdict {
    verdict: 'dead' | 'cooldown' | 'park' | 'noop';
    reason: FailureReason;
    disabledReason?: string;
    retryAfterMs?: number;
}

interface ClassifyInput {
    error?: unknown;
    statusCode?: number;
    responseBody?: string;
    provider?: string;
}

/**
 * 解析 Google retryDelay 字符串（如 "30s" / "15.5s"）为毫秒
 */
function parseRetryDelay(s: unknown): number | undefined {
    if (typeof s !== 'string') return undefined;
    const m = s.match(/^([\d.]+)s$/);
    if (!m) return undefined;
    const sec = Number.parseFloat(m[1]);
    return Number.isFinite(sec) ? Math.ceil(sec * 1000) : undefined;
}

/**
 * 安全 JSON.parse
 */
function tryParseJson(text?: string): any {
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}

/**
 * 结构化错误分类
 * 优先于旧的 classifyError(error: Error | string) — 后者保留供向后兼容
 *
 * 决策表（Google API 已验证）：
 * - CONSUMER_SUSPENDED → dead/suspended （永久停用）
 * - API_KEY_INVALID / REFERRER / IP_BLOCKED → dead/invalid_key
 * - 429 RESOURCE_EXHAUSTED + PerDay → cooldown/rate_limit_daily
 * - 429 RESOURCE_EXHAUSTED + 其它 → cooldown/rate_limit + retryAfterMs
 * - 400 FAILED_PRECONDITION + User location → noop（部署问题，不是 key 问题）
 * - 5xx → cooldown/server
 * - 401 / 403（无 dead 标记）→ cooldown/auth
 * - AI_TypeValidationError → noop（SDK bug）
 */
export function classifyApiError(input: ClassifyInput): ErrorVerdict {
    let statusCode = input.statusCode;
    let responseBody = input.responseBody;
    let error: any = input.error;

    // 1. 解开 AI_RetryError → 取最后一个 APICallError
    if (error && typeof error === 'object' && (error as any).name === 'AI_RetryError') {
        const errors = (error as any).errors;
        if (Array.isArray(errors) && errors.length > 0) {
            error = errors[errors.length - 1];
        }
    }

    // 2. 如果 input.error 是 APICallError，提升其字段
    if (error && typeof error === 'object') {
        const e = error as any;
        if (typeof e.statusCode === 'number' && statusCode === undefined) {
            statusCode = e.statusCode;
        }
        if (typeof e.responseBody === 'string' && responseBody === undefined) {
            responseBody = e.responseBody;
        }
        // SDK schema 校验失败 — 不是 key 问题
        if (e.cause && typeof e.cause === 'object' && (e.cause as any).name === 'AI_TypeValidationError') {
            return { verdict: 'noop', reason: 'unknown' };
        }
    }

    // 3. 解析响应体
    const parsed = tryParseJson(responseBody);
    const errObj = parsed?.error ?? null;
    const apiStatus: string | undefined = errObj?.status;
    const message: string = errObj?.message ?? (typeof error === 'object' && error ? (error as any).message ?? '' : '');
    const details: any[] = Array.isArray(errObj?.details) ? errObj.details : [];

    const reasonField: string | undefined = details
        .find((d: any) => typeof d?.['@type'] === 'string' && d['@type'].includes('ErrorInfo'))?.reason;

    const bodyStr = (responseBody || '') + ' ' + message;

    // 4. CONSUMER_SUSPENDED → 永久停用
    if (reasonField === 'CONSUMER_SUSPENDED' || /has been suspended/i.test(bodyStr)) {
        return { verdict: 'dead', reason: 'suspended', disabledReason: 'CONSUMER_SUSPENDED' };
    }

    // 5. API_KEY_INVALID / referrer / IP block → 永久停用
    const deadReasons = new Set(['API_KEY_INVALID', 'API_KEY_HTTP_REFERRER_BLOCKED', 'API_KEY_IP_ADDRESS_BLOCKED']);
    if (reasonField && deadReasons.has(reasonField)) {
        return { verdict: 'dead', reason: 'invalid_key', disabledReason: reasonField };
    }
    if (/API [kK]ey not (valid|found)/.test(bodyStr) || /reported as leaked/i.test(bodyStr)) {
        return { verdict: 'dead', reason: 'invalid_key', disabledReason: 'API_KEY_INVALID' };
    }

    // 6. 429 RESOURCE_EXHAUSTED — 区分 PerDay vs PerMinute
    if (statusCode === 429 || apiStatus === 'RESOURCE_EXHAUSTED') {
        const quotaFailure = details.find((d: any) =>
            typeof d?.['@type'] === 'string' && d['@type'].includes('QuotaFailure'),
        );
        const retryInfo = details.find((d: any) =>
            typeof d?.['@type'] === 'string' && d['@type'].includes('RetryInfo'),
        );
        const violations: any[] = Array.isArray(quotaFailure?.violations) ? quotaFailure.violations : [];
        const quotaId: string = violations[0]?.quotaId || violations[0]?.quotaMetric || '';
        const retryAfterMs = parseRetryDelay(retryInfo?.retryDelay);

        if (/PerDay/i.test(quotaId)) {
            return { verdict: 'cooldown', reason: 'rate_limit_daily', retryAfterMs };
        }
        return { verdict: 'cooldown', reason: 'rate_limit', retryAfterMs };
    }

    // 7. 区域不支持 — 部署 / IP 问题，不是 key 健康问题
    if (statusCode === 400 && apiStatus === 'FAILED_PRECONDITION' && /User location is not supported/i.test(bodyStr)) {
        return { verdict: 'noop', reason: 'unknown' };
    }

    // 8. 5xx 服务端
    if (typeof statusCode === 'number' && statusCode >= 500) {
        return { verdict: 'cooldown', reason: 'server' };
    }

    // 9. 401 / 403（无 dead 标记）— 暂态 auth
    if (statusCode === 401 || statusCode === 403) {
        return { verdict: 'cooldown', reason: 'auth' };
    }

    // 10. 兜底：用旧分类器从消息字符串推断，并包成 cooldown
    if (message || typeof error === 'string') {
        const legacyReason = classifyError(typeof error === 'string' ? error : (error as Error) || new Error(message));
        return { verdict: 'cooldown', reason: legacyReason };
    }

    return { verdict: 'unknown' as any, reason: 'unknown', ...(typeof statusCode === 'number' ? {} : {}) } as ErrorVerdict;
}

/**
 * 把 ErrorVerdict 应用到 key 状态
 */
export function applyVerdict(provider: string, key: string, verdict: ErrorVerdict): void {
    switch (verdict.verdict) {
        case 'dead':
            disableKey(provider, key, verdict.disabledReason || verdict.reason);
            break;
        case 'cooldown':
            markKeyFailure(provider, key, verdict.reason);
            if (verdict.retryAfterMs && verdict.retryAfterMs > 0) {
                // 用服务端建议的 retryDelay 覆盖默认冷却
                const states = keyStates.get(provider);
                const state = states?.find(s => s.key === key);
                if (state && !state.disabled) {
                    state.cooldownUntil = Date.now() + verdict.retryAfterMs;
                }
            }
            break;
        case 'park':
            markKeyFailure(provider, key, verdict.reason);
            break;
        case 'noop':
        default:
            break;
    }
}
