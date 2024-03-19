import { Bot, BotContext } from '../telegraf-context';
import User from '../../models/user';

export const startCommand = (bot: Bot) => {
  bot.start(async (ctx: BotContext) => {
    return ctx.reply('Hello! What\'s your name?');
  })

  const saveUser = async (ctx: BotContext) => {
    const { name, lettersCount, notifications, notificationTime } = ctx.session;

    if (!ctx.from) {
      throw Error('no context here');
    }
    const user = new User({
      name,
      lettersCount,
      notifications,
      notificationTime,
      userId: ctx.from.id,
      username: ctx.from.username,
    });

    try {
      await user.save();
      console.log('User saved:', user);
    } catch (error) {
      console.error('Error saving user:', error);
      ctx.reply('An error occurred.');
    }
  };
};

