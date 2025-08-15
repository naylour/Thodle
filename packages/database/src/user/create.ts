import { type UserSchema, userSelect } from '$schemas/user';
import prisma from '../instance';

export default async (): Promise<UserSchema | null> => {
    try {
        const user = await prisma.user.create({
            data: {
                firstName: '',
                telegramAccounts: {
                    create: {
                        firstName: '',

                        settings: {
                            create: {},
                        },
                        tgID: BigInt(0),
                        username: '',
                    },
                },
            },

            select: userSelect,
        });

        return user;
    } catch {
        return null;
    }
};
