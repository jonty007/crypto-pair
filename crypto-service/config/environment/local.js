'use strict';

// Local Development specific configuration
// ==================================

module.exports = {
  database: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  host: 'http://localhost:4001',
  https: false,
  http: {},
  cryptoCompare: {
    baseURL: 'https://min-api.cryptocompare.com',
    compare: '/data/pricemultifull'
  },
  startCron: true
};
