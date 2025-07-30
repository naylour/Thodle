import type { z } from 'zod/v4';
import { EnvConfigSchema } from './env';

export const AppConfigSchema = EnvConfigSchema.pick({
    APP_HOST: true,
    APP_IP: true,
    APP_NAME: true,
});

export type AppConfigInputSchema = z.input<typeof AppConfigSchema>;
export type AppConfigSchema = z.infer<typeof AppConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useAppConfig = (data: any): AppConfigSchema =>
    AppConfigSchema.parse(data);
