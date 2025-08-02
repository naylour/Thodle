import type z from 'zod/v4';
import { EnvConfigSchema } from './env';

export const RedisConfigSchema = EnvConfigSchema.pick({
    REDIS_NAME: true,
    REDIS_PASSWORD: true,
    REDIS_PORT: true
});

export type RedisConfigInputSchema = z.input<typeof RedisConfigSchema>;
export type RedisConfigSchema = z.infer<typeof RedisConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useRedisConfig = (data: any): RedisConfigSchema =>
    RedisConfigSchema.parse(data);
