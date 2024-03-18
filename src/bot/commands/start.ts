import { MyBot, MyContext } from '../telegraf-context';
import User from '../../models/user';
import { StateMachine } from '../state-machine/state-machine';

export const startCommand = (bot: MyBot) => {
  bot.start(async (ctx: MyContext) => {
    ctx.session.state = 'ASK_NAME';
    return ctx.reply('Hello! What\'s your name?');
  })
  bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const { state } = ctx.session;

    const stateMachine = new StateMachine(ctx);
    await stateMachine.doAction(state);
    return stateMachine.doReply();
/*
    switch (state) {
      case 'ASK_NAME':
        ctx.session.name = text;
        ctx.session.state = 'ASK_LETTERS';
        return ctx.reply('How many letters you want to learn?');
      case 'ASK_LETTERS':
        const num: number = +text;
        if (!num) {
          return ctx.reply('Please, enter a number.');
        }
        ctx.session.lettersCount = parseInt(text, 10);
        ctx.session.state = 'ASK_NOTIFICATIONS';
        return ctx.reply('Good, do you want to have notifications? Yes/No');
      case 'ASK_NOTIFICATIONS':
        if (text.toLowerCase() === 'yes') {
          ctx.session.notifications = true;
          ctx.session.state = 'ASK_TIME';
          return ctx.reply('In what time you want to get notifications? (HH:MM format)');
        } else {
          ctx.session.notifications = false;
          await saveUser(ctx);
          return ctx.reply('Your preferences have been saved.');
        }
      case 'ASK_TIME':
        ctx.session.notificationTime = text;
        await saveUser(ctx);
        return ctx.reply('Your preferences have been saved, including notification time.');
      default:
        return ctx.reply('I\'m not sure what you want to do.');
    }
    */
  });

  const saveUser = async (ctx: MyContext) => {
    const { name, lettersCount, notifications, notificationTime } = ctx.session;

    if (!ctx.from) {
      throw Error('no context here');
    }
    const user = new User({
      name,
      lettersCount,
      notifications,
      notificationTime,
      userId: ctx.from.id,
      username: ctx.from.username,
    });

    try {
      await user.save();
      console.log('User saved:', user);
    } catch (error) {
      console.error('Error saving user:', error);
      ctx.reply('An error occurred.');
    }
  };
};

