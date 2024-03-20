import { Context as TelegrafContext, Telegraf } from 'telegraf';

interface SessionData {
  state?: string;
  name?: string;
  lettersCount?: number;
  notifications?: boolean;
  notificationTime?: string;
  language?: string;
}


export class BotContext extends TelegrafContext {
  session: SessionData;

  constructor(update: any, telegram: any, options: any) {
    super(update, telegram, options);
    this.session = {};
  }
}


