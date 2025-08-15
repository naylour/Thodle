import { z } from 'zod/v4';

export const userSchema = z.object({
    avatar: z.nullable(z.string()),

    email: z.nullable(z.string()),
    firstName: z.string(),
    id: z.ulid(),
    lastName: z.nullable(z.string()),
    patronymic: z.nullable(z.string()),
    phone: z.nullable(z.string()),

    updatedAt: z.date(),
    username: z.nullable(z.string()),
});

export type UserSchema = z.infer<typeof userSchema>;
