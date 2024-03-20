import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { AskLetters } from './ask-letters';

export class AskName extends State {
  getGreetMessage(ctx: BotContext): void {
    ctx.reply("Please, tell me your name to start the registration.");
  }

  handleInput(ctx: BotContext): void {
    if (ctx.message && 'text' in ctx.message) {
      const name = ctx.message.text;
      this.bot.changeState(new AskLetters(this.bot));
      this.bot.getCurrentState().getGreetMessage(ctx);
    } else {
      ctx.reply("Please, tell me your name to start the registration.");
    }
  }
}