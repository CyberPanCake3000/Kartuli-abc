import User from '../../../models/user';
import Bot from '../../Bot';
import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { AskLetters } from './ask-letters';

export class AskName extends State {
  constructor(bot: Bot) {
    super(bot, 'ASK_NAME');
  }
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.editMessageText("Please, tell me your name to start the registration.");
  }

  async handleInput(ctx: BotContext): Promise<void> {
    const name = ctx.text;
    ctx.session.name = name;
    const id = ctx.from?.id;
    await User.updateOne({userId: id }, { name });
    this.bot.changeState(new AskLetters(this.bot));
    await this.bot.getCurrentState().getGreetMessage(ctx);
  }

  async exitState() {

  }
}