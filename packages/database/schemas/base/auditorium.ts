import { z } from 'zod/v4';

export const auditoriumSchema = z.object({
    building: z.string(),
    id: z.ulid(),

    name: z.string(),
    shortName: z.nullable(z.string()),

    updatedAt: z.date(),
});

export type AuditoriumSchema = z.infer<typeof auditoriumSchema>;
