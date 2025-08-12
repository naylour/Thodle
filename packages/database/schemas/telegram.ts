import z from 'zod/v4';

export const userSchema = z.object({
    added_to_attachment_menu: z.optional(z.boolean()),
    allows_write_to_pm: z.optional(z.boolean()),
    first_name: z.string(),
    id: z.number(),
    is_bot: z.optional(z.boolean()),
    is_premium: z.optional(z.boolean()),
    language_code: z.string(),
    last_name: z.string(),
    photo_url: z.optional(z.string()),
    username: z.optional(z.string()),
});

export type UserSchema = z.infer<typeof userSchema>;

export const chatTypeSchema = z.union([
    z.literal('sender'),
    z.literal('private'),
    z.literal('group'),
    z.literal('supergroup'),
    z.literal('channel'),
]);

export const chatSchema = z.object({
    id: z.number(),
    photo_url: z.optional(z.string()),
    title: z.string(),
    type: z.union([
        z.literal('group'),
        z.literal('supergroup'),
        z.literal('channel'),
    ]),
    username: z.optional(z.string()),
});

export const initDataSchema = z.object({
    auth_date: z.date(),
    can_send_after: z.optional(z.number()),
    chat: z.optional(chatSchema),
    chat_instance: z.optional(z.string()),
    chat_type: z.optional(chatTypeSchema),
    hash: z.string(),
    query_id: z.optional(z.string()),
    receiver: z.optional(userSchema),
    signature: z.string(),
    start_param: z.optional(z.string()),
    user: z.optional(userSchema),
});

export type ChatTypeSchema = z.infer<typeof chatTypeSchema>;
