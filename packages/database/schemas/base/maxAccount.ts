import { z } from 'zod/v4-mini';

export const maxAccountSchema = z.object({
    avatar: z.nullable(z.string()),
    firstName: z.string(),
    id: z.ulid(),
    lang: z.nullable(z.string()),

    lastName: z.nullable(z.string()),
    maxID: z.bigint(),

    updatedAt: z.date(),
    user: z.string(),
    username: z.nullable(z.string()),
});

export type MaxAccountSchema = z.infer<typeof maxAccountSchema>;
