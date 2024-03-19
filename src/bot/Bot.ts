import { Telegraf } from 'telegraf';
import { BotContext } from './telegraf-context';
import { setupCommands } from '.';

abstract class State {
  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract handleInput(ctx: BotContext): void;
}

class Greeting extends State {
  handleInput(ctx: BotContext) {

  }
}

class AskName extends State {
  handleInput(ctx: BotContext) {

  }
}

class AskLetters extends State {
  handleInput(ctx: BotContext) {

  }
}

export default class Bot extends Telegraf<BotContext> {

  private currentState: State;

  constructor(token: string) {
    super(token);
    this.currentState = new Greeting(this);
    setupCommands(this);
  }

  public changeState(state: State) {
    this.currentState = state;
  }

  public handleMessage(ctx: BotContext) {
    this.currentState.handleInput(ctx);
  }
}