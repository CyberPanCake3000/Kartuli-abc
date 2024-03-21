import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { AskLetters } from './ask-letters';

export class AskName extends State {
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply("Please, tell me your name to start the registration.");
  }

  async handleInput(ctx: BotContext): Promise<void> {
    ctx.session.name = ctx.text;
    this.bot.changeState(new AskLetters(this.bot));
    this.bot.getCurrentState().getGreetMessage(ctx);
  }
}