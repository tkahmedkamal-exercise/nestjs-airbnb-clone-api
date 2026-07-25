import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  NODE_ENV: joi.string().required(),
  FALLBACK_LANGUAGE: joi.string().default('en'),
  MONGO_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: joi.string().default('7d'),
  REFRESH_TOKEN_EXPIRES_IN: joi.string().default('7d'),
});
