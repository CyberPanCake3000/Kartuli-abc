import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { Markup } from 'telegraf';

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
    const answer = options.keyboardValue;
    if (answer === 'yes') {
      ctx.session.notifications = true;
      await ctx.answerCbQuery();
      await ctx.editMessageText(
        "Ok! you are setup and ready to learn!",
      );
    } else if (answer === 'no') {
      ctx.session.notifications = false;
      await ctx.answerCbQuery();
      await ctx.editMessageText(
        "Now we won't bother you with notifications",
      );
    }
  }
}