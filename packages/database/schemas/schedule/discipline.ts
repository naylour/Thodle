import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import { disciplineSchema as baseDisciplineSchema } from '../base/discipline';


export const

    disciplineSchema = baseDisciplineSchema
        .omit({
            id: true,
            updatedAt: true,
        }),

    disciplineSelect: Prisma.DisciplineSelect = {
        name: true,
        shortName: true,
    };


export type DisciplineSchema = z.infer<typeof disciplineSchema>;
