import { Api } from 'grammy';
import { mode, TELEGRAM_BOT_TOKEN } from '$lib/config';

export default new Api(TELEGRAM_BOT_TOKEN, {
    environment: mode === 'PRODUCTION' ? 'prod' : 'test',
    fetch: Bun.fetch,
});
