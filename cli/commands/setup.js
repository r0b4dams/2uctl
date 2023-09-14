import { resolve } from "path";
import { exec } from "child_process";

import { rl } from "../readline.js";
import { logger } from "../../utils/index.js";

export function setup(module, _options) {
  if (!["m12", "m13", "m14"].includes(module)) {
    throw new Error("invalid module given");
  }

  switch (module) {
    case "m12":
      m12();
      break;
    case "m13":
      m13();
      break;
    case "m14":
      m14();
      break;
    default:
      throw new Error("module not recognized");
  }
}

//
const defaults = {
  un: "root",
  pw: "password",
  src: "schema.sql",
};

async function mysql() {
  let un = await rl.ask(`Enter mysql username (${defaults.un}): `);
  if (!un) {
    un = defaults.un;
  }
  let pw = await rl.ask(`Enter mysql password (${defaults.pw}): `);
  if (!pw) {
    pw = defaults.pw;
  }
  rl.close();

  logger.info("Connecting to MySQL...");

  const mysql = exec(
    `mysql -u${un} -p${pw} -e "source ${resolve("db", defaults.src)}"`,
    (error, stdout) => {
      if (!error) {
        logger.ok("Database sourced successfully!");
      } else if (stdout) {
        logger.info(stdout);
      }
    }
  );

  mysql.stderr.on("data", (output) => {
    if (output.includes("ERROR")) {
      logger.warn("Could not source schema.sql");
      logger.err(output.trim());
    }
  });

  mysql.on("close", (code) => {
    logger.info(`MySQL disconnected with exit code ${code}`);
  });
}

function m12() {
  console.log("setup module 12 challenge env");
  mysql();
}

function m13() {
  console.log("setup module 13 challenge env");
  // search for schema.sql or db/schema.sql
  // if not found throw err
  // prompt for mysql un and pw to create database (and add to ENV)
}

function m14() {
  console.log("setup module 14 challenge env");
  // search for schema.sql or db/schema.sql
  // if not found throw err
  // prompt for mysql un and pw to create database (and add to ENV)
}

/**
 * m12
 * prompt user for input:
 * mysql username? (root)
 * mysql password? (password)
 *
 * want to find schema.sql file
 * if found,
 * source it via exec method
 *
 * want to find seed.sql file
 * if found,
 * source it via exex method
 *
 * I'd love to be able to update the connection as well,
 * but there are too many ways students can set up this logic
 * many students don't modularize this assignment, for example
 */
