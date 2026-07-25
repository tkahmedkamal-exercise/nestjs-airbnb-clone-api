import { Environment } from '../env.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): Environment => ({
  ...defaultEnv(),
  accessTokenExpiresIn: '1h',
  refreshTokenExpiresIn: '30d',
});
