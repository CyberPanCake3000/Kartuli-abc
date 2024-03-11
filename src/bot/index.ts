import { Telegraf } from 'telegraf';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';

export const setupBot = (bot: Telegraf) => {
  startCommand(bot);
  helpCommand(bot);
}