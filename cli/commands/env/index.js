import { DEFAULTS } from "./defaults.js";
import { writeEnv } from "./writeEnv.js";
import { initMySQL } from "./initMySQL.js";
import { initModule } from "./initModule.js";
import { logger } from "../../utils/logger.js";

const UN_FALLBACK = ["DB_USER", "DB_USERNAME", "DB_UN"];
const PW_FALLBACK = ["DB_PASS", "DB_PASSWORD", "DB_PW"];

/**
 * generates a .env file in the directory where the command was invoked
 * @param {string[]} vars a list of key/value pairs of the form KEY=VALUE
 */
export async function env(args, opts = {}) {
  try {
    const ENV = { ...DEFAULTS };

    if (opts.user) {
      UN_FALLBACK.forEach((fbKey) => (ENV[fbKey] = opts.user));
    }

    if (opts.password) {
      PW_FALLBACK.forEach((fbKey) => (ENV[fbKey] = opts.password));
    }

    args.forEach((keyval) => {
      const [key, val] = keyval.split("=");
      if (!opts.user && UN_FALLBACK.includes(key)) {
        UN_FALLBACK.forEach((fbKey) => (ENV[fbKey] = val));
      } else if (!opts.password && PW_FALLBACK.includes(key)) {
        PW_FALLBACK.forEach((fbKey) => (ENV[fbKey] = val));
      } else {
        ENV[key] = val;
      }
    });

    if (opts.module || opts.sql) {
      const db = await initMySQL(ENV, opts);
      if (db) {
        ENV.DB_NAME = db;
      }
    }

    if (opts.debug) {
      logger.debug(ENV);
    }

    await writeEnv(".env", ENV);

    if (opts.module) {
      await initModule(ENV, opts);
    }
  } catch (error) {
    logger.error(error);
  }
}
