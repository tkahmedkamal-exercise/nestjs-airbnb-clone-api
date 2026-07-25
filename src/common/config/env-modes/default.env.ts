import { Environment } from '../env.interface';

export const defaultEnv = (): Environment => ({
  port: Number(process.env.PORT),
  fullbackLanguage: process.env.FALLBACK_LANGUAGE!,
  mongoUri: process.env.MONGO_URI!,
});
