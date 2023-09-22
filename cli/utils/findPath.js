import { lstat, readdir } from 'fs/promises';
import { resolve } from 'path';

const IGNORE = ['node_modules', '.git'];

/**
 * async generator to search the given directory for a file or dir name
 */
async function* search(path = process.cwd(), target) {
  const files = await readdir(path);

  for (const filename of files) {
    if (IGNORE.includes(filename)) {
      continue;
    }

    const filepath = resolve(path, filename);
    const filestat = await lstat(filepath);

    if (filestat.isDirectory()) {
      yield* search(filepath, target); // defer to another generator
    } else if (filename === target) {
      yield filepath;
    }
  }
}

/**
 * returns an absolute filepath given a start directory and a target file or dir name
 * returns the first found match, but the generator collects all paths that match target
 *
 * @param {string} startDir directory in which to start the search
 * @param {string} target name of the directory or file to search for
 * @returns {Promise<string>} absolute filepath to the target if found, else undefined
 */
export async function findPath(startDir, target) {
  const searcher = search(startDir, target);
  const { value } = await searcher.next();
  return value;
}
