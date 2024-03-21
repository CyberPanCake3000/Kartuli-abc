import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { AskNotifications } from './ask-notifications';

export class AskLetters extends State {
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply('enter amount');
  }

  async handleInput(ctx: BotContext): Promise<void> {
    ctx.session.lettersCount = parseInt(ctx.text!, 10);
    this.bot.changeState(new AskNotifications(this.bot));
    this.bot.getCurrentState().getGreetMessage(ctx);
  }
}