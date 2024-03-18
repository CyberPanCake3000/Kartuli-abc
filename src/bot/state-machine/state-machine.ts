import { MyContext } from '../telegraf-context';
import User from '../../models/user';

export class StateMachine {
  private ctx: any

  private reply?: string

  constructor(ctx: any) {
    console.log('constructor state machine');
    this.ctx = ctx
  }

  async doAction(state: any) {
    const text = this.ctx.message.text;

    switch(state) {
        case 'ASK_NAME':
      this.ctx.session.name = text;
      this.ctx.session.state = 'ASK_LETTERS';
      return this.ctx.reply('How many letters you want to learn?');
        case 'ASK_LETTERS':
      const num: number = +text;
      if (!num) {
        return this.ctx.reply('Please, enter a number.');
      }
      this.ctx.session.lettersCount = parseInt(text, 10);
      this.ctx.session.state = 'ASK_NOTIFICATIONS';
      return this.ctx.reply('Good, do you want to have notifications? Yes/No');
        case 'ASK_NOTIFICATIONS':
      if (text.toLowerCase() === 'yes') {
        this.ctx.session.notifications = true;
        this.ctx.session.state = 'ASK_TIME';
        return this.ctx.reply('In what time you want to get notifications? (HH:MM format)');
      } else {
        this.ctx.session.notifications = false;
        await this.saveUser();
        return this.ctx.reply('Your preferences have been saved.');
      }
        case 'ASK_TIME':
      this.ctx.session.notificationTime = text;
      await this.saveUser();
      return this.ctx.reply('Your preferences have been saved, including notification time.');
        default:
      return this.ctx.reply('I\'m not sure what you want to do.');
    }

  }

  async doReply() {
    return this.ctx.reply(this.reply!);
  }

  async saveUser() {
      const { name, lettersCount, notifications, notificationTime } = this.ctx.session;

      if (!this.ctx.from) {
        throw Error('no context here');
      }
      const user = new User({
        name,
        lettersCount,
        notifications,
        notificationTime,
        userId: this.ctx.from.id,
        username: this.ctx.from.username,
      });

      try {
        await user.save();
        console.log('User saved:', user);
      } catch (error) {
        console.error('Error saving user:', error);
        this.ctx.reply('An error occurred.');
      }
  }
}