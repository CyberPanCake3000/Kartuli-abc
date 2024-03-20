import { Telegraf } from 'telegraf';
import { BotContext } from './telegraf-context';
import { setupCommands } from '.';
import LocalSession = require('telegraf-session-local');
import { message } from 'telegraf/filters'

abstract class State {
  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract getGreetMessage(ctx: BotContext): void;
  abstract handleInput(ctx: BotContext): void;
}

export class AskName extends State{
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

export class AskNotifications extends State {
  getGreetMessage(ctx: BotContext): void {
    ctx.reply('do you want to get notifications? yes/no');
  }

  handleInput(ctx: BotContext): void {
    if (ctx.message && 'text' in ctx.message) {
      const answer = ctx.message.text;
    } else {
      ctx.reply("Please, tell me about your notification preferences");
    }
  }
}


export default class Bot extends Telegraf<BotContext> {

  private currentState?: State;

  constructor(token: string) {
    super(token);
    const localSession = new LocalSession({ database: 'session_db.json' });
    this.use(localSession.middleware());
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