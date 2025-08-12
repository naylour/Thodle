import prisma from "../instance";

export const createUser = async () => {
    const maybeUser = await prisma.telegramAccount.findUnique({})
}
