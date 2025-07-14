import { useBotConfig, useMode } from '@repo/env';

export const botConfig = useBotConfig(Bun.env);
export const mode = useMode(Bun.env);

export const isTestEnv = mode === 'DEVELOPMENT' || mode == 'PREVIEW';
