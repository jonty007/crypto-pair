import { createApp } from './app/app.setup';
import { init } from './db';

const config = require('./config');

// initialize database
init(config.database);

const { app, http_server } = createApp(config);
export { app, http_server };

/*
  NOTE: app listen is through .bin/server
*/
