import { z } from 'zod/v4';
import { EnvConfigSchema } from './env';

export const BotConfigSchema = EnvConfigSchema.pick({
    PORT_BOT_APP: true,
    TELEGRAM_BOT_TESTING_TOKEN: true,
    TELEGRAM_BOT_TOKEN: true,
});

export type BotConfigInputSchema = z.input<typeof BotConfigSchema>;
export type BotConfigSchema = z.infer<typeof BotConfigSchema>;

export const useBotConfig = (data: any): BotConfigSchema =>
    BotConfigSchema.parse(data);
