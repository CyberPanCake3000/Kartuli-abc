import { Context as TelegrafContext, Telegraf } from 'telegraf';

interface SessionData {
  state?: string;
  name?: string;
  lettersCount?: number;
  notifications?: boolean;
  currentLetters: Set<number>;
}


export class BotContext extends TelegrafContext {
  session: SessionData;

  constructor(update: any, telegram: any, options: any) {
    super(update, telegram, options);
    this.session = {
      currentLetters: new Set<number>(),
    };
  }
}


