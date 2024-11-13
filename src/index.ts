/* eslint-disable unused-imports/no-unused-vars */
import { ENV } from './config/env';
import { createRouter } from './route';
import { tasks } from './tools';
import { UpstashRedis } from './utils/cache/upstash';

export default {
    async fetch(request: Request, env: any): Promise<Response> {
        try {
            if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
                env.DATABASE = new UpstashRedis(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN);
            }
            ENV.merge(env);
            return createRouter().fetch(request);
        } catch (e) {
            console.error(e);
            return new Response(JSON.stringify({
                message: (e as Error).message,
                stack: (e as Error).stack,
            }), { status: 500 });
        }
    },
    async scheduled(event: Event, env: any, ctx: any) {
        try {
            if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
                env.DATABASE = new UpstashRedis(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN);
            }
            const promises = [];
            for (const task of Object.values(tasks)) {
                promises.push(task(env));
            }
            await Promise.all(promises);
            console.log('All tasks done.');
        } catch (e) {
            console.error('Error in scheduled tasks:', e);
        }
    },
};
