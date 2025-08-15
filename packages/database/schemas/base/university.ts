import { z } from 'zod/v4-mini';

export const universitySchema = z.object({
    address: z.nullable(z.string()),

    fullName: z.string(),
    id: z.ulid(),
    name: z.string(),

    updatedAt: z.date(),
});

export type UniversitySchema = z.infer<typeof universitySchema>;
