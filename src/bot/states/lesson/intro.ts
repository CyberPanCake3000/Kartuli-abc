import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { LettersService } from '../../services/letters/letters-services';
import User from '../../../models/user';
import { Letter } from '../../../constants/ge';
import { Markup } from 'telegraf';

export class Intro extends State {
  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply('greeter intro');
    ctx.reply('lets start the lesson', Markup.inlineKeyboard([
      Markup.button.callback('Yes', 'yes'),
      Markup.button.callback('No', 'no'),
    ]),);
  }

  async handleInput(ctx: BotContext, options?: { keyboardValue: string; } | undefined): Promise<void> {
    const value = options?.keyboardValue;

    if (value === 'yes') {
      const user = await User.findOne({ userId: ctx.from?.id });
      if (user) {
        const randomLetters = LettersService.getRandomLetters(user.lettersCount);

        randomLetters.forEach(letter => {
          this.sendLetter(ctx, letter);
        });
      }
    } else if (value === 'no'){
      ctx.reply('ok, if you want to start lesson enter /now');
    }
  }

  sendLetter(ctx: BotContext, letter: Letter) {
    ctx.reply(letter.character);
  }
}