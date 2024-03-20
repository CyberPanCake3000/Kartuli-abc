import { letters } from '../../constants/ge';
import { BotContext } from '../telegraf-context';
import Bot from '../Bot';

export const randomLetter = (bot: Bot) => {
  bot.command('randomLetter', (ctx: BotContext) => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    ctx.reply(`Random letter: ${randomLetter.character}`);
  });
};