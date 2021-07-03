import { logger } from '../app/app.logger';
import { comparePairs } from '../v1/crypto-compare/crypto-compare.service';

const init = async function(io) {
  io.on('connection', socket => {
    socket.on('price', async data => {
      const { fsyms, tsyms } = data;
      try {
        const response = await comparePairs(fsyms, tsyms);
        socket.emit('price-data', response);
      } catch (err) {
        logger.error(err);
      }
    });
  });
};

export { init };
