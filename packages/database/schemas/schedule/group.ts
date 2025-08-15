import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import { groupSchema as baseGroupSchema } from '../base/group';


export const

    groupSchema = baseGroupSchema
        .pick({
            fullName: true,
            name: true,
            year: true,
        }),

    groupSelect: Prisma.GroupSelect = {
        fullName: true,
        name: true,
        year: true,
    };


export type GroupSchema = z.infer<typeof groupSchema>;
