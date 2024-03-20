import { Telegraf } from 'telegraf';
import { BotContext } from './telegraf-context';
import { setupCommands } from '.';
import LocalSession = require('telegraf-session-local');

abstract class State {
  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract handleInput(ctx: BotContext): void;
}

class Registration extends State{
    handleInput(ctx: BotContext): void {
      ctx.reply('hello! lets start registration, tell me your name');
      const name = ctx.message.text;
      console.log(name);
    }
}

export default class Bot extends Telegraf<BotContext> {

  private currentState: State;

  constructor(token: string) {
    super(token);
    const localSession = new LocalSession({ database: 'session_db.json' });
    this.use(localSession.middleware());
    this.currentState = new Registration(this);
    this.start((ctx) => this.handleMessage(ctx));
    // setupCommands(this);
    return this;
  }

  public changeState(state: State) {
    this.currentState = state;
  }

  public handleMessage(ctx: BotContext) {
    this.currentState.handleInput(ctx);
  }
}