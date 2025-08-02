import { usePortsConfig } from '@repo/env/ports';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const ports = usePortsConfig(process.env);

export default defineConfig({
    build: {
        cssMinify: 'lightningcss',
        rollupOptions: {},
    },
    plugins: [tailwindcss(), sveltekit()],
    server: {
        port: ports.PORT_MINIAPP_APP,
    },
});
