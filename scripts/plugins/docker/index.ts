import * as fs from 'node:fs/promises';
import path from 'node:path';

const dockerfile = `
FROM node:alpine as PROD

WORKDIR /app
COPY index.js package.json /app/
RUN apk add --no-cache sqlite ffmpeg git && \
    npm install --only=production --omit=dev && \
    npm cache clean --force
EXPOSE 8787
CMD ["npm", "run", "start"]
`;

const packageJson = `
{
  "name": "chatgpt-telegram-workers",
  "type": "module",
  "version": "1.8.0",
  "author": "TBXark",
  "license": "MIT",
  "module": "index.js",
  "scripts": {
    "start": "node index.js",
    "postinstall": "cd node_modules/cloudflare-worker-adapter && npm install && npm run build"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "^1.0.5",
    "@ai-sdk/azure": "^1.0.10",
    "@ai-sdk/cohere": "^1.0.5",
    "@ai-sdk/google": "^1.0.9",
    "@ai-sdk/google-vertex": "^2.0.7",
    "@ai-sdk/mistral": "^1.0.5",
    "@ai-sdk/openai": "^1.0.8",
    "@ai-sdk/xai": "^1.0.6",
    "ai": "^4.0.14",
    "base64-stream": "^1.0.0",
    "cloudflare-worker-adapter": "github:adolphnov/cloudflare-worker-adapter",
    "fluent-ffmpeg": "^2.1.3",
    "node-cron": "^3.0.3"
  },
  "devDependencies": {}
}
`;

export function createDockerPlugin(targetDir: string) {
    return {
        name: 'docker',
        async closeBundle() {
            await fs.writeFile(path.resolve(targetDir, 'Dockerfile'), dockerfile.trim());
            await fs.writeFile(path.resolve(targetDir, 'package.json'), packageJson.trim());
        },
    };
}
