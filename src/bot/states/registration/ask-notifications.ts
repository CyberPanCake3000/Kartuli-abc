import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';

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