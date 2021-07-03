import express from 'express';
import appMiddlewares from './app.middlewares';
import appRoutes from './app.routes';
import { logger } from './app.logger';
import { init } from '../boundaries/socket';
import { Server } from 'http';
const appErrorMiddleware = require('../middlewares/app_error');

// Initialize a server and create a express app
export function createApp(config) {
  logger.info('Creating express server...');

  const app = express(),
    http_server = Server(app);

  /* Configures express middlewares, routes */
  appMiddlewares(app);
  appRoutes(app);

  /* Catch all errors sent through next(err) */
  app.use(appErrorMiddleware);

  const io = require('socket.io')({
    path: '/',
    serveClient: false
  });

  io.attach(http_server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

  init(io);

  return { app, http_server };
}
