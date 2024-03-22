import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';

export class Intro extends State {
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply('greeter intro');
  }

  async handleInput(ctx: BotContext, options?: { keyboardValue: string; } | undefined): Promise<void> {

  }
}