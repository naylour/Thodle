import type z from 'zod/v4';
import { EnvConfigSchema } from './env';

export const ModeSchema = EnvConfigSchema.pick({
    MODE: true,
});
export type ModeSchema = z.infer<typeof ModeSchema.shape.MODE>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const useMode = (env: any): ModeSchema => ModeSchema.parse(env).MODE;
