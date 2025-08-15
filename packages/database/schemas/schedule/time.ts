import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import { timeSchema as baseTimeSchema } from '../base/time';


export const

    timeSchema = baseTimeSchema
        .omit({
            id: true,
            university: true,
            updatedAt: true,
        }),

    timeSelect: Prisma.TimeSelect = {
        breakEnd: true,
        breakStart: true,
        end: true,
        name: true,
        start: true,
        type: true,
    };


export type TimeSchema = z.infer<typeof timeSchema>;
