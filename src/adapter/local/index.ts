import type { GetUpdatesResponse } from 'telegram-bot-api-types';
import type { TelegramBotAPI } from '../../telegram/api';
import * as fs from 'node:fs';
import { createCache } from 'cf-worker-adapter/cache';
import { installFetchProxy } from 'cf-worker-adapter/proxy';
import { defaultRequestBuilder, initEnv, startServerV2 } from 'cf-worker-adapter/serve';
import { schedule } from 'node-cron';
import worker from '../../';
import { ENV } from '../../config/env';
import { createRouter } from '../../route/index';
import { createTelegramBotAPI } from '../../telegram/api';
import { handleUpdate } from '../../telegram/handler';

const {
    CONFIG_PATH = '/app/config.json',
    TOML_PATH = '/app/config.toml',
} = process.env;

interface Config {
    database: {
        type: 'memory' | 'local' | 'sqlite' | 'redis';
        path?: string;
    };
    server?: {
        hostname?: string;
        port?: number;
        baseURL: string;
    };
    proxy?: string;
    mode: 'webhook' | 'polling';
}

// 读取配置文件
const config: Config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

if (config.proxy) {
    installFetchProxy(config.proxy);
}

// 初始化数据库
const cache = createCache(config?.database?.type, {
    uri: config.database.path || '',
});
console.log(`database: ${config?.database?.type} is ready`);

// 初始化环境变量
const env = initEnv(TOML_PATH, { DATABASE: cache });
ENV.merge(env);

// long polling 模式
async function runPolling() {
    const clients: Record<string, TelegramBotAPI> = {};
    const offset: Record<string, number> = {};
    for (const token of ENV.TELEGRAM_AVAILABLE_TOKENS) {
        offset[token] = 0;
        const api = createTelegramBotAPI(token);
        clients[token] = api;
        const name = await api.getMeWithReturns();
        await api.deleteWebhook({});
        console.log(`@${name.result.username} Webhook deleted, If you want to use webhook, please set it up again.`);
    }

    ENV.TELEGRAM_AVAILABLE_TOKENS.forEach(async (token) => {
        while (true) {
            try {
                const resp = await clients[token].getUpdates({
                    offset: offset[token],
                    timeout: 30,
                });
                if (resp.status === 429) {
                    const retryAfter = Number.parseInt(resp.headers.get('Retry-After') || '');
                    if (retryAfter) {
                        console.log(`Rate limited, retry after ${retryAfter} seconds`);
                        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                        continue;
                    }
                }
                const { result } = await resp.json() as GetUpdatesResponse;
                for (const update of result) {
                    if (update.update_id >= offset[token]) {
                        offset[token] = update.update_id + 1;
                    }
                    setImmediate(async () => {
                        await handleUpdate(token, update).catch(console.error);
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    });
}

try {
    // 定时任务
    if (env.EXPIRED_TIME > 0 && env.CRON_CHECK_TIME) {
        try {
            schedule(env.CRON_CHECK_TIME, async () => await worker.scheduled({} as Event, env, null));
        } catch (e) {
            console.error('Failed to schedule cron job:', e);
        }
    }
} catch (e) {
    console.log(e);
}

// 启动服务
if (config.mode === 'webhook' && config.server !== undefined) {
    const router = createRouter();
    startServerV2(
        config.server.port || 8787,
        config.server.hostname || '0.0.0.0',
        env,
        { baseURL: config.server.baseURL },
        defaultRequestBuilder,
        router.fetch.bind(router),
    );
} else {
    runPolling().catch(console.error);
}
