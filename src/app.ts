import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { config } from './config';
import { initDB } from './connect';

(async () => {
  const bot = new Telegraf(config.token);
  console.log(bot);
  const db_connect = await initDB(config);
  console.log(db_connect);
})()