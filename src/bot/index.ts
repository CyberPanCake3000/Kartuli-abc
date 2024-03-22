import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { randomLetter } from './commands/random-letter';
import { now } from './commands/now';
import Bot from './Bot';

export const setupCommands = (bot: Bot) => {
  startCommand(bot);
  helpCommand(bot);
  randomLetter(bot);
  now(bot);

  bot.action("yes", async ctx => {
    bot.getCurrentState().handleInput(ctx, { keyboardValue: 'yes' });
  });

  bot.action("no", async ctx => {
    bot.getCurrentState().handleInput(ctx, { keyboardValue: 'no' });
  });

}