import { readFile } from 'fs/promises';
import { findPath } from './findPath.js';
import { logger } from './logger.js';

export const metadata = await getPackageJson('this');
export const repodata = await getPackageJson();

/**
 * parse package.json to get metadata
 *
 * if type === 'this', returns the CLI package.json data
 * @param {string} type
 */
async function getPackageJson(type) {
  let path;
  switch (type) {
    default:
      path = await findPath(process.cwd(), 'package.json');
      break;
    case 'this':
      path = new URL('../../package.json', import.meta.url);
      break;
  }
  if (!path) {
    logger.warn('package.json not found');
    return;
  }
  return JSON.parse(await readFile(path));
}
