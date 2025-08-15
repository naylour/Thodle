import { z } from 'zod/v4-mini';

export const studentSchema = z.object({
    group: z.nullable(z.string()),
    id: z.ulid(),

    updatedAt: z.date(),
    user: z.nullable(z.string()),
});

export type StudentSchema = z.infer<typeof studentSchema>;
