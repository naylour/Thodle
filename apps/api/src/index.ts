import { Elysia } from 'elysia';
import { apiConfig, mode } from '$lib/config';
import routes from './routes';
import docs from './docs';

const app = new Elysia({
    analytic: true,
    name: 'Api Application',
    precompile: true,
})
    .use(docs)
    .use(routes)
    .listen(apiConfig.PORT_API_APP);

export default app.fetch;

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${mode} mode`,
);
