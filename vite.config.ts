import type { LibraryFormats, Plugin } from 'vite';
import * as path from 'node:path';
import cleanup from 'rollup-plugin-cleanup';
import nodeExternals from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
// import dts from 'vite-plugin-dts';
import { createDockerPlugin } from './scripts/plugins/docker';
import { createVersionPlugin, versionDefine } from './scripts/plugins/version';

const { BUILD_MODE } = process.env;
const plugins: Plugin[] = [
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
        // plugins.push(dts({
        //     rollupTypes: true,
        // }));
        plugins.push(nodeExternals());
        break;
    default:
        entry = 'src/index.ts';
        plugins.push(createVersionPlugin('dist'));
        break;
}

export default defineConfig({
    plugins,
    test: {
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            // Manual debug/demo scripts named *.test.ts but not real vitest suites:
            // no describe/it blocks, meant to be run individually and eyeballed
            // (interpolate/template use console.assert; mcp/index makes real
            // external calls that need env vars and a live MCP server process).
            'src/plugins/interpolate.test.ts',
            'src/plugins/template.test.ts',
            'src/mcp/index.test.ts',
        ],
    },
    build: {
        target: 'es2022',
        rollupOptions: {
            external: [
                'ws',
                '@ai-sdk/google-vertex',
                '@ai-sdk/mcp',
                '@ai-sdk/mcp/mcp-stdio',
                'node:buffer',
                'node-cron',
                'child_process',
                'node:child_process',
                'node:fs',
                'node:path',
                'node:fs/promises',
            ],
        },
        lib: {
            entry: path.resolve(__dirname, entry),
            fileName,
            formats,
        },
        outDir,
        minify: false,
        emptyOutDir: true,
    },
    define: {
        ...versionDefine,
    },
});
