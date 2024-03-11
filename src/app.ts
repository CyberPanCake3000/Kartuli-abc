import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { config } from './config';
import { initDB } from './connect';
import { setupBot } from './bot';

(async () => {
  try {
    const bot = new Telegraf(config.token);
    await initDB(config);
    setupBot(bot);
    bot.launch();
    console.log('Bot started successfully.');
  } catch (error) {
    console.error('Failed to start the bot:', error);
  }
})()