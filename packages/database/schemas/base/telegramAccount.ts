import { z } from 'zod/v4';

export const telegramAccountSchema = z.object({
    avatar: z.nullable(z.string()),
    firstName: z.string(),
    id: z.ulid(),
    lang: z.nullable(z.string()),

    lastName: z.nullable(z.string()),
    tgID: z.bigint(),

    updatedAt: z.date(),
    user: z.string(),
    username: z.nullable(z.string()),
});

export type TelegramAccountSchema = z.infer<typeof telegramAccountSchema>;
