import { type UserSchema, userSelect } from '$schemas/user';
import prisma from '../instance';

export const createUser = async (): Promise<UserSchema | null> => {
    const maybeUser = await prisma.user.findUnique({
        select: userSelect,
        where: {
            id: '',
        },
    });

    return maybeUser;
};
