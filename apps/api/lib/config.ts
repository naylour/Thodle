import { useAPIConfig } from '@repo/env/api';
import { useMode } from '@repo/env/mode';

export const apiConfig = useAPIConfig(Bun.env);
export const mode = useMode(Bun.env);
export const isTestEnv = mode === 'DEVELOPMENT' || mode == 'PREVIEW';
