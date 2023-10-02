import { findPath } from '../../../utils/findPath.js';
import { logger } from '../../../utils/logger.js';
import { getDB } from './getDB.js';
/**
 * @param {readline.Interface} io
 * @returns {Promise<{schema?:string, db:string}>}
 */
export async function search(io) {
  let db;
  const schema = await findPath(process.cwd(), 'schema.sql');
  if (schema) {
    logger.info(`schema.sql found: ${schema}`);
    db = await getDB(schema);
    logger.info(`database name: ${db}`);
  } else {
    logger.warn(`schema.sql file not found`);
    while (!db) {
      const res = await io.ask(`please enter a database name: `);
      db = res.trim();
    }
  }
  return { db, schema };
}
