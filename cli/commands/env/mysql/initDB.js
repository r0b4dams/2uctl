import { spawn } from 'child_process';

import { sql } from './sql.js';
import { findPath } from '../../../utils/findPath.js';
import { normalize } from '../../../utils/normalize.js';
import { logger } from '../../../utils/logger.js';

/**
 * login to mysql shell and setup database
 * @param {{[key:string]:string}} args
 * @param {{[key:string]:string}} opts
 * @returns {Promise<void>}
 */
export async function initDB(args, opts = {}) {
  return new Promise((resolve, reject) => {
    const mysql = spawn('mysql', [`-u${args.un}`, `-p${args.pw}`], {
      shell: true,
      stdio: [
        'pipe', // stdin
        'pipe', // stdout
        'pipe', // stderr
      ],
    });

    mysql.execute = (cmd) => {
      mysql.stdin.write(sql(cmd), (err) => {
        if (err) {
          reject(err);
        }
      });
    };

    mysql.on('spawn', async () => {
      if (args.schema) {
        mysql.execute(`SOURCE ${normalize(args.schema)};`);
      } else {
        mysql.execute(`DROP DATABASE IF EXISTS ${args.db};`);
        mysql.execute(`CREATE DATABASE ${args.db};`);
      }

      if (opts.module === '12') {
        const seed =
          (await findPath(process.cwd(), 'seed.sql')) ||
          (await findPath(process.cwd(), 'seeds.sql'));

        if (seed) {
          logger.info('seed file found');
          mysql.execute(`USE ${args.db};`);
          mysql.execute(`SOURCE ${normalize(seed)};`);
        } else {
          logger.warn('seed file not found');
        }
      }

      mysql.execute('quit');
    });

    mysql.stderr.on(
      'data',
      /**@param {Buffer} err*/
      (err) => {
        const error = err.toString('utf-8').trim();

        if (error.includes('ERROR')) {
          reject(error);
        }
      },
    );

    mysql.on('close', (code) => {
      logger.info(`logged out of mysql shell`);
      resolve();
    });
  });
}
