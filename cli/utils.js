import { readFile } from "fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

export const VERSION = pkg.version;

export const PATH = ".env";

export const ENV = {
  DB_USERNAME: "root",
  DB_PASSWORD: "password",
  DB_PASS: "password",
  DB_NAME: "ecommerce_db",
  MONGODB_URI: "mongodb://127.0.0.1:27017/m18_social_media_api",
};
