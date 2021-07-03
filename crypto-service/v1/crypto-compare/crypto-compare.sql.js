import { executeMultiInsert, executeSelect } from '../../db';

export async function insertCryptoPairs(pairsInfo) {
  const query = `INSERT INTO crypto_compare
    (fsym, tsym, rawInfo, displayInfo) values ?;`;
  await executeMultiInsert(query, pairsInfo);
}

export async function getCryptoPairs(fsym, tsym) {
  const query = `SELECT * FROM crypto_compare 
    where fsym = ? and tsym = ? order by recordedAt DESC limit 1;`;
  return await executeSelect(query, [fsym, tsym]);
}
