import { BotContext } from '../telegraf-context';
import Bot from '../Bot';
import User from '../../models/user';
import { AskName } from '../states/registration/ask-name';

export const startCommand = (bot: Bot) => {
  bot.start(async (ctx: BotContext) => {
    const id = ctx.from?.id;
    const user = await User.findOne({ userId: id });
    if (user) {
      ctx.reply('You already registered!');
    } else {
      bot.changeState(new AskName(bot));
      bot.getCurrentState().getGreetMessage(ctx)
    }
  })

  const saveUser = async (ctx: BotContext) => {
    const { name, lettersCount, notifications } = ctx.session;

    if (!ctx.from) {
      throw Error('no context here');
    }
    const user = new User({
      name,
      lettersCount,
      notifications,
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

