import { z } from 'zod/v4';

export const scheduleDaySchema = z.union([
    z.literal('MONDAY'),
    z.literal('TUESDAY'),
    z.literal('WEDNESDAY'),
    z.literal('THURSDAY'),
    z.literal('FRIDAY'),
    z.literal('SATURDAY'),
    z.literal('SUNDAY'),
]);

export type ScheduleDaySchema = z.infer<typeof scheduleDaySchema>;

export const weekSchema = z.union([
    z.literal('FIRST'),
    z.literal('SECOND'),
    z.literal('ANOTHER'),
]);

export type WeekSchema = z.infer<typeof weekSchema>;

export const scheduleSchema = z.object({
    day: scheduleDaySchema,
    id: z.ulid(),
    university: z.string(),

    updatedAt: z.date(),
    week: weekSchema,
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
