import {
    config,
    SECRET_PATHNAME,
    SECRET_TOKEN,
    WEBHOOK_URL,
} from '$lib/config';
import api from './api';
import bot, { webhookCallback } from './bot';

const setWebhook = async () => {
    const deleteResult = await api.deleteWebhook({
        drop_pending_updates: true,
    });

    if (deleteResult) console.debug('Webhook удалён!');

    const setResult = await api.setWebhook(WEBHOOK_URL.href, {
        drop_pending_updates: true,
        ip_address: config.APP_HOST,
        secret_token: SECRET_TOKEN,
    });

    if (setResult) console.debug('Webhook установлен!');
};

export default async () => {
    const handleUpdate = webhookCallback(bot, 'std/http', {
        secretToken: SECRET_TOKEN,
    });

    await setWebhook();

    await bot.init();

    Bun.serve({
        fetch: (req, server) => {
            const url = new URL(req.url);

            const XTelegramBotApiSecretToken = req.headers.get(
                'X-Telegram-Bot-Api-Secret-Token',
            );

            if (
                req.method === 'POST' &&
                url.pathname === `/${SECRET_PATHNAME}` &&
                XTelegramBotApiSecretToken &&
                XTelegramBotApiSecretToken === SECRET_TOKEN
            ) {
                try {
                    return handleUpdate(req);
                } catch {
                    return new Response();
                }
            }

            return new Response();
        },
        port: config.PORT_BOT_APP,
    });
};
