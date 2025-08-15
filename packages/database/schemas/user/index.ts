import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';

import { userSchema as baseUserSchema } from '../base/user';
import {
    telegramAccountSchema,
    telegramAccountSelect,
} from './telegramAccount';


export const

    userSchema = baseUserSchema
        .pick({
            avatar: true,
            firstName: true,
            id: true,
            lastName: true,
            patronymic: true,
            username: true,
        })
        .extend({
            telegramAccounts: telegramAccountSchema.array(),
        }),

    userSelect = {
        avatar: true,
        firstName: true,
        id: true,
        lastName: true,
        patronymic: true,
        telegramAccounts: {
            select: telegramAccountSelect,
        },
        username: true,
    } as const;

export type UserSchema = z.infer<typeof userSchema>;
