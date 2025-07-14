import type z from 'zod';
import { EnvConfigSchema } from './env';

export const ModeSchema = EnvConfigSchema.pick({
    MODE: true,
});
export type ModeSchema = z.infer<typeof ModeSchema.shape.MODE>;

export const useMode = (env: any): ModeSchema => ModeSchema.parse(env).MODE;
