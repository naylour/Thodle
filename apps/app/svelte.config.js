import { resolve } from 'node:path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from 'svelte-adapter-bun-next';

/** @type {import('@sveltejs/kit').Config} */
export default {
    kit: {
        adapter: adapter(),
        alias: {
            $components: resolve('src', 'components'),
            $sections: resolve('src', 'sections'),
            $stores: resolve('lib', 'stores'),
            $styles: resolve('src', 'styles'),
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
    },
    preprocess: [vitePreprocess()],
};
