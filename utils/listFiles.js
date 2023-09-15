import { resolve } from "path";
import { lstat, readdir } from "fs/promises";

const IGNORE = ["node_modules", ".git"];

/**
 * async generator that collects all absolute filepaths in the given dir
 * @param {string} path the root directory of the search
 */
async function* ls(path = process.cwd()) {
  const files = await readdir(path);

  for (const filename of files) {
    if (IGNORE.includes(filename)) {
      continue;
    }

    const filepath = resolve(path, filename);
    const filestat = await lstat(filepath);

    if (filestat.isDirectory()) {
      yield* ls(filepath);
    } else {
      yield filepath;
    }
  }
}

/**
 * prints absolute paths for all files in the given dir
 * @param {string} path the root directory of the search
 */
export async function listFiles(path) {
  for await (const filename of ls(path)) {
    console.log(filename);
  }
}
