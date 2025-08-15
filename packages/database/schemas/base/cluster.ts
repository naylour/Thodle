import { z } from 'zod/v4-mini';

export const clusterSchema = z.object({
    address: z.nullable(z.string()),
    id: z.ulid(),

    name: z.string(),
    shortName: z.nullable(z.string()),

    university: z.string(),

    updatedAt: z.date(),
});

export type ClusterSchema = z.infer<typeof clusterSchema>;
