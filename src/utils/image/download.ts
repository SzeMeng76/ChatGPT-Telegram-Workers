// 下载不受信任的图片 URL(例如 OpenAI 兼容接口返回的 `data[].url`)。
// 参考 vercel/ai 的 fetchWithValidatedRedirects / validateDownloadUrl:
// 1. 拒绝 localhost、内网、链路本地等地址(字面量检查,含 IPv4 映射的 IPv6)
// 2. 手动跟随重定向,每一跳都重新校验
// 3. 与开发者配置的接口同源(trustedOrigin)的地址不校验,以支持自建/本地部署
// 4. 不携带任何凭据
// 注意:Workers/浏览器运行时无法在连接阶段固定 DNS,域名解析到内网的情况需依赖运行时自身的网络隔离。

const MAX_REDIRECTS = 5;
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const REDIRECT_STATUS_CODES = new Set([301, 302, 303, 307, 308]);

function isIPv4(hostname: string): boolean {
    const parts = hostname.split('.');
    return parts.length === 4 && parts.every(p => /^\d{1,3}$/.test(p) && Number(p) <= 255 && String(Number(p)) === p);
}

function isPrivateIPv4(ip: string): boolean {
    const [a, b, c] = ip.split('.').map(Number);
    return a === 0 // 0.0.0.0/8
        || a === 10 // 10.0.0.0/8
        || (a === 100 && b >= 64 && b <= 127) // CGNAT
        || a === 127 // loopback
        || (a === 169 && b === 254) // link-local / metadata
        || (a === 172 && b >= 16 && b <= 31)
        || (a === 192 && b === 0 && (c === 0 || c === 2))
        || (a === 192 && b === 168)
        || (a === 198 && (b === 18 || b === 19))
        || (a === 198 && b === 51 && c === 100)
        || (a === 203 && b === 0 && c === 113)
        || a >= 224; // multicast / reserved
}

// 展开 IPv6 为 8 个 16 位分组,支持 `::` 压缩与末尾点分十进制 IPv4
function parseIPv6(ip: string): number[] | null {
    let address = ip.toLowerCase();
    const zone = address.indexOf('%');
    if (zone !== -1) {
        address = address.slice(0, zone);
    }
    const halves = address.split('::');
    if (halves.length > 2) {
        return null;
    }
    const toGroups = (segment: string): number[] | null => {
        if (segment === '') {
            return [];
        }
        const groups: number[] = [];
        const parts = segment.split(':');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part.includes('.')) {
                if (i !== parts.length - 1 || !isIPv4(part)) {
                    return null;
                }
                const [a, b, c, d] = part.split('.').map(Number);
                groups.push((a << 8) | b, (c << 8) | d);
            } else if (/^[0-9a-f]{1,4}$/.test(part)) {
                groups.push(Number.parseInt(part, 16));
            } else {
                return null;
            }
        }
        return groups;
    };
    const head = toGroups(halves[0]);
    if (!head) {
        return null;
    }
    if (halves.length === 2) {
        const tail = toGroups(halves[1]);
        if (!tail || 8 - head.length - tail.length < 0) {
            return null;
        }
        return [...head, ...Array.from<number>({ length: 8 - head.length - tail.length }).fill(0), ...tail];
    }
    return head.length === 8 ? head : null;
}

