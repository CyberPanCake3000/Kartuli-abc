import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { randomLetter } from './commands/random-letter';
import { MyBot } from './telegraf-context';

export const setupBot = (bot: MyBot) => {
  startCommand(bot);
  helpCommand(bot);
  randomLetter(bot);
}