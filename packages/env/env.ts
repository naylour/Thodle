import { z } from 'zod/v4';

export const EnvConfigSchema = z.object({
    APP_NAME: z.string(),
    APP_HOST: z.url(),
    APP_IP: z.ipv4(),

    MODE: z.literal(['DEVELOPMENT', 'PRODUCTION', 'BUILDING', 'PREVIEW']),

    PORT_BOT_APP: z.coerce.number(),
    PORT_MINIAPP_APP: z.coerce.number(),
    PORT_API_APP: z.coerce.number(),
    PORT_ADMIN_APP: z.coerce.number(),

    SUB_BOT_APP: z.string(),
    SUB_MINIAPP_APP: z.string(),
    SUB_API_APP: z.string(),
    SUB_ADMIN_APP: z.string(),

    TELEGRAM_BOT_TOKEN: z.string().min(10),
    TELEGRAM_BOT_TESTING_TOKEN: z.string().min(10),
});

export type EnvConfigInputSchema = z.input<typeof EnvConfigSchema>;
export type EnvConfigSchema = z.infer<typeof EnvConfigSchema>;

export const useEnvConfig = (data: any): EnvConfigSchema =>
    EnvConfigSchema.parse(data);
