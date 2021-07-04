const path = require('path');

// All configurations will extend these options
// ============================================
let all = {
  name: 'Crypto Pair',
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '..'), // Root path of server
  port: process.env.PORT || 4001, // Server port
  logLevel: process.env.LOG_LEVEL || 'debug'
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign(all, require('./environment/' + process.env.NODE_ENV + '.js') || {});
