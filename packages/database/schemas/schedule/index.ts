import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import { scheduleSchema as baseScheduleSchema } from '../base/schedule';
import { lessonScheduleSchema, lessonsScheduleSelect } from './lessonSchedule';

export const scheduleSchema = baseScheduleSchema
        .omit({
            university: true,
        })
        .extend({
            lessons: lessonScheduleSchema.array(),
        }),
    scheduleSelect: Prisma.ScheduleSelect = {
        day: true,
        id: true,
        lessons: {
            select: lessonsScheduleSelect,
        },
        updatedAt: true,
        week: true,
    };

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
