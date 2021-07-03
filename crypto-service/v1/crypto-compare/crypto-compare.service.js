import { logger } from '../../app/app.logger';
import { getPairInfo } from '../../boundaries/crypto_compare';
import { cryptos, currencies } from '../../common/constants';
import { getStandardFormData } from '../../common/crypto_compare_data_parser';
import { getCryptoPairs } from './crypto-compare.sql';

export async function comparePairs(fsyms, tsyms, failRequestManually = false) {
  if (!fsyms || !fsyms.trim() || !tsyms || !tsyms.trim()) {
    throw new Error('CRYPTO_COMPARE.ERROR.INVALID_PAIR');
  }
  const fsymsList = fsyms.split(',');
  const tsymsList = tsyms.split(',');

  const validFsym = fsymsList.every(val => cryptos.includes(val));
  if (!validFsym) {
    throw new Error('CRYPTO_COMPARE.ERROR.NOT_SUPPORTED_PAIR');
  }
  const validTsym = tsymsList.every(val => currencies.includes(val));
  if (!validTsym) {
    throw new Error('CRYPTO_COMPARE.ERROR.NOT_SUPPORTED_PAIR');
  }
  try {
    if (failRequestManually) {
      throw new Error('Manual fail of crypto compare API');
    }
    const pairsInfo = await getPairInfo(fsyms, tsyms);
    const parsedPairsData = getStandardFormData(pairsInfo);
    return parsedPairsData;
  } catch (error) {
    logger.error(error);
    const selectPromiseList = [];
    // TODO optimize this select query
    for (let i = 0; i < fsymsList.length; i++) {
      for (let j = 0; j < tsymsList.length; j++) {
        selectPromiseList.push(getCryptoPairs(fsymsList[i], tsymsList[j]));
      }
    }
    const results = await Promise.all(selectPromiseList);
    const response = {};
    response['RAW'] = {};
    response['DISPLAY'] = {};

    for (let i = 0; i < results.length; i++) {
      if (results[i] && results[i][0] && results[i][0].length) {
        const result = results[i][0][0];
        if (!response['RAW'][result['fsym']]) {
          response['RAW'][result['fsym']] = {};
        }
        if (!response['DISPLAY'][result['fsym']]) {
          response['DISPLAY'][result['fsym']] = {};
        }

        response['RAW'][result['fsym']][result['tsym']] = result['rawInfo'];
        response['DISPLAY'][result['fsym']][result['tsym']] = result['displayInfo'];
      }
    }
    return response;
  }
}
