import { z } from 'zod/v4-mini';

export const curatorSchema = z.object({
    cluster: z.string(),

    curator: z.nullable(z.string()),
    id: z.ulid(),
    university: z.string(),

    updatedAt: z.date(),
});

export type CuratorSchema = z.infer<typeof curatorSchema>;
