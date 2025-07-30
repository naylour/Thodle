import { z } from 'zod/v4';

export const EnvConfigSchema = z.object({
    APP_HOST: z.url().default('https://thodle.tech'),
    APP_IP: z.ipv4().default('0.0.0.0'),
    APP_NAME: z.string().default('Application'),

    MODE: z
        .literal(['DEVELOPMENT', 'PRODUCTION', 'BUILDING', 'PREVIEW'])
        .default('DEVELOPMENT'),
    PORT_ADMIN_APP: z.coerce.number().default(50003),
    PORT_API_APP: z.coerce.number().default(50002),
    PORT_BOT_APP: z.coerce.number().default(50001),

    PORT_MINIAPP_APP: z.coerce.number().default(50000),
    SUB_ADMIN_APP: z.string().default('admin'),
    SUB_API_APP: z.string().default('api'),

    SUB_BOT_APP: z.string().default('bot'),
    SUB_MINIAPP_APP: z.string().default('app'),
    TELEGRAM_BOT_TESTING_TOKEN: z.string().min(10),

    TELEGRAM_BOT_TOKEN: z.string().min(10),
});

export type EnvConfigInputSchema = z.input<typeof EnvConfigSchema>;
export type EnvConfigSchema = z.infer<typeof EnvConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useEnvConfig = (data: any): EnvConfigSchema =>
    EnvConfigSchema.parse(data);
