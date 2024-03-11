import 'dotenv/config';
import joi from 'joi';

const configSchema = joi.object({
  mongoConnectString: joi.string().required(),
  token: joi.string().required(),
});

const envConfiguration = {
  mongoConnectString: process.env.DB_CONNSTRING,
  token: process.env.BOT_TOKEN,
};

export interface AppConfig {
  mongoConnectString: string,
  token: string,
}

const { value, error } = configSchema.validate(envConfiguration, { convert: true, abortEarly: true });
if (error) {
  throw new Error(`Config validation failed: ${error.message}.`);
}
const config: AppConfig = value;

export { config };
