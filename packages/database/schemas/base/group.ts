import { z } from 'zod/v4';

export const groupSchema = z.object({
    cluster: z.string(),
    curator: z.nullable(z.string()),

    fullName: z.nullable(z.string()),
    id: z.ulid(),
    name: z.string(),
    university: z.string(),

    updatedAt: z.date(),
    year: z.string(),
});

export type GroupSchema = z.infer<typeof groupSchema>;

export const groupHeadStatus = z.union([
    z.literal('FIRST'),
    z.literal('SECOND'),
]);

export type GroupHeadStatus = z.infer<typeof groupHeadStatus>;

export const groupHead = z.object({
    cluster: z.string(),
    group: z.string(),
    id: z.ulid(),
    status: groupHeadStatus,

    updatedAt: z.date(),

    user: z.nullable(z.string()),
});

export type GroupHead = z.infer<typeof groupHead>;
