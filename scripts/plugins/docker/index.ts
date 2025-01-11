import * as fs from 'node:fs/promises';
import path from 'node:path';

const dockerfile = `
FROM node:20-alpine as PROD

WORKDIR /app
COPY index.js package.json /app/
RUN npm install --only=production && \
apk add --no-cache sqlite && \
npm cache clean --force
EXPOSE 8787
CMD ["npm", "run", "start"]
`;

const packageJson = `
{
  "name": "chatgpt-telegram-workers",
  "type": "module",
  "version": "2.4.0",
  "author": "TBXark",
  "license": "MIT",
  "module": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "^1.0.8",
    "@ai-sdk/azure": "^1.0.19",
    "@ai-sdk/cohere": "^1.0.8",
    "@ai-sdk/google": "^1.0.15",
    "@ai-sdk/google-vertex": "^2.0.16",
    "@ai-sdk/mistral": "^1.0.8",
    "@ai-sdk/openai": "^1.0.17",
    "@ai-sdk/provider": "^1.0.4",
    "@ai-sdk/xai": "^1.0.17",
    "@ffmpeg.wasm/core-st": "^0.13.2",
    "@ffmpeg.wasm/main": "^0.13.1",
    "ai": "^4.0.33",
    "cf-worker-adapter": "^1.4.0",
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
