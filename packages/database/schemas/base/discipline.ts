import { z } from 'zod/v4';

export const disciplineSchema = z.object({
    id: z.ulid(),
    name: z.string(),

    shortName: z.nullable(z.string()),

    updatedAt: z.date(),
});

export type DisciplineSchema = z.infer<typeof disciplineSchema>;
