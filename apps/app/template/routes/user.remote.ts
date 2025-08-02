import { z } from 'zod/v4-mini';
import { query } from '$app/server';

const initDataUser = z.object({
    added_to_attachment_menu: z.optional(z.boolean()),
    allows_write_to_pm: z.optional(z.boolean()),
    first_name: z.string(),
    id: z.number(),
    is_bot: z.optional(z.boolean()),
    is_premium: z.optional(z.boolean()),
    language_code: z.optional(z.string()),
    last_name: z.optional(z.string()),
    photo_url: z.optional(z.string()),
    username: z.optional(z.string()),
});

export const user = query(
    z.object({
        auth_date: z.date(),
        can_send_after: z.optional(z.number()),
        chat: z.optional(
            z.object({
                id: z.number(),
                photo_url: z.optional(z.string()),
                title: z.string(),
                type: z.string(),
                username: z.optional(z.string()),
            }),
        ),
        chat_instance: z.optional(z.string()),
        chat_type: z.optional(z.string()),
        hash: z.string(),
        query_id: z.optional(z.string()),
        receiver: z.optional(initDataUser),
        signature: z.string(),
        start_param: z.optional(z.string()),
        user: z.optional(initDataUser),
    }),
    async (initData) => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        return initData;
    },
);
