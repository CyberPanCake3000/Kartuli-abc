import { MyBot, MyContext } from '../telegraf-context'

export const helpCommand = (bot: MyBot) => {
  bot.help((ctx: MyContext) => ctx.reply('List of available commands: /start, /help, /randomLetter'));
};