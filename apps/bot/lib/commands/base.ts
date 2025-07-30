import { CommandGroup } from "@grammyjs/commands";

export const baseCommands = new CommandGroup<Bot.Context>();


baseCommands.command('start', 'Приветствие/Перезапуск', async __context__ => {
    await __context__.reply('Hello, world!')
});


export default baseCommands;
