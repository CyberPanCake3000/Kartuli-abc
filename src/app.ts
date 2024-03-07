import 'dotenv/config'
import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN || '');
console.log(bot);