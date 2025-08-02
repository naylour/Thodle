import { Composer } from 'grammy';

export const composer = new Composer();

composer.on('message', async (ctx) => {
    await ctx.reply(ctx.message?.text ?? '');
});
