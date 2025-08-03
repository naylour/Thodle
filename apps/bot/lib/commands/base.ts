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

baseCommands.command(
    'developer_info',
    'Информация о разработчике',
    async (__context__) => {
        await __context__.reply(
          'Developer Info',
        );
    },
);

baseCommands.command('privacy', 'Политика приватности', async (__context__) => {
    await __context__.reply('Hello, guys!');
});

export default baseCommands;
