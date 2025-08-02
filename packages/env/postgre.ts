import type z from 'zod/v4';
import { EnvConfigSchema } from './env';

export const PostgreConfigSchema = EnvConfigSchema.pick({
    POSTGRE_DB: true,
    POSTGRE_HOST: true,
    POSTGRE_PASSWORD: true,
    POSTGRE_PORT: true,
    POSTGRE_USER: true,
    POSTGRE_NAME: true
});

export type PostgreConfigInputSchema = z.input<typeof PostgreConfigSchema>;
export type PostgreConfigSchema = z.infer<typeof PostgreConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const usePostgreConfig = (data: any): PostgreConfigSchema =>
    PostgreConfigSchema.parse(data);
