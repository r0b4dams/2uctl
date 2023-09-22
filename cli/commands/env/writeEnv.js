import { open, appendFile } from 'fs/promises';
import { logger } from '../../utils/logger.js';

/**
 * write the ENV object to given path
 * @param {string} path
 */
export async function writeEnv(path, data = {}) {
  logger.info('Generating .env file...');

  const fileHandle = await open(path, 'w');
  for (const [key, val] of Object.entries(data)) {
    // append entry-by-entry to preserve KEY=VALUE syntax
    await appendFile(path, `${key}="${val}"\n`, 'utf8');
  }
  await fileHandle.close();
  logger.info('.env generated');
}
