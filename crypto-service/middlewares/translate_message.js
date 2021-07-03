export default function(app) {
  app.use((req, res, next) => {
    const { send } = res;
    res.send = function(data) {
      if (data && typeof data === 'object') {
        if (data.message) {
          data.message = res.translate(data.message);
        }
        data.status_code = res.statusCode;
      }
      send.apply(res, arguments);
    };
    next();
  });
}
