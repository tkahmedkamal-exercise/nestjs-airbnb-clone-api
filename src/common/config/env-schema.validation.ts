import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  NODE_ENV: joi.string().required(),
  FALLBACK_LANGUAGE: joi.string().default('en'),
  MONGO_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: joi.string().default('7d'),
  REFRESH_TOKEN_EXPIRES_IN: joi.string().default('7d'),
  SUPER_ADMIN_NAME: joi.string().required(),
  SUPER_ADMIN_EMAIL: joi.string().email().required(),
  SUPER_ADMIN_PASSWORD: joi.string().min(6).max(100).required(),
  S3_REGION: joi.string().required(),
  S3_ACCESS_KEY_ID: joi.string().required(),
  S3_BUCKET_NAME: joi.string().required(),
  MINIO_S3_ENDPOINT: joi.string(),
  SMTP_HOST: joi.string().required(),
  SMTP_PORT: joi.number().required(),
  SMTP_SECURE: joi.boolean().required(),
  SMTP_AUTH_EMAIL: joi.string().optional().allow('').default(''),
  SMTP_AUTH_PASS: joi.string().optional().allow('').default(''),
});
