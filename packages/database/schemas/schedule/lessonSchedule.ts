import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import {
    lessonScheduleSchema as baseLessonScheduleSchema,
} from '../base/lesson';
import { lessonSchema, lessonSelect } from './lesson';
import { timeSchema, timeSelect } from './time';


export const

    lessonScheduleSchema = baseLessonScheduleSchema
        .omit({
            id: true,
            lesson: true,
            schedule: true,
            scheduleFix: true,
            time: true,
            updatedAt: true,
        })
        .extend({
            Lesson: lessonSchema,
            Time: timeSchema,
        }),

    lessonsScheduleSelect: Prisma.LessonScheduleSelect = {
        Lesson: {
            select: lessonSelect,
        },
        order: true,
        Time: {
            select: timeSelect,
        },
        type: true,
    };


export type LessonScheduleSchema = z.infer<typeof lessonScheduleSchema>;
