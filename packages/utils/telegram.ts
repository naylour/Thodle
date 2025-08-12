import { useBotConfig } from '@repo/env/bot';
import type { UserSchema } from '@repo/db/schemas/telegram';

const bot = useBotConfig(process.env);

export const verify = (data: string): UserSchema | null => {
    if (!data) return null;

    const parsedData = new URLSearchParams(data),
        hash = parsedData.get('hash');

    parsedData.delete('hash');

    const SECRET_KEY = new Bun.CryptoHasher('sha256', 'WebAppData')
            .update(bot.TELEGRAM_BOT_TOKEN)
            .digest(),
        dataCheckString = Array.from(parsedData.entries())
            .map(([key, value]) => `${key}=${value}`)
            .sort()
            .join('\n'),
        calculatedHash = new Bun.CryptoHasher('sha256', SECRET_KEY)
            .update(dataCheckString)
            .digest('hex');

    return calculatedHash === hash ? JSON.parse(parsedData.get('user') as string) : null;
};
