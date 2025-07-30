import { commands } from '@grammyjs/commands';
import { Bot } from 'grammy';

import { baseCommands } from '$lib/commands';
import { mode, TELEGRAM_BOT_TOKEN } from '$lib/config';

const bot = new Bot<Bot.Context>(TELEGRAM_BOT_TOKEN, {
    client: {
        environment: mode === 'PRODUCTION' ? 'prod' : 'test',
        fetch: Bun.fetch,
    },
});


// bot.use(parseMode)
bot.use(commands());
bot.use(baseCommands);

await baseCommands.setCommands(bot);

export default bot;

export { webhookCallback } from 'grammy';
