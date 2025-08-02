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

import { InlineKeyboard, InlineQueryResultBuilder } from "grammy";

// Build a photo result.
InlineQueryResultBuilder.photo("id-0", "https://grammy.dev/images/grammY.png");

// Build a result that displays a photo but sends a text message.
InlineQueryResultBuilder.photo("id-1", "https://grammy.dev/images/grammY.png")
  .text("This text will be sent instead of the photo");

// Build a text result.
InlineQueryResultBuilder.article("id-2", "Inline Queries")
  .text("Great inline query docs: grammy.dev/plugins/inline-query");

// Pass further options to the result.
const keyboard = new InlineKeyboard()
  .text("Aw yis", "call me back");
InlineQueryResultBuilder.article("id-3", "Hit me", { reply_markup: keyboard })
  .text("Push my buttons");

// Pass further options to the message content.
InlineQueryResultBuilder.article("id-4", "Inline Queries")
  .text("**Outstanding** docs: grammy.dev", { parse_mode: "MarkdownV2" });

bot.inlineQuery(/best bot (framework|library)/, async (ctx) => {
  // Create a single inline query result.
  const result = InlineQueryResultBuilder
    .article("id:grammy-website", "grammY", {
      reply_markup: new InlineKeyboard()
        .url("grammY website", "https://grammy.dev/"),
    })
    .text(
      `<b>grammY</b> is the best way to create your own Telegram bots.
They even have a pretty website! 👇`,
      { parse_mode: "HTML" },
    );

  // Answer the inline query.
  await ctx.answerInlineQuery(
    [result], // answer with result list
    { cache_time: 30 * 24 * 3600 }, // 30 days in seconds
  );
});

export default bot;

export { webhookCallback } from 'grammy';
