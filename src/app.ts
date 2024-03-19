import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { config } from './config';
import { initDB } from './connect';
import { setupBot } from './bot';
import LocalSession from 'telegraf-session-local';
import { BotContext } from './bot/telegraf-context';

(async () => {
  try {
    const bot = new Telegraf<BotContext>(config.token);
    const localSession = new LocalSession({ database: 'session_db.json' });
    bot.use(localSession.middleware());
    await initDB(config);
    setupBot(bot);
    bot.launch();
    console.log('Bot started successfully.');
  } catch (error) {
    console.error('Failed to start the bot:', error);
  }
})()