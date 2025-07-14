import type { BotConfigInputSchema } from '@repo/env/bot';

declare module 'bun' {
    interface Env extends BotConfigInputSchema {}
}

export {};
