import prisma from '@repo/db/prisma';
import { verify } from '@repo/utils/telegram';
import { z } from 'zod/v4-mini';
import { query } from '$app/server';

export const getUser = query(z.any(), async (initData) => {
    const result = verify(initData);

    if (result) {
        const tgAccount = await prisma.telegramAccount.findUnique({
            select: {
                user: true,
            },
            where: {
                tgID: result.id,
            },
        });

        if (!tgAccount) {
            const user = await prisma.user.create({
                data: {
                    avatar: result.photo_url,
                    firstName: result.first_name,
                            lastName: result.last_name,
                    telegramAccounts: {
                        create: {
                            avatar: result.photo_url,
                            firstName: result.first_name,
                            lang: result.language_code,
                            lastName: result.last_name,
                            tgID: result.id,
                            username: result.username,
                        },
                    },
                    username: result.username,
                },
            });

            return user;
        } else {
            return await prisma.user.findUnique({
                where: {
                    id: tgAccount.user,
                },
            });
        }
    }

    return null;
});
