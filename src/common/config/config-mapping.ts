import { developmentEnv } from './env-modes/development';
import { productionEnv } from './env-modes/production';
import { stagingEnv } from './env-modes/staging';
import { Environment } from './env.interface';

const environment: Record<string, () => Environment> = {
  development: developmentEnv,
  production: productionEnv,
  staging: stagingEnv,
};

export default () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const getEnvToLoad = environment[nodeEnv] || developmentEnv;

  return getEnvToLoad();
};
