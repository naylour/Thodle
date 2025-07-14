import { usePortsConfig } from '@repo/env';
import { useDeviceHosts } from '@repo/utils';

import { isTestEnv, botConfig } from '$lib/config';

import { Bot } from 'grammy';

const ports = usePortsConfig(Bun.env);
const deviceHosts = useDeviceHosts();

const bot = new Bot(
    isTestEnv
        ? botConfig.TELEGRAM_BOT_TESTING_TOKEN
        : botConfig.TELEGRAM_BOT_TOKEN,
    {
        client: {
            environment: isTestEnv ? 'test' : 'prod',
            fetch: Bun.fetch,
        },
    },
);

bot.command('start', async (__context__) => {
    await __context__.reply('Hi, How are you!');
});

bot.command('app', async (__context__) => {
    if (!isTestEnv) {
        await __context__.reply('Недоступно!');
        return;
    }

    if (deviceHosts.length) {
        const url = new URL(`http:${deviceHosts[0]}`);
        url.protocol = 'http';
        url.port = `${ports.PORT_ADMIN_APP}`;

        await __context__.reply('Nate', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open MiniApp',
                            web_app: {
                                url: url.href,
                            },
                        },
                    ],
                ],
            },
        });
    } else {
        await __context__.reply('Не удалось сгенерировать ссылку!');
    }
});

export default bot;
