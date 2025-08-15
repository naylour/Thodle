import { z } from 'zod/v4';

export const lessonSchema = z.object({
    auditorium: z.nullable(z.string()),
    discipline: z.string(),
    group: z.string(),
    id: z.ulid(),

    teacher: z.nullable(z.string()),
    university: z.string(),

    updatedAt: z.date(),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const lessonType = z.union([
    z.literal('LECTION'),
    z.literal('PRACTICE'),
    z.literal('ACTIVITY'),
]);

export type LessonType = z.infer<typeof lessonType>;

export const lessonScheduleSchema = z.object({
    id: z.ulid(),
    lesson: z.string(),

    order: z.number(),
    schedule: z.string(),
    time: z.nullable(z.string()),

    type: lessonType,

    updatedAt: z.date(),
});

export type LessonScheduleSchema = z.infer<typeof lessonScheduleSchema>;
