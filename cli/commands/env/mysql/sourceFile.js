import { exec } from 'child_process';
import { logger } from '../../../utils/logger.js';

/**
 * invokes the mysql shell with the given credentials
 * and executes the SQL SOURCE command on the given file
 * @param {string} un mysql user
 * @param {string} pw mysql password
 * @param {string} src path to the sql file
 * @returns {Promise<void>}
 */
export async function sourceFile(un, pw, src) {
  return new Promise((resolve, reject) => {
    const mysql = exec(`mysql -u${un} -p${pw} -e "SOURCE ${src}"`, (error) => {
      if (error) {
        reject(error);
      } else {
        logger.info(`sourced ${src}`);
        resolve();
      }
    });

    mysql.stderr.on('data', (output) => {
      if (output.includes('ERROR')) {
        logger.warn(`could not source file: ${src}`);
        logger.error(output.trim());
      }
    });
  });
}
