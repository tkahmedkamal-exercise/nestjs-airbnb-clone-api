import { Environment } from '../env.interface';

export const defaultEnv = (): Environment => ({
  port: Number(process.env.PORT),
});
