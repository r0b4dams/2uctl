import { logger } from '../../utils/logger.js';
import { execute } from '../../utils/execute.js';
import { repodata } from '../../utils/metadata.js';

export async function npmSeed() {
  logger.info('seeding database...');
  if (repodata.scripts.seed) {
    await execute(repodata.scripts.seed);
    logger.info('database seeded!');
  } else {
    logger.error('npm seed script not found');
  }
}
