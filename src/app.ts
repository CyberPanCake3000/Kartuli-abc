import 'dotenv/config'
import { config } from './config';
import { initDB } from './connect';
import LocalSession from 'telegraf-session-local';
import Bot from './bot/Bot';

(async () => {
  try {
    const bot = new Bot(config.token);
    const localSession = new LocalSession({ database: 'session_db.json' });
    bot.use(localSession.middleware());
    await initDB(config);
    bot.launch();
    console.log('Bot started successfully.');
  } catch (error) {
    console.error('Failed to start the bot:', error);
  }
})()