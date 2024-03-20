import 'dotenv/config'
import { config } from './config';
import { initDB } from './connect';
import Bot from './bot/Bot';

(async () => {
  try {
    const bot = new Bot(config.token);
    await initDB(config);
    bot.launch();
    console.log('Bot started successfully.');
  } catch (error) {
    console.error('Failed to start the bot:', error);
  }
})()