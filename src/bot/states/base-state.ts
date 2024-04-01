
import Bot from '../Bot';
import { BotContext } from '../telegraf-context';

export abstract class State {
  protected bot: Bot;
  public stateName: string;

  constructor(bot: Bot, stateName: string) {
    this.bot = bot;
    this.stateName = stateName;
  }

  abstract getGreetMessage(ctx: BotContext): Promise<void>;
  abstract handleInput(ctx: BotContext, options?: { keyboardValue: string }): Promise<void>;
  async handleYes(ctx: BotContext) {
    console.error(`no handlerYes for ${this.stateName} state`);
  }

  async handleNo(ctx: BotContext) {
    console.error(`no handlerNo for ${this.stateName} state`);
  }
}
