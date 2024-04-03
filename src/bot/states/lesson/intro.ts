import { BotContext } from '../../telegraf-context';
import { State } from '../base-state';
import { LettersService } from '../../services/letters/letters-service';
import UserModel, { User, LearnedLetter } from '../../../models/user';
import { Letter } from '../../../constants/ge';
import { Markup } from 'telegraf';
import Bot from '../../Bot';
import * as path from 'path';
import * as fs from 'fs';

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
    ctx.reply('ok, if you want to start lesson later enter /now');
  }

  async handleYes(ctx: BotContext): Promise<void> {
    try {
      const user = await this.getUser(ctx.from?.id);

      if (user) {
        this.prepareLettersForUser(user);
        this.sendLetter(ctx);
      }
    } catch (error) {
      console.error('Error handling Yes:', error);
      ctx.reply('An error occurred, please try again later.');
    }
  }

  private async getUser(userId: number | undefined): Promise<User | null> {
    if (!userId) return null;
    return UserModel.findOne({ userId });
  }

  private prepareLettersForUser(user: User): void {
    this.currentLetters = LettersService.getRandomLetters(user.learnedLetters, user.lettersCount);
  }


  async handleInput(ctx: BotContext, options?: { keyboardValue: string; } | undefined): Promise<void> {
    if (this.currentIndex < this.currentLetters.length - 1) {
      this.currentIndex += 1;
      this.sendLetter(ctx);
    } else {
      ctx.editMessageReplyMarkup({ inline_keyboard: [] });
      ctx.sendMessage('lesson complited!!');
    }
  }

  private async writeLearnedUserLetter(userId: number | undefined, letter: Letter) {
    // await User.updateOne({ userId }, { notifications: answer });
    const user = await UserModel.findById(userId);

    const learnedLetter: LearnedLetter = {
      character: letter.character,
      progress: 0,
      practiceCount: 1,
    };

    user?.learnedLetters
  }

  /**
 * Sends the current letter as a photo to the user.
 * Clears the previous inline keyboard and presents a new one with a "Next" button.
 * Handles any errors that occur during the process by logging them and notifying the user.
 * @param {BotContext} ctx - The context of the bot, including the current message and user information.
 */
  private async sendLetter(ctx: BotContext): Promise<void> {
    try {
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });

      const letter = this.currentLetters[this.currentIndex];
      // this.writeLearnedUserLetter(ctx.from?.id, letter);

      const picturePath = path.resolve(__dirname, '../../../../', letter.pictureUrl);
      const photo = fs.createReadStream(picturePath);

      const inlineKeyboard = Markup.inlineKeyboard([
        Markup.button.callback('Next', 'next'),
      ]);

      await ctx.replyWithPhoto({ source: photo }, {
        caption: `${letter.character}`,
        parse_mode: "Markdown",
        ...inlineKeyboard,
      });
    } catch (error) {
      console.error('Error occurred in sendLetter:', error);
      await ctx.reply('An error occurred, please try again later.');
    }
  }

}