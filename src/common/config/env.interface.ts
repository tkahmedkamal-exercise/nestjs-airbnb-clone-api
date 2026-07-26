export interface Environment {
  port: number;
  fullbackLanguage: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}
