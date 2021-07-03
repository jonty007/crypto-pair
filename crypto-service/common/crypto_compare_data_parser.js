import { logger } from '../app/app.logger';

function parseCryptoCompareData(data, convertToString = false) {
  if (!data) {
    return null;
  }
  const parseData = {
    CHANGE24HOUR: data['CHANGE24HOUR'],
    CHANGEPCT24HOUR: data['CHANGEPCT24HOUR'],
    OPEN24HOUR: data['OPEN24HOUR'],
    VOLUME24HOUR: data['VOLUME24HOUR'],
    VOLUME24HOURTO: data['VOLUME24HOURTO'],
    LOW24HOUR: data['LOW24HOUR'],
    HIGH24HOUR: data['HIGH24HOUR'],
    PRICE: data['PRICE'],
    LASTUPDATE: data['LASTUPDATE'],
    SUPPLY: data['SUPPLY'],
    MKTCAP: data['MKTCAP']
  };
  return convertToString ? JSON.stringify(parseData) : parseData;
}

export function parsePairData(pairData) {
  const parsedData = [];
  if (!pairData || (pairData.Response && pairData.Response === 'Error')) {
    logger.error(pairData.Message);
  } else {
    const rawInfo = pairData['RAW'];
    const displayInfo = pairData['DISPLAY'];
    for (let [cryptoKey, cryptoData] of Object.entries(rawInfo)) {
      for (let [currencyKey, compareData] of Object.entries(cryptoData)) {
        const rawParsedData = parseCryptoCompareData(compareData);
        const displayParsedData = parseCryptoCompareData(displayInfo[cryptoKey][currencyKey]);
        if (rawParsedData && displayParsedData) {
          parsedData.push({
            fsym: cryptoKey,
            tsym: currencyKey,
            rawInfo: rawParsedData,
            displayInfo: displayParsedData
          });
        }
      }
    }
  }

  return parsedData;
}

export function getStandardFormData(pairData) {
  if (!pairData || (pairData.Response && pairData.Response === 'Error')) {
    logger.error(pairData.Message);
    return {};
  } else {
    const rawInfo = pairData['RAW'];
    const displayInfo = pairData['DISPLAY'];
    for (let [cryptoKey, cryptoData] of Object.entries(rawInfo)) {
      for (let [currencyKey, compareData] of Object.entries(cryptoData)) {
        const rawParsedData = parseCryptoCompareData(compareData);
        const displayParsedData = parseCryptoCompareData(displayInfo[cryptoKey][currencyKey]);
        if (rawParsedData && displayParsedData) {
          rawInfo[cryptoKey][currencyKey] = rawParsedData;
          displayInfo[cryptoKey][currencyKey] = displayParsedData;
        }
      }
    }
  }

  return pairData;
}

export function parsePairDataAsArray(pairData) {
  const parsedData = [];
  if (!pairData || (pairData.Response && pairData.Response === 'Error')) {
    logger.error(pairData.Message);
  } else {
    const rawInfo = pairData['RAW'];
    const displayInfo = pairData['DISPLAY'];
    for (let [cryptoKey, cryptoData] of Object.entries(rawInfo)) {
      for (let [currencyKey, compareData] of Object.entries(cryptoData)) {
        const rawParsedData = parseCryptoCompareData(compareData, true);
        const displayParsedData = parseCryptoCompareData(displayInfo[cryptoKey][currencyKey], true);
        if (rawParsedData && displayParsedData) {
          parsedData.push([cryptoKey, currencyKey, rawParsedData, displayParsedData]);
        }
      }
    }
  }

  return parsedData;
}
