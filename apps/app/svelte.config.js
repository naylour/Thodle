import { resolve } from 'node:path';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
    compilerOptions: {
        experimental: {
            async: true,
        },
    },
    kit: {
        adapter: adapter(),
        alias: {
            $components: resolve('src', 'components'),
            $remotes: resolve('lib', 'remotes'),
            $sections: resolve('src', 'sections'),
            $stores: resolve('lib', 'stores'),
            $styles: resolve('src', 'styles'),
        },
        experimental: {
            remoteFunctions: true,
        },
        files: {
            appTemplate: resolve('template', 'index.html'),
            assets: resolve('static'),
            errorTemplate: resolve('template', 'error.html'),
            hooks: {
                client: resolve('lib', 'hooks', 'client.ts'),
                server: resolve('lib', 'hooks', 'server.ts'),
                universal: resolve('lib', 'hooks', 'universal.ts'),
            },
            lib: resolve('lib'),
            params: resolve('template', 'params'),
            routes: resolve('template', 'routes'),
            serviceWorker: resolve('src', 'service-worker.ts'),
        },
        // csrf: {
        //     checkOrigin: false,
        // },
        output: {
            bundleStrategy: 'single',
            preloadStrategy: 'modulepreload',
        },
    },
    preprocess: [vitePreprocess()],
};
