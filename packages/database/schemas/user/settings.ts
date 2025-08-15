import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';

import { settingsSchema as baseSettingsSchema } from '../base/settings';

export const
    settingsSchema = baseSettingsSchema.pick({
        color: true,
        mode: true,
    }),
    settingsSelect = {
        color: true,
        mode: true
    };

export type SettingsSchema = z.infer<typeof settingsSchema>;
