import { letters } from '../../constants/ge';
import { BotContext } from '../telegraf-context';
import Bot from '../Bot';
import User from '../../models/user';
import { Markup } from 'telegraf';
import { Intro } from '../states/lesson/intro';


export const now = (bot: Bot) => {
  const nowHandler = async (ctx: BotContext) => {
    const userId = ctx.from?.id;
    const user = await User.findOne({ userId });

    if (!user) {
      ctx.reply(
        "You haven't registered yet! Pls click start",
        Markup.inlineKeyboard([
          Markup.button.callback('Start!', 'start'),
        ])
      );
      return;
    }

    bot.changeState(new Intro(bot));
    await bot.getCurrentState().getGreetMessage(ctx)
  }

  bot.action('now', nowHandler);
  bot.command('now', nowHandler);
};