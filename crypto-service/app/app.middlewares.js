import cors from 'cors';
import { json, urlencoded } from 'express';
import compression from 'compression';
import i18n from '../config/i18n.config';
import translateMessage from '../middlewares/translate_message';

export default function(app) {
  app.use(compression());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(
    cors({
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'.split(','),
      allowedHeaders: 'Content-Type,Authorization,Cache-Control'.split(','),
      preflightContinue: true
    })
  );

  app.use(function(req, res, next) {
    const query = {};

    Object.keys(req.query).forEach(key => {
      if (req.query[key] === 'true' || req.query[key] === 'false') {
        query[key] = req.query[key] === 'true';
      } else {
        query[key] = req.query[key];
      }
    });
    req.query = query;
    next();
  });

  // use internationalization for different locales
  app.use(i18n.init);

  app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }
    return next();
  });

  // health check for server
  app.use('/status', (req, res, next) => {
    res.send({ success: true, message: 'is.alive' });
  });

  translateMessage(app);
}
