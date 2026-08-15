import { Environment } from '../env.interface';

export const defaultEnv = (): Environment => ({
  port: Number(process.env.PORT),
  fullbackLanguage: process.env.FALLBACK_LANGUAGE!,
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
  superAdmin: {
    name: process.env.SUPER_ADMIN_NAME!,
    email: process.env.SUPER_ADMIN_EMAIL!,
    password: process.env.SUPER_ADMIN_PASSWORD!,
  },
});
