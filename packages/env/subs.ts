import type z from 'zod';
import { EnvConfigSchema } from './env';

export const SubsConfigSchema = EnvConfigSchema.pick({
    SUB_ADMIN_APP: true,
    SUB_API_APP: true,
    SUB_BOT_APP: true,
    SUB_MINIAPP_APP: true,
});

export type SubsConfigInputSchema = z.input<typeof SubsConfigSchema>;
export type SubsConfigSchema = z.infer<typeof SubsConfigSchema>;

export const useSubsConfig = (data: any): SubsConfigSchema =>
    SubsConfigSchema.parse(data);
