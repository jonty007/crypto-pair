import { createCryptoPairsSyncCron } from '../common/cron_service';
import { logger } from './app.logger';
import { startCron } from '../config';

export default function() {
  if (startCron) {
    createCryptoPairsSyncCron().start();
    logger.info('Crons Initialized');
  } else {
    logger.debug('Crons stopped!');
  }
}
