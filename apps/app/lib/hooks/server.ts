import { useEnvConfig } from '@repo/env';
import { sequence } from '@sveltejs/kit/hooks';
import { csrf } from './csrf';

const env = useEnvConfig(process.env);

const allowedPaths: string[] = [];

const APP_URL = new URL(env.APP_HOST);
APP_URL.hostname = `${env.SUB_MINIAPP_APP}.${APP_URL.hostname}`;

const allowedOrigins = [
    APP_URL.href,
    `http://localhost:${env.PORT_MINIAPP_APP}`,
]; // Trusted origins

console.log(allowedOrigins);

// Apply CSRF middleware in the request sequence
// export const handle = sequence(csrf(allowedPaths, allowedOrigins));
