import { z } from 'zod/v4-mini';

export const buildingSchema = z.object({
    address: z.nullable(z.string()),

    id: z.ulid(),

    name: z.string(),

    university: z.string(),

    updatedAt: z.date(),
});

export type BuildingSchema = z.infer<typeof buildingSchema>;
