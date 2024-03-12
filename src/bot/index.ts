import { Telegraf } from 'telegraf';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { randomLetter } from './commands/random-letter';

export const setupBot = (bot: Telegraf) => {
  startCommand(bot);
  helpCommand(bot);
  randomLetter(bot);
}