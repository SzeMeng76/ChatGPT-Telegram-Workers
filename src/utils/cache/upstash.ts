export class UpstashRedis {
    private baseUrl: string;
    private token: string;

    constructor(baseUrl: string, token: string) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    // upstash REST API
    async fetchFromRedis(method = 'GET', body: any = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
        };
        const options: RequestInit = {
            method,
            headers,
            ...(body ? { body: JSON.stringify(body) } : {}),
        };

        const response = await fetch(this.baseUrl, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch from Redis: ${response.statusText}`);
        }
        return response.json();
    }

    async get(key: string, info: any) {
        try {
            const data = ['get', key];
            const raw = await this.fetchFromRedis('POST', data);
            if (!raw) {
                return null;
            }
            switch (info?.type || 'string') {
                case 'string':
                    return raw.result;
                case 'json':
                    return JSON.parse(raw.result);
                case 'arrayBuffer':
                    return new Uint8Array(raw).buffer;
                default:
                    return raw.result;
            }
        } catch (error) {
            console.error(`Error getting key ${key}:`, error);
            return null;
        }
    }

    async mget(keys: string[], info?: any) {
        try {
            const data = ['mget'];
            data.push(...keys);
            const raw = await this.fetchFromRedis('POST', data);
            if (!raw) {
                return null;
            }
            switch (info?.type || 'string') {
                case 'string':
                    return raw.result;
                case 'json':
                    return raw.result.map((i: string) => JSON.parse(i));
                case 'arrayBuffer':
                    return raw.result.map((i: string) => new Uint8Array(Buffer.from(i)));
                default:
                    return raw.result;
            }
        } catch (error) {
            console.error(`Error getting keys ${keys}:`, error);
            return null;
        }
    }

    async put(key: string, value: any, info: any) {
        const data = ['set', key, value];
        if (info?.expiration) {
            data.push(...['exat', info.expiration]);
        } else if (info?.expirationTtl) {
            data.push(...['ex', info.expirationTtl]);
        }
        if (info?.condition === 'NX') {
            data.push(...['nx']);
        } else if (info?.condition === 'XX') {
            data.push(...['xx']);
        }
        return this.fetchFromRedis('POST', data)
            .then(res => info?.condition && ['NX', 'XX']
                .includes(info.condition)
                ? res.result === 'OK'
                : undefined);
    }

    async delete(key: string | string[]) {
        const data = ['del'];
        Array.isArray(key) ? data.push(...key) : data.push(key);
        return this.fetchFromRedis('POST', data);
    }
}
