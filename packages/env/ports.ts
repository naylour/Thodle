import type z from 'zod/v4';
import { EnvConfigSchema } from './env';

export const PortsConfigSchema = EnvConfigSchema.pick({
    PORT_ADMIN_APP: true,
    PORT_API_APP: true,
    PORT_BOT_APP: true,
    PORT_MINIAPP_APP: true,
});

export type PortsConfigInputSchema = z.input<typeof PortsConfigSchema>;
export type PortsConfigSchema = z.infer<typeof PortsConfigSchema>;

// biome-ignore lint/suspicious/noExplicitAny: true
export const usePortsConfig = (data: any): PortsConfigSchema =>
    PortsConfigSchema.parse(data);
