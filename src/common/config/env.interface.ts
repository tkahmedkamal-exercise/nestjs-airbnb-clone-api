export interface Environment {
  port: number;
  fullbackLanguage: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  superAdmin: SuperAdmin;
}

export interface SuperAdmin {
  name: string;
  email: string;
  password: string;
}
