import 'dotenv/config';
import { connect } from 'mongoose';
import { AppConfig } from './config';

export let conn: any;

export const initDB = async (config: AppConfig) => {
  conn = await connect(config.mongoConnectString);
  return conn;
}
