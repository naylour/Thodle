import { useBotConfig } from '@repo/env/bot';
import { useMode } from '@repo/env/mode';
import { parse } from 'tldts';
import { ulid } from 'ulid';


export const mode = useMode(Bun.env);
export const config = useBotConfig(Bun.env);
export const SECRET_PATHNAME = ulid();
export const SECRET_TOKEN = ulid();


export const TELEGRAM_BOT_TOKEN =
    config[
        mode === 'PRODUCTION'
            ? 'TELEGRAM_BOT_TOKEN'
            : 'TELEGRAM_BOT_TESTING_TOKEN'
    ];


export const WEBHOOK_URL = new URL(config.APP_HOST)

WEBHOOK_URL.hostname = `${config.SUB_BOT_APP}.${WEBHOOK_URL.hostname}`;
WEBHOOK_URL.pathname = SECRET_PATHNAME;
