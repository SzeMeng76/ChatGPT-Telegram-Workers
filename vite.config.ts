import type { LibraryFormats, Plugin } from 'vite';
import * as path from 'node:path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import nodeExternals from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { createDockerPlugin } from './scripts/plugins/docker';
import { createVersionPlugin, versionDefine } from './scripts/plugins/version';

const { BUILD_MODE } = process.env;
const plugins: Plugin[] = [
    nodeResolve({
        preferBuiltins: true,
    }),
    cleanup({
        comments: 'none',
        extensions: ['js', 'ts'],
    }),
    checker({
        typescript: true,
    }),
];

let entry: string;
let outDir = 'dist';
let fileName = 'index';
let formats: LibraryFormats[] = ['es'];
switch (BUILD_MODE) {
    case 'plugins-page':
        entry = 'src/plugins/interpolate.ts';
        fileName = 'interpolate';
        outDir = 'plugins/dist';
        plugins.push(nodeExternals());
        break;
    case 'local':
        entry = 'src/adapter/local/index.ts';
        plugins.push(createDockerPlugin('dist'));
        plugins.push(nodeExternals());
        break;
    case 'vercel':
        entry = 'src/adapter/vercel/index.ts';
        plugins.push(nodeExternals());
        break;
    case 'pack':
        entry = 'src/index.ts';
        formats = ['es', 'cjs'];
        plugins.push(dts({
            rollupTypes: true,
        }));
        plugins.push(nodeExternals());
        break;
    default:
        entry = 'src/index.ts';
        plugins.push(createVersionPlugin('dist'));
        break;
}

export default defineConfig({
    plugins,
    build: {
        target: 'es2022',
        rollupOptions: {
            external: ['ws', '@ai-sdk/google-vertex', 'node:buffer', 'node:stream', 'base64-stream', 'fluent-ffmpeg', 'node-cron'],
        },
        lib: {
            entry: path.resolve(__dirname, entry),
            fileName,
            formats,
        },
        minify: false,
        outDir,
    },
    define: {
        ...versionDefine,
    },
});
