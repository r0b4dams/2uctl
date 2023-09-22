import { readFile } from 'fs/promises';
import { findPath } from './findPath.js';

async function getThisMetaData() {
  const path = new URL('../../package.json', import.meta.url);
  if (path) {
    return JSON.parse(await readFile(path));
  }
  throw new Error('CLI package.json not found');
}

async function getRepoMetadata() {
  const path = await findPath(process.cwd(), 'package.json');
  if (path) {
    return JSON.parse(await readFile(path));
  }
  throw new Error('package.json not found');
}

export const metadata = await getThisMetaData();
export const repodata = await getRepoMetadata();
