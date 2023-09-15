import { open, appendFile } from "fs/promises";
import { DEFAULTS, findPath, getDbName } from "../../utils/index.js";

const UN_FALLBACK = ["DB_USER", "DB_USERNAME", "DB_UN"];
const PW_FALLBACK = ["DB_PASS", "DB_PASSWORD", "DB_PW"];
const ENV = { ...DEFAULTS };

/**
 * generates a .env file in the directory where the command was invoked
 * @param {string[]} vars a list of key/value pairs of the form KEY=VALUE
 */
export async function env(vars) {
  if (!vars.DB_NAME) {
    const schemaPath = await findPath(process.cwd(), "schema.sql");
    ENV.DB_NAME = await getDbName(schemaPath);
  }

  vars.forEach((keyval) => {
    const [key, val] = keyval.split("=");

    if (UN_FALLBACK.includes(key)) {
      UN_FALLBACK.forEach((fbKey) => (ENV[fbKey] = val));
    } else if (PW_FALLBACK.includes(key)) {
      PW_FALLBACK.forEach((fbKey) => (ENV[fbKey] = val));
    } else {
      ENV[key] = val;
    }
  });

  write(".env");
}

/**
 * write the ENV object to given path
 * @param {string} path
 */
async function write(path) {
  const fileHandle = await open(path, "w");
  for (const [key, val] of Object.entries(ENV)) {
    // append entry-by-entry to preserve KEY=VALUE syntax
    await appendFile(path, `${key}="${val}"\n`, "utf8");
  }
  await fileHandle.close();
}
