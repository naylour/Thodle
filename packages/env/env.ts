import { z } from 'zod/v4';

export const EnvConfigSchema = z.object({
    APP_HOST: z.url().default('http://localhost'),
    APP_IP: z.ipv4().default('0.0.0.0'),
    APP_NAME: z.string().default('Application'),

    MODE: z
        .literal(['DEVELOPMENT', 'PRODUCTION', 'BUILDING', 'PREVIEW'])
        .default('DEVELOPMENT'),

    PORT_ADMIN_APP: z.coerce.number().default(50003),
    PORT_API_APP: z.coerce.number().default(50002),
    PORT_BOT_APP: z.coerce.number().default(50001),
    PORT_MINIAPP_APP: z.coerce.number().default(50000),

    POSTGRE_DB: z.string(),
    POSTGRE_HOST: z.string().default('localhost'),
    POSTGRE_NAME: z.string(),
    POSTGRE_PASSWORD: z.string().uuidv7(),
    POSTGRE_PORT: z.coerce.number().default(51000),
    POSTGRE_URL: z.string(),

    POSTGRE_USER: z.string(),

    REDIS_NAME: z.string(),
    REDIS_PASSWORD: z.string().uuidv7(),
    REDIS_PORT: z.coerce.number().default(51001),

    S3_ACCESS_KEY: z.string(),
    S3_ACCESS_SECRET_KEY: z.string(),
    S3_API_ENDPOINT: z.string().url(),
    S3_PATH: z.string().url(),
    S3_PATH_HOSTED_STYLE: z.string().url(),
    S3_PROJECT_ID: z.string(),
    S3_BUCKET_NAME: z.string(),

    SUB_ADMIN_APP: z.string().default('admin'),
    SUB_API_APP: z.string().default('api'),
    SUB_BOT_APP: z.string().default('bot'),
    SUB_MINIAPP_APP: z.string().default('app'),

    TELEGRAM_BOT_TOKEN: z.string().min(10),
});

export type EnvConfigInputSchema = z.input<typeof EnvConfigSchema>;
export type EnvConfigSchema = z.infer<typeof EnvConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useEnvConfig = (data: any): EnvConfigSchema =>
    EnvConfigSchema.parse(data);
