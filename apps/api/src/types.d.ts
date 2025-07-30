import type { APIConfigInputSchema } from '@repo/env/api';

declare module 'bun' {
    interface Env extends APIConfigInputSchema {}
}

export {};
