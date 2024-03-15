import { letters } from '../../constants/ge';
import { MyBot, MyContext } from '../telegraf-context';

export const randomLetter = (bot: MyBot) => {
  bot.command('randomLetter', (ctx: MyContext) => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    ctx.reply(`Random letter: ${randomLetter.character}`);
  });
};