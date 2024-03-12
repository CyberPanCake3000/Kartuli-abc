import { Telegraf } from 'telegraf'
import { letters } from '../../constants/ge';

export const randomLetter = (bot: Telegraf) => {
  bot.command('randomLetter', (ctx) => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    ctx.reply(`Random letter: ${randomLetter.character}`);
  });
};