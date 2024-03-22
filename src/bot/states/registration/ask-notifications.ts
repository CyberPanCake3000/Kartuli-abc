import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { Markup } from 'telegraf';
import User from '../../../models/user';

export class AskNotifications extends State {
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply('do you want to receive notifications? yes/no',
      Markup.inlineKeyboard([
        Markup.button.callback('Yes', 'yes'),
        Markup.button.callback('No', 'no'),
      ]),
    );
  }

  async handleInput(ctx: BotContext, options: { keyboardValue: string }): Promise<void> {
    const value = options.keyboardValue;
    const id = ctx.from?.id;
    let answer;
    let message = '';

    if (value === 'yes') {
      ctx.session.notifications = true;
      answer = true;
      message = "Ok! you are setup and ready to learn!"
    } else if (value === 'no') {
      ctx.session.notifications = false;
      answer = false;
      message = "Now we won't bother you with notifications"
    }

    await User.updateOne({ userId: id }, { notifications: answer });

    await ctx.answerCbQuery();
    await ctx.editMessageText(
      message,
      Markup.inlineKeyboard([
        Markup.button.callback('Start the lesson', 'now'),
      ]),
    );
  }
}