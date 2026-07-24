import { Environment } from '../env.interface';
import { defaultEnv } from './default.env';

export const developmentEnv = (): Environment => ({
  ...defaultEnv(),
});
