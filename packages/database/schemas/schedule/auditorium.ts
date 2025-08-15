import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import { auditoriumSchema as baseAuditoriumSchema } from '../base/auditorium';


export const

    auditoriumSchema = baseAuditoriumSchema
        .omit({
            building: true,
            id: true,
            updatedAt: true,
        }),

    auditoriumSelect: Prisma.AuditoriumSelect = {
        name: true,
        shortName: true,
    };


export type AuditoriumSchema = z.infer<typeof auditoriumSchema>;
