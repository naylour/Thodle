
import type { Prisma } from '@prisma/client';
import type { z } from 'zod/v4';
import { teacherSchema as baseTeacherSchema } from '../base/teacher';
import { userSchema as baseUserSchema } from '../base/user';


export const

    userSchema = baseUserSchema
        .pick({
            avatar: true,
            firstName: true,
            lastName: true,
            patronymic: true,
        }),

    userSelect: Prisma.UserSelect = {
        avatar: true,
        firstName: true,
        lastName: true,
        patronymic: true,
    };


export const

    teacherSchema = baseTeacherSchema
        .omit({
            cluster: true,
            id: true,
            updatedAt: true,
            user: true,
        })
        .extend({
            User: userSchema,
        }),

    teacherSelect: Prisma.TeacherSelect = {
        User: {
            select: userSelect,
        },
    };

export type UserSchema = z.infer<typeof userSchema>;
export type TeacherSchema = z.infer<typeof teacherSchema>;
