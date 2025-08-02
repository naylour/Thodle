import { CommandGroup } from '@grammyjs/commands';
import { b, fmt, u } from '@grammyjs/parse-mode';

export const baseCommands = new CommandGroup<Bot.Context>();

baseCommands.command('start', 'Перезапуск', async (__context__) => {
    const text = fmt`${b}${u}Hello${u}, ${b}`;
    console.log(text.toString());
    await __context__.reply(text.text, {
        entities: text.entities,
    });
});

baseCommands.command('settings', 'Настройки', async (__context__) => {
    await __context__.reply('Hello, guys!');
});

baseCommands.command('help', 'Помощь', async (__context__) => {
    await __context__.reply('Hello, guys!');
});

baseCommands.command(
    'developer_info',
    'Информация о разработчике',
    async (__context__) => {
        await __context__.reply(
            `👨‍💻 **Информация о разработчике**:\n\n` +
                `Привет! Я — бот, созданный [Имя Разработчика] для упрощения выполнения задач и облегчения взаимодействия с пользователями.\n\n` +
                `**Проекты**:\n` +
                `- 🌐 [Название Проекта 1]: Краткое описание.\n` +
                `- 📱 [Название Проекта 2]: Краткое описание.\n\n` +
                `**Контакты**:\n` +
                `- 💌 Email: developer@example.com\n` +
                `- 🌐 Сайт: [example.com](http://example.com)\n` +
                `- 📱 Telegram: [@username](https://t.me/username)\n\n` +
                `Если у вас есть вопросы или предложения, не стесняйтесь обращаться!`,
        );
    },
);

baseCommands.command('privacy', 'Политика приватности', async (__context__) => {
    await __context__.reply('Hello, guys!');
});

export default baseCommands;
