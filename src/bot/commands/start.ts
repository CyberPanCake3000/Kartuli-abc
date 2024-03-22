import { BotContext } from '../telegraf-context';
import Bot from '../Bot';
import User from '../../models/user';
import { AskName } from '../states/registration/ask-name';

export const startCommand = (bot: Bot) => {
  bot.start(async (ctx: BotContext) => {
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
      bot.getCurrentState().getGreetMessage(ctx)
    }
  })

};

