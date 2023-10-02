import { spawn } from 'child_process';
import { search } from './search.js';
import { initDB } from './initDB.js';
import { getDB } from './getDB.js';
import { findPath } from '../../../utils/findPath.js';
import { logger } from '../../../utils/logger.js';

export async function mysql(env, opts) {
  const { io } = await import('../../../utils/io.js');

  try {
    let un, pw;

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

    let db, schema;

    if (env.DB_NAME) {
      logger.info(`using DB_NAME=${env.DB_NAME}. skipping schema.sql search.`);
      db = env.DB_NAME;
    } else {
      logger.info(`searching for schema sql file`);
      const result = await search(io);
      if (result.schema) {
        schema = result.schema;
      }
      db = result.db;
    }

    await initDB({ un, pw, db, schema }, opts);
    return db;
  } catch (error) {
    logger.error(error);
    logger.error(`unable to create database`);
  } finally {
    io.close();
  }
}
