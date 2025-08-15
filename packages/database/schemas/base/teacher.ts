import { z } from 'zod/v4';

export const teacherSchema = z.object({
    cluster: z.nullable(z.string()),
    id: z.ulid(),

    updatedAt: z.date(),
    user: z.string(),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;
