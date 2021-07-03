const { cryptoCompare } = require('../config');
const axios = require('axios');

const { baseURL } = cryptoCompare;
const { compare } = cryptoCompare;

const getPairInfo = async function(fsyms, tsyms) {
  const url = `${baseURL}${compare}?fsyms=${fsyms}&tsyms=${tsyms}`;
  const response = await axios.get(url);
  return response.data;
};

export { getPairInfo };
