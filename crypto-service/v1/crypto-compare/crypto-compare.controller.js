import { Router } from 'express';
import { comparePairs } from './crypto-compare.service';
const cryptoCompare = Router();

/**
 * @api {get} /crypto-compare
 * @apiName Get Compare Information
 * @apiGroup Crypto Compare
 * @apiHeader {String} Accept-Language language to get response for any messages from API. default to en (english)
 * 
 * @apiParam (Query) {String} fsyms list of comma separated cryptos
 * @apiParam (Query) {String} tsyms list of comma separated currencies
 * @apiParam (Query) {Bool} fail simulate failure of crypto compare API
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "RAW": {
      "BTC": {
        "USD": {
          "PRICE": 33739.33,
          "MKTCAP": 632501097711,
          "SUPPLY": 18746700,
          "LOW24HOUR": 32763.87,
          "HIGH24HOUR": 33931.27,
          "LASTUPDATE": 1625294752,
          "OPEN24HOUR": 32954.34,
          "CHANGE24HOUR": 784.9900000000052,
          "VOLUME24HOUR": 28555.282377869997,
          "VOLUME24HOURTO": 953131933.662324,
          "CHANGEPCT24HOUR": 2.38205347156097
        },
        "EUR": {
          "PRICE": 28454.88,
          "MKTCAP": 533435098896,
          "SUPPLY": 18746700,
          "LOW24HOUR": 27720.35,
          "HIGH24HOUR": 28589.41,
          "LASTUPDATE": 1625294758,
          "OPEN24HOUR": 27860.37,
          "CHANGE24HOUR": 594.510000000002,
          "VOLUME24HOUR": 7880.671684789999,
          "VOLUME24HOURTO": 222064788.3954236,
          "CHANGEPCT24HOUR": 2.133891258443452
        }
      }
  },
  "DISPLAY": {
      "BTC": {
        "USD": {
          "PRICE": "$ 33,739.3",
          "MKTCAP": "$ 632.50 B",
          "SUPPLY": "Ƀ 18,746,700.0",
          "LOW24HOUR": "$ 32,763.9",
          "HIGH24HOUR": "$ 33,931.3",
          "LASTUPDATE": "Just now",
          "OPEN24HOUR": "$ 32,954.3",
          "CHANGE24HOUR": "$ 784.99",
          "VOLUME24HOUR": "Ƀ 28,555.3",
          "VOLUME24HOURTO": "$ 953,131,933.7",
          "CHANGEPCT24HOUR": "2.38"
        },
        "EUR": {
          "PRICE": "€ 28,454.9",
          "MKTCAP": "€ 533.44 B",
          "SUPPLY": "Ƀ 18,746,700.0",
          "LOW24HOUR": "€ 27,720.4",
          "HIGH24HOUR": "€ 28,589.4",
          "LASTUPDATE": "Just now",
          "OPEN24HOUR": "€ 27,860.4",
          "CHANGE24HOUR": "€ 594.51",
          "VOLUME24HOUR": "Ƀ 7,880.67",
          "VOLUME24HOURTO": "€ 222,064,788.4",
          "CHANGEPCT24HOUR": "2.13"
        }
      }
    },
    "status_code": 200
 * }
 *
 * @apiError (Error 400) Provided pair is not valid.
 * @apiError (Error 400) Provided pair is not supported.
 * 
 */
cryptoCompare.get('/crypto-compare', async (req, res, next) => {
  try {
    const { fsyms, tsyms, fail } = req.query;
    const pairsInfo = await comparePairs(fsyms, tsyms, fail);
    return res.send(pairsInfo);
  } catch (e) {
    if (e.message) {
      return res.status(400).send({
        message: e.message
      });
    }
    return next(e);
  }
});

export default cryptoCompare;
