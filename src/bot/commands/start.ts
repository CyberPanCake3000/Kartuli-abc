import { Telegraf } from 'telegraf'
import { getReply } from '../../api/controllers/replies/replies';

export const startCommand = (bot: Telegraf) => {
  bot.start(async (ctx) => {
    const replies = await getReply('START');
    const messages = replies?.messages;
    if (!messages) {
      throw Error('no messages in this command');
    }
    messages.forEach(message => {
      ctx.reply(message);
    });
  })
};