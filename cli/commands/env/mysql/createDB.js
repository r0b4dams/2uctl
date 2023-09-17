import { exec } from "child_process";
import { logger } from "../../../utils/logger.js";

/**
 * Invokes the mysql shell with the given credentials to create a database with the given name.
 * Drops the database first if it exists.
 * @param {string} un mysql username
 * @param {string} pw mysql password
 * @param {string} db database name to create
 * @returns
 */
export function createDB(un, pw, db) {
  return new Promise((resolve, reject) => {
    exec(
      `mysql -u${un} -p${pw} -e "DROP DATABASE IF EXISTS ${db}; CREATE DATABASE ${db}"`,
      (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          logger.info(`created database: ${db}`);
          resolve();
        }
      }
    );
  });
}
