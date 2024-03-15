import { Context as TelegrafContext, Telegraf } from 'telegraf';

interface SessionData {
  state?: string;
  name?: string;
  lettersCount?: number;
  notifications?: boolean;
  notificationTime?: string;
  language?: string;
}

export interface MyContext extends TelegrafContext {
  session: SessionData;
}

export type MyBot = Telegraf<MyContext>;
