import type { Prisma } from '@prisma/client';
import { z } from 'zod/v4';
import {
    lessonSchema as baseLessonSchema,
} from '../base/lesson';
import { auditoriumSchema, auditoriumSelect } from './auditorium';
import { disciplineSchema, disciplineSelect } from './discipline';
import { groupSchema, groupSelect } from './group';
import { teacherSchema, teacherSelect } from './teacher';


export const

    lessonSchema = baseLessonSchema
        .omit({
            auditorium: true,
            discipline: true,
            group: true,
            id: true,
            teacher: true,
            university: true,
            updatedAt: true,
        })
        .extend({
            Auditorium: z.nullable(auditoriumSchema),
            Discipline: disciplineSchema,
            Group: groupSchema,
            Teacher: z.nullable(teacherSchema),
        }),

    lessonSelect: Prisma.LessonSelect = {
        Auditorium: {
            select: auditoriumSelect,
        },
        Discipline: {
            select: disciplineSelect,
        },
        Group: {
            select: groupSelect,
        },
        Teacher: {
            select: teacherSelect,
        },
    };


export type LessonSchema = z.infer<typeof lessonSchema>;
