import { BotContext } from '../telegraf-context'
import Bot from '../Bot';

export const helpCommand = (bot: Bot) => {
  bot.help((ctx: BotContext) => ctx.reply('List of available commands: /start, /help, /randomLetter'));
};