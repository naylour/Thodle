import { useAPIConfig } from '@repo/env/api';
import { useMode } from '@repo/env/mode';
import { usePortsConfig } from '@repo/env/ports';
import { useSubsConfig } from '@repo/env/subs';

export const apiConfig = useAPIConfig(Bun.env);
export const mode = useMode(Bun.env);
export const isTestEnv = mode === 'DEVELOPMENT' || mode === 'PREVIEW';
export const ports = usePortsConfig(Bun.env)
export const subs = useSubsConfig(Bun.env)
