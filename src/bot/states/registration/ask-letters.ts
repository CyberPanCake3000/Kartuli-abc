import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { AskNotifications } from './ask-notifications';

export class AskLetters extends State {
  getGreetMessage(ctx: BotContext): void {
    ctx.reply('enter amount');
  }

  handleInput(ctx: BotContext): void {
    if (ctx.message && 'text' in ctx.message) {
      const amount = ctx.message.text;
      this.bot.changeState(new AskNotifications(this.bot));
      this.bot.getCurrentState().getGreetMessage(ctx);
    } else {
      ctx.reply("Please, tell me amount of letters to start the registration.");
    }
  }
}