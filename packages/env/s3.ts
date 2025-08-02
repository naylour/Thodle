import type z from 'zod/v4';
import { EnvConfigSchema } from './env';

export const S3ConfigSchema = EnvConfigSchema.pick({
    S3_ACCESS_KEY: true,
    S3_ACCESS_SECRET_KEY: true,
    S3_API_ENDPOINT: true,
    S3_PATH: true,
    S3_PATH_HOSTED_STYLE: true,
    S3_PROJECT_ID: true,
    S3_BUCKET_NAME: true
});

export type S3ConfigInputSchema = z.input<typeof S3ConfigSchema>;
export type S3ConfigSchema = z.infer<typeof S3ConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useS3Config = (data: any): S3ConfigSchema =>
    S3ConfigSchema.parse(data);
