import z from 'zod';
import { EnvConfigSchema } from './env';

export const APIConfigSchema = EnvConfigSchema.pick({
    PORT_API_APP: true,
});

export type APIConfigSchema = z.infer<typeof APIConfigSchema>;
export type APIConfigInputSchema = z.input<typeof APIConfigSchema>;

export const useAPIConfig = (env: any): APIConfigSchema =>
    APIConfigSchema.parse(env);
