import appCrons from '../app/app.crons';
import { logger } from '../app/app.logger';
import { initDB } from './scripts/init';

const mysql = require('mysql2');

let pool;

const init = async function(config) {
  logger.info('Connecting with DB server.');
  pool = mysql.createPool(config);
  const connection = pool.promise();
  await initDB(connection);
  logger.info('DB initialized');
  logger.info('Initializing cron jobs');
  appCrons();
};

const getConnection = async function() {
  if (pool) {
    return pool.promise();
  } else {
    logger.error('connection pool not initialized.');
    throw new Error('DB.ERROR.INIT_ERROR');
  }
};

const executeMultiInsert = async function(query, rows) {
  const connection = pool.promise();
  await connection.query(query, [rows], true);
};

const executeSelect = async function(query, params) {
  const connection = pool.promise();
  const result = await connection.query(query, params);
  return result;
};

export { init, getConnection, executeMultiInsert, executeSelect };
