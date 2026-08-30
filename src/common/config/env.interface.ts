export interface Environment {
  port: number;
  fullbackLanguage: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  superAdmin: SuperAdmin;
  s3: AwsS3;
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
