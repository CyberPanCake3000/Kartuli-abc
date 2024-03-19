import { Bot, BotContext } from '../telegraf-context'

export const helpCommand = (bot: Bot) => {
  bot.help((ctx: BotContext) => ctx.reply('List of available commands: /start, /help, /randomLetter'));
};