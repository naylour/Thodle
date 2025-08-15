import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';

import { telegramAccountSchema as baseTelegramAccountSchema } from '../base/telegramAccount';
import { settingsSchema, settingsSelect } from './settings';

export const telegramAccountSchema = baseTelegramAccountSchema.omit({
        id: true,
        updatedAt: true,
        user: true,
    }).extend({
        settings: z.nullable(settingsSchema)
    }),
    telegramAccountSelect = {
        avatar: true,
        firstName: true,
        lang: true,
        lastName: true,

        settings: {
            select: settingsSelect,
        },
        tgID: true,
        username: true,
    };

export type TelegramAccountSchema = z.infer<typeof telegramAccountSchema>;
