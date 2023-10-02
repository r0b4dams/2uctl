import { logger } from '../../utils/logger.js';

import { npmInstall } from './install.js';
import { npmSeed } from './seed.js';

export async function initModule(env, opts) {
  await npmInstall();

  switch (opts.module) {
    case '13':
      if (env.DB_NAME) {
        await npmSeed();
        return;
      }
      logger.warn('.env generated, but database not seeded');
      break;
  }
}
