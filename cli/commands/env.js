import { open, appendFile } from "fs/promises";
import {
  DEFAULTS,
  logger,
  execute,
  findPath,
  getCredentials,
  getDbName,
  sourceFile,
} from "../../utils/index.js";

const UN_FALLBACK = ["DB_USER", "DB_USERNAME", "DB_UN"];
const PW_FALLBACK = ["DB_PASS", "DB_PASSWORD", "DB_PW"];

const ENV = { ...DEFAULTS };

/**
 * generates a .env file in the directory where the command was invoked
 * @param {string[]} vars a list of key/value pairs of the form KEY=VALUE
 */
export async function env(args, opts) {
  const schemaPath = await findPath(process.cwd(), "schema.sql");

  if (!args.DB_NAME) {
    ENV.DB_NAME = await getDbName(schemaPath);
  }

  args.forEach((keyval) => {
    const [key, val] = keyval.split("=");
    if (UN_FALLBACK.includes(key)) {
      UN_FALLBACK.forEach((fbKey) => (ENV[fbKey] = val));
    } else if (PW_FALLBACK.includes(key)) {
      PW_FALLBACK.forEach((fbKey) => (ENV[fbKey] = val));
    } else {
      ENV[key] = val;
    }
  });

  if (opts?.module && schemaPath) {
    switch (opts.module) {
      case "12":
        logger.init("Setup Module 12 - Employee Tracker");
        break;
      case "13":
        logger.init("Setup Module 13 - E-Commerce Back End");
        break;
      case "14":
        logger.init("Setup Module 14 - Tech Blog");
        break;
      default:
        throw new Error("module not recognized");
    }
    logger.info(`Schema file found @ ${schemaPath}`);

    const db = await getDbName(schemaPath);
    logger.info("Database name:", db);

    let un, pw;
    if (opts.user && opts.password) {
      un = opts.user;
      // passing just the -p flag saves a true value
      pw = typeof opts.password === "boolean" ? "" : opts.password;
    } else {
      [un, pw] = await getCredentials();
    }

    await sourceFile(un, pw, schemaPath);

    switch (opts.module) {
      case "12":
        await install();
        await sqlSeed(un, pw);
        break;
      case "13":
        await install();
        await npmSeed();
        break;
      case "14":
        await install();
        break;
    }
  } else if (opts?.module) {
    logger.warn("Schema file not found");
  }

  logger.info("Generating .env file...");
  write(".env");
  logger.info(".env generated!");
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

async function install() {
  logger.info("Installing dependencies...");
  await execute("npm install");
  logger.info("Dependencies installed!");
}

async function npmSeed() {
  logger.info("Seeding database...");
  await execute("npm run seed");
  logger.info("Database seeded!");
}

async function sqlSeed(un, pw) {
  const seedPath =
    (await findPath(process.cwd(), "seed.sql")) ||
    (await findPath(process.cwd(), "seeds.sql"));

  logger.info("Seeding database...");
  if (seedPath) {
    logger.info(`Seed file found @ ${seedPath}`);
    await sourceFile(un, pw, seedPath);
  } else {
    logger.warn("Seed file not found");
  }
}
