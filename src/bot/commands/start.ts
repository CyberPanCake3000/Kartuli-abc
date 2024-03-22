import { BotContext } from '../telegraf-context';
import Bot from '../Bot';
import User from '../../models/user';
import { AskName } from '../states/registration/ask-name';

export const startCommand = (bot: Bot) => {
  const startHandler = async (ctx: BotContext) => {
    const id = ctx.from?.id!;
    const user = await User.findOne({ userId: id });
    if (user) {
      ctx.reply('You already registered!');
    } else {
      const newUser = new User({
        userId: id,
        name: '',
        notifications: false,
        lettersCount: 0,
        learnedLetters: [],
      });

      newUser.save();

      bot.changeState(new AskName(bot));
      await bot.getCurrentState().getGreetMessage(ctx)
    }
  }

  bot.start(startHandler)
  bot.action('start', startHandler);
};

