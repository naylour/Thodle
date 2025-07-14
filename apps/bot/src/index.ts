import bot from './bot';

import { mode } from '$lib/config';

if (import.meta.main) {
    bot.start({
        onStart(botInfo) {
            console.log(`Bot started in ${mode} mode!`);
        },
    });
}
