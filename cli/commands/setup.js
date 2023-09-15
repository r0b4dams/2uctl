import {
  execute,
  findPath,
  getCredentials,
  getDbName,
  logger,
  sourceFile,
} from "../../utils/index.js";

import { env } from "./env.js";

/**
 * Setup the development environment for the SQL modules (12, 13, & 14)
 * @param {string} module "m12" | "m13" | "m14"
 */
export async function setup(module) {
  try {
    if (!["m12", "m13", "m14"].includes(module)) {
      throw new Error("invalid module given");
    }

    switch (module) {
      case "m12":
        logger.init("Setup Module 12 - Employee Tracker");
        break;
      case "m13":
        logger.init("Setup Module 13 - E-Commerce Back End");
        break;
      case "m14":
        logger.init("Setup Module 14 - Tech Blog");
        break;
    }

    const schemaPath = await findPath(process.cwd(), "schema.sql");

    if (schemaPath) {
      logger.info(`Schema file found @ ${schemaPath}`);
    } else {
      logger.warn("Schema file not found");
      throw new Error("Schema file not found");
    }

    const db = await getDbName(schemaPath);
    logger.info("Database name:", db);

    const [un, pw] = await getCredentials();
    await sourceFile(un, pw, schemaPath);

    logger.info("Generating .env file...");
    await env([`DB_NAME=${db}`, `DB_USER=${un}`, `DB_PASS=${pw}`]);
    logger.info(".env generated!");

    switch (module) {
      case "m12":
        m12(un, pw);
        break;
      case "m13":
        m13();
        break;
      case "m14":
        m14();
        break;
    }
  } catch (error) {
    logger.error(error.message);
  }
}

async function m12(un, pw) {
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

  logger.info("Installing dependencies...");
  await execute("npm install");
  logger.info("Dependencies installed!");
}

async function m13() {
  logger.info("Installing dependencies...");
  await execute("npm install");
  logger.info("Dependencies installed!");

  logger.info("Seeding database...");
  await execute("npm run seed");
  logger.info("Database seeded!");
}

async function m14() {
  logger.info("Installing dependencies...");
  await execute("npm install");
  logger.info("Dependencies installed!");
}
