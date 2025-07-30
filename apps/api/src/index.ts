import { Elysia } from 'elysia';
import { apiConfig, mode } from '$lib/config';
import routes from './routes';

const app = new Elysia({
    analytic: true,
    name: 'Api Application',
    precompile: true,
})
    .use(routes)
    .get('/', 'Hello, world!')
    .listen(apiConfig.PORT_API_APP);

export default app.fetch;

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${mode} mode`,
);
