import { readFile } from "fs/promises";

const packageJSON = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

export const semver = packageJSON.version;