function isPrivateIPv6(ip: string): boolean {
    const g = parseIPv6(ip);
    if (!g) {
        return true; // 解析失败按不安全处理
    }
    const topZero = (n: number) => g.slice(0, n).every(x => x === 0);
    if (topZero(7) && (g[7] === 0 || g[7] === 1)) { // :: 和 ::1
        return true;
    }
    if ((g[0] & 0xFE00) === 0xFC00) { // fc00::/7
        return true;
    }
    if ((g[0] & 0xFFC0) === 0xFE80 || (g[0] & 0xFFC0) === 0xFEC0) { // fe80::/10, fec0::/10
        return true;
    }
    if ((g[0] & 0xFF00) === 0xFF00) { // multicast
        return true;
    }
    if (g[0] === 0x2001 && g[1] === 0x0DB8) { // documentation
        return true;
    }
    const embedsIPv4 = topZero(6) // ::/96
        || (topZero(5) && g[5] === 0xFFFF) // ::ffff:0:0/96
        || (g[0] === 0x0064 && g[1] === 0xFF9B && g.slice(2, 6).every(x => x === 0)); // NAT64
    if (embedsIPv4) {
        return isPrivateIPv4(`${g[6] >> 8}.${g[6] & 0xFF}.${g[7] >> 8}.${g[7] & 0xFF}`);
    }
    return false;
}

/**
 * 校验 URL 是否可以安全下载,不安全时抛出异常。
 */
export function assertSafeDownloadUrl(url: string): URL {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        throw new Error(`Invalid image URL: ${url}`);
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error(`Image URL scheme must be http or https, got ${parsed.protocol}`);
    }
    const hostname = parsed.hostname.toLowerCase().replace(/\.+$/, '');
    if (!hostname) {
        throw new Error('Image URL must have a hostname');
    }
    if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
        throw new Error(`Image URL with hostname ${hostname} is not allowed`);
    }
    if (hostname.startsWith('[') && hostname.endsWith(']')) {
        if (isPrivateIPv6(hostname.slice(1, -1))) {
            throw new Error(`Image URL with IPv6 address ${hostname} is not allowed`);
        }
    } else if (isIPv4(hostname) && isPrivateIPv4(hostname)) {
        throw new Error(`Image URL with IP address ${hostname} is not allowed`);
    }
    return parsed;
}

function isSameOrigin(url: string, origin: string): boolean {
    try {
        return new URL(url).origin === new URL(origin).origin;
    } catch {
        return false;
    }
}

export interface DownloadImageOptions {
    /** 开发者配置的接口 origin(如 OAILIKE_API_BASE),同源地址跳过内网校验。不要从响应数据派生。 */
    trustedOrigin?: string;
    signal?: AbortSignal;
    maxBytes?: number;
}

/**
 * 下载图片并返回 Blob。每一跳重定向都会重新校验,且不携带任何请求头凭据。
 */
export async function downloadImage(url: string, options: DownloadImageOptions = {}): Promise<Blob> {
    const { trustedOrigin, signal, maxBytes = MAX_IMAGE_BYTES } = options;
    let current = url;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
        if (!trustedOrigin || !isSameOrigin(current, trustedOrigin)) {
            assertSafeDownloadUrl(current);
        }
        const resp = await fetch(current, { redirect: 'manual', signal });
        // 日志和报错中只保留 origin,避免泄露带签名的查询参数
        const label = new URL(current).origin;

        if (resp.type === 'opaqueredirect') {
            throw new Error(`Redirect from ${label} could not be validated and was blocked`);
        }
        const location = resp.headers.get('location');
        if (REDIRECT_STATUS_CODES.has(resp.status) && location) {
            void resp.body?.cancel().catch(() => {});
            current = new URL(location, current).toString();
            continue;
        }
        if (!resp.ok) {
            void resp.body?.cancel().catch(() => {});
            throw new Error(`Image download failed: ${resp.status} ${resp.statusText} (${label})`);
        }
        const contentLength = Number(resp.headers.get('content-length'));
        if (contentLength > maxBytes) {
            void resp.body?.cancel().catch(() => {});
            throw new Error(`Image too large: ${contentLength} bytes (max ${maxBytes})`);
        }
        const blob = await resp.blob();
        if (blob.size > maxBytes) {
            throw new Error(`Image too large: ${blob.size} bytes (max ${maxBytes})`);
        }
        return blob;
    }
    throw new Error(`Too many redirects (max ${MAX_REDIRECTS})`);
}
