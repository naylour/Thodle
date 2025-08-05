import { Elysia } from 'elysia';
import { etag } from '@bogeychan/elysia-etag';
import logixlysia from 'logixlysia'

import { apiConfig, mode } from '$lib/config';
import routes from './routes';
import docs from './docs';
import origin from './origin';

const app = new Elysia({
    analytic: true,
    name: 'Api Application',
    precompile: true,
})
    .use(
        logixlysia({
            config: {
              showStartupMessage: true,
              startupMessageFormat: 'simple',
              timestamp: {
                translateTime: 'yyyy-mm-dd HH:MM:ss'
              },
              ip: true
            }
          })
    )
    .use(docs)
    .use(origin())
    .use(etag({
        algorithm: 'sha512',
    }))
    .use(routes)
    .listen(apiConfig.PORT_API_APP);

export default app.fetch;

export type API = typeof app;

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${mode} mode`,
);
