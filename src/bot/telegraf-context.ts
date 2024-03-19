import { Context as TelegrafContext, Telegraf } from 'telegraf';

interface SessionData {
  state?: string;
  name?: string;
  lettersCount?: number;
  notifications?: boolean;
  notificationTime?: string;
  language?: string;
}

export interface BotContext extends TelegrafContext {
  session: SessionData;
}

export type Bot = Telegraf<BotContext>;
