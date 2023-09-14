import { resolve } from "path";
import { lstat, readdir } from "fs/promises";

const IGNORE = ["node_modules", ".git"];

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

export async function listFiles(dir) {
  for await (const path of ls(dir)) {
    console.log(path);
  }
}
