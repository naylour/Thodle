import { z } from 'zod/v4';

export const timeType = z.union([
    z.literal('DEFAULT'),
    z.literal('STUDY'),
]);

export type TimeType = z.infer<typeof timeType>;

export const timeSchema = z.object({
    breakEnd: z.nullable(z.string()),
    breakStart: z.nullable(z.string()),
    end: z.string(),

    id: z.ulid(),

    name: z.string(),
    start: z.string(),

    type: timeType,

    university: z.string(),

    updatedAt: z.date(),
});

export type TimeSchema = z.infer<typeof timeSchema>;
