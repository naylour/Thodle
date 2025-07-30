import type { CommandsFlavor } from '@grammyjs/commands';
import type { Context as GrammyContext } from 'grammy';

declare global {
    namespace Bot {
        type Context = GrammyContext &
            CommandsFlavor<GrammyContext>;
    }
}

export {};
