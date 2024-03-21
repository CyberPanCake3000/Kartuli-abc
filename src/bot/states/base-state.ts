
import Bot from '../Bot';
import { BotContext } from '../telegraf-context';

export abstract class State {
  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract getGreetMessage(ctx: BotContext): Promise<void>;
  abstract handleInput(ctx: BotContext, options?: { keyboardValue: string }): Promise<void>;
}
