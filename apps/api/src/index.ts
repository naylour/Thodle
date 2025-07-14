import { Elysia } from 'elysia';

import { apiConfig, mode } from '$lib/config';

const app = new Elysia()
    .get('/', 'Hello, world!')
    .listen(apiConfig.PORT_API_APP);

export default app.fetch;

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${mode} mode`,
);
