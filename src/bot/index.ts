import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { randomLetter } from './commands/random-letter';
import Bot from './Bot';

export const setupCommands = (bot: Bot) => {
  startCommand(bot);
  helpCommand(bot);
  randomLetter(bot);
}