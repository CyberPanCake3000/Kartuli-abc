import { Telegraf } from 'telegraf';
import { BotContext } from './telegraf-context';
import { setupCommands } from '.';
// import LocalSession = require('telegraf-session-local');
import { message } from 'telegraf/filters'
import { State } from './states/base-state';

export default class Bot extends Telegraf<BotContext> {

  private currentState?: State;

  constructor(token: string) {
    super(token, { contextType: BotContext });
    // const localSession = new LocalSession({ database: 'session_db.json' });
    // this.use(localSession.middleware());
    setupCommands(this);
    this.on(message('text'), (ctx) => this.handleMessage(ctx));
    return this;
  }

  public getCurrentState(){
    return this.currentState!;
  }

  public changeState(state: State) {
    this.currentState = state;
  }

  public handleMessage(ctx: BotContext) {
    this.currentState!.handleInput(ctx);
  }
}