export interface Environment {
  port: number;
  fullbackLanguage: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  superAdmin: SuperAdmin;
  s3: AwsS3;
  smtp: Smtp;
}

export interface SuperAdmin {
  name: string;
  email: string;
  password: string;
}

export interface AwsS3 {
  region: string;
  accessKey: string;
  secretAccessKey: string;
  bucketName: string;
  minioEndpoint?: string;
}

export interface Smtp {
  host: string;
  port: number;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}
