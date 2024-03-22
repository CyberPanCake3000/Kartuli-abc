import User from '../../../models/user';
import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { AskNotifications } from './ask-notifications';

export class AskLetters extends State {
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply('enter amount');
  }

  async handleInput(ctx: BotContext): Promise<void> {
    const id = ctx.from?.id;
    const lettersCount = parseInt(ctx.text!, 10);
    ctx.session.lettersCount = lettersCount;
    await User.updateOne({ userId: id }, { lettersCount });
    this.bot.changeState(new AskNotifications(this.bot));
    await this.bot.getCurrentState().getGreetMessage(ctx);
  }
}