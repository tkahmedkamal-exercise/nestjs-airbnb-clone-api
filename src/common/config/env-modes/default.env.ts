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
  s3: {
    region: process.env.S3_REGION!,
    accessKey: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    bucketName: process.env.S3_BUCKET_NAME!,
    minioEndpoint: process.env.MINIO_S3_ENDPOINT!,
  },
});
