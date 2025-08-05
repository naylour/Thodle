import type { z } from 'zod/v4';
import { EnvConfigSchema } from './env';

export const APIConfigSchema = EnvConfigSchema.pick({
    PORT_API_APP: true,
    APP_HOST: true,

});

export type APIConfigSchema = z.infer<typeof APIConfigSchema>;
export type APIConfigInputSchema = z.input<typeof APIConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useAPIConfig = (env: any): APIConfigSchema =>
    APIConfigSchema.parse(env);
