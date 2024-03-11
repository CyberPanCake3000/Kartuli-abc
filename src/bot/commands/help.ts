import { Telegraf } from 'telegraf'

export const helpCommand = (bot: Telegraf) => {
  bot.help((ctx) => ctx.reply('List of available commands: /start, /help'));
};