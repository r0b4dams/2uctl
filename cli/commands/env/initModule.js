import { logger } from '../../utils/logger.js';

import { npmInstall } from './install.js';
import { npmSeed, sqlSeed } from './seed.js';

export async function initModule(env, opts) {
  switch (opts.module) {
    case '12':
      logger.init('setup module 12 challenge - Employee Tracker');
      break;
    case '13':
      logger.init('setup module 13 challenge - E-Commerce Backend');
      break;
    case '14':
      logger.init('setup module 14 challenge - Tech-Blog');
      break;
  }

  await npmInstall();

  switch (opts.module) {
    case '12':
      await sqlSeed(env.DB_UN, env.DB_PW);
      break;
    case '13':
      if (env.DB_NAME) {
        await npmSeed();
        return;
      }
      logger.warn('.env generated, but database not created');
      break;
  }
}
