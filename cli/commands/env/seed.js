import { logger } from '../../utils/logger.js';
import { execute } from '../../utils/execute.js';
import { findPath } from '../../utils/findPath.js';
import { sourceFile } from './mysql/sourceFile.js';
import { repodata } from '../../utils/metadata.js';

// seed db via seed sql file (m12)
export async function sqlSeed(un, pw) {
  try {
    const seedPath =
      (await findPath(process.cwd(), 'seed.sql')) || (await findPath(process.cwd(), 'seeds.sql'));

    logger.info('seeding database...');
    if (seedPath) {
      logger.info(`seed file found: ${seedPath}`);
      await sourceFile(un, pw, seedPath);
    } else {
      logger.warn('seed file not found.');
    }
  } catch (error) {
    logger.warn('error seeding file. check for a database name mismatch.');
  }
}

// seed db via npm script (m13)
export async function npmSeed() {
  logger.info('seeding database...');
  if (repodata.scripts.seed) {
    await execute(repodata.scripts.seed);
    logger.info('database seeded!');
  } else {
    logger.error('npm seed script not found');
  }
}
