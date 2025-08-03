import { Elysia } from 'elysia';
import { cors
 } from '@elysiajs/cors'
import { apiConfig, mode } from '$lib/config';
import routes from './routes';
import docs from './docs';

const app = new Elysia({
    analytic: true,
    name: 'Api Application',
    precompile: true,
})
    .use(docs)
    .use(cors({
        credentials: true,
        origin: ['192.168.31.82:50000']
    }))
    .use(routes)
    .listen(apiConfig.PORT_API_APP);

export default app.fetch;

export type API = typeof app;

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${mode} mode`,
);
