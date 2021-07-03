import cron from 'cron';
import { logger } from '../app/app.logger';
import { startSyncingCryptoPairs } from '../v1/crypto-compare/crypto-compare.cron';

/* an object to track all running crons */
const cronChecks = {};

export function createCryptoPairsSyncCron() {
  return new cron.CronJob(
    '*/2 * * * *', // Runs Every 2 minutes
    async () => {
      if (!cronChecks.cryptoPairsSyncing) {
        try {
          cronChecks.cryptoPairsSyncing = true;
          await startSyncingCryptoPairs();
          cronChecks.cryptoPairsSyncing = false;
        } catch (error) {
          cronChecks.cryptoPairsSyncing = false;
          logger.error(error);
        }
      } else {
        logger.info('cryptoPairsSyncing ' + cronChecks.cryptoPairsSyncing);
      }
    },
    null, // onComplete
    false, // auto start
    'Asia/Kolkata' // time zone
  );
}
