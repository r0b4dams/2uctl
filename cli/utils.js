import { readFile } from "fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

export const VERSION = pkg.version;

export const PATH = ".env";

export const ENV = {
  // m13
  DB_USERNAME: "root",
  DB_USER: "root",
  DB_PASSWORD: "password",
  DB_PASS: "password",
  DB_NAME: "ecommerce_db",

  // m18
  MONGODB_URI: "mongodb://127.0.0.1:27017/social_media_api",
};
