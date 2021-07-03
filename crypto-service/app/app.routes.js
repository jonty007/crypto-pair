import { Router } from 'express';
const path = require('path');

const v1router = Router();

export default function(app) {
  app.use('/api/v1', v1router);

  v1router.use(require('../v1/crypto-compare/crypto-compare.controller').default);

}
