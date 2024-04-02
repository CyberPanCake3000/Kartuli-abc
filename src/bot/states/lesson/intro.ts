import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { LettersService } from '../../services/letters/letters-service';
import User from '../../../models/user';
import { Letter } from '../../../constants/ge';
import { Markup } from 'telegraf';
import Bot from '../../Bot';
import * as path from 'path';
import fs = require('fs');

export class Intro extends State {
  private currentLetters: Letter[] = [];
  private currentIndex: number = 0;

  constructor(bot: Bot) {
    super(bot, 'LESSON_INTRO');
  }

  async getGreetMessage(ctx: BotContext): Promise<void> {
    ctx.reply('lets start the lesson', Markup.inlineKeyboard([
      Markup.button.callback('Yes', 'yes'),
      Markup.button.callback('No', 'no'),
    ]),);
  }

  async handleNo(ctx: BotContext): Promise<void> {
    ctx.reply('ok, if you want to start lesson enter /now');
  }

  async handleYes(ctx: BotContext): Promise<void> {
    ctx.editMessageText('handle yes');
    const user = await User.findOne({ userId: ctx.from?.id });
    if (user) {
      this.currentLetters = LettersService.getRandomLetters(user.learnedLetters, user.lettersCount);
      this.sendLetter(ctx);
    }
  }

  async handleInput(ctx: BotContext, options?: { keyboardValue: string; } | undefined): Promise<void> {
    if (this.currentIndex < this.currentLetters.length - 1) {
      this.currentIndex += 1;
      this.sendLetter(ctx);
    } else {
      ctx.editMessageText('lesson complited!!');
    }
  }

  writeLearnedUserLetter(ctx: BotContext) {

  }

  sendLetter(ctx: BotContext) {
    const letter = this.currentLetters[this.currentIndex];
    ctx.session.currentLetters.add(letter);
    ctx.editMessageText(`${letter.character}`, Markup.inlineKeyboard([
      Markup.button.callback('Next', 'next'),
    ]));
    const picturePath = path.join(__dirname, '../../../../', letter.picture);
    const photo = fs.createReadStream(picturePath);
    ctx.sendPhoto({ source: photo });
  }
}