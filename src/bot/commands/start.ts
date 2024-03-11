import { Telegraf } from 'telegraf'

export const startCommand = (bot: Telegraf) => {
  bot.start((ctx) => ctx.reply('Welcome! Use /help to see available commands.'));
};