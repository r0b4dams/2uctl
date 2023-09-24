import { sourceFile } from './mysql/sourceFile.js';
import { getDB } from './mysql/getDB.js';
import { createDB } from './mysql/createDB.js';

import { findPath } from '../../utils/findPath.js';
import { logger } from '../../utils/logger.js';

/**
 * create a MySQL database
 * @param {{[key: string]: string}} env
 * @param {{user: string; password: string; module: string; debug: boolean}} opts
 * @returns {Promise<string>} name of the created database
 */
export async function initMySQL(env, opts) {
  const { io } = await import('../../utils/io.js');

  try {
    let un, pw;

    // passing an option with no arg sets the option to true
    // but strings are needed to login to the shell

    if (typeof opts?.user === 'string') {
      un = opts.user;
    } else {
      const res = await io.ask(`enter mysql username (${env.DB_UN}): `);
      un = res || env.DB_UN;
    }

    if (typeof opts?.password === 'string') {
      pw = opts.password;
    } else {
      const res = await io.ask(`enter mysql password (${env.DB_PW}): `);
      pw = res || env.DB_PW;
    }

    let db = env.DB_NAME;

    if (db) {
      logger.info(`using DB_NAME=${db}. skipping schema.sql search.`);
      await createDB(un, pw, db);
    } else {
      db = await searchOrPrompt(un, pw, io);
    }

    return db;
  } catch (error) {
    logger.error(`unable to create database`);
  } finally {
    io.close();
  }
}

/**
 * recursively searches the working dir for a schema.sql file.
 *
 * if not found, prompts for mysql username and password
 * @param {string} un mysql username
 * @param {string} pw mysql password
 * @param {string} io readline interface
 * @returns {Promise<string>} name of the created db
 */
async function searchOrPrompt(un, pw, io) {
  const schemaPath = await findPath(process.cwd(), 'schema.sql');
  let db;

  if (schemaPath) {
    logger.info(`schema.sql found: ${schemaPath}`);

    db = await getDB(schemaPath);
    logger.info(`database name: ${db}`);

    await sourceFile(un, pw, schemaPath);
  } else {
    logger.warn(`schema.sql file not found`);

    while (!db) {
      const res = await io.ask(`please enter a database name: `);
      db = res.trim();
    }

    await createDB(un, pw, db);
  }
  return db;
}
