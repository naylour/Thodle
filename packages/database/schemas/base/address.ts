import { z } from 'zod/v4-mini';

export const addressSchema = z.object({
    address: z.nullable(z.string()),

    fullName: z.string(),
    id: z.ulid(),
    latitude: z.number(),
    longitude: z.number(),
    name: z.string(),

    updatedAt: z.date(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
