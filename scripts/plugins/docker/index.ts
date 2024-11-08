import * as fs from 'node:fs/promises';
import path from 'node:path';

const dockerfile = `
FROM node:alpine as PROD

WORKDIR /app
COPY index.js package.json /app/
RUN npm install --only=production --omit=dev && \
apk add --no-cache sqlite && \
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
    "start": "node index.js"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "^0.0.56",
    "@ai-sdk/azure": "^0.0.52",
    "@ai-sdk/cohere": "^0.0.28",
    "@ai-sdk/google": "^0.0.55",
    "@ai-sdk/google-vertex": "^0.0.43",
    "@ai-sdk/mistral": "^0.0.46",
    "@ai-sdk/openai": "^0.0.72",
    "ai": "^3.4.33",
    "cloudflare-worker-adapter": "^1.3.3",
    "@google-cloud/vertexai": "^1.9.0",
    "node-cron": "^3.0.3",
    "ws": "^8.18.0"
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
