import { mode } from '$lib/config';
import bot from './bot';
import webhook from './webhook';

if (import.meta.main) {
    if (mode === 'PRODUCTION') {
        await webhook();
    } else {
        bot.start({
            drop_pending_updates: true,
            onStart(botInfo) {
                console.log(mode, botInfo);
            },
        });
    }
}
