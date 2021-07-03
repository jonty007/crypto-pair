import { logger } from '../../app/app.logger';
import { getPairInfo } from '../../boundaries/crypto_compare';
import { cryptos, currencies } from '../../common/constants';
import { parsePairDataAsArray } from '../../common/crypto_compare_data_parser';
import { insertCryptoPairs } from './crypto-compare.sql';

export async function startSyncingCryptoPairs() {
  logger.info('Started syncing crypto pairs.');
  const fsymsList = cryptos;
  const tsyms = currencies.join(',');
  const cryptoPairPromiseList = [];
  const insertPromiseList = [];
  // iterating over each crypto pair and fetching respective data
  fsymsList.forEach(crypto => {
    cryptoPairPromiseList.push(getPairInfo(crypto, tsyms));
  });
  const cryptoPairsData = await Promise.all(cryptoPairPromiseList);
  // using normal for loop for keeping it in sync
  for (let i = 0; i < cryptoPairsData.length; i++) {
    const parsedData = parsePairDataAsArray(cryptoPairsData[i]);
    insertPromiseList.push(insertCryptoPairs(parsedData));
  }
  await Promise.all(insertPromiseList);
  logger.info('Completed syncing crypto pairs');
}
