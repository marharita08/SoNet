const db = require('../services/db');

const errorHandler = (logTable) => async (err, req, res, next) => {
  const status = 'error';
  const { method, originalUrl: url } = req;
  const { message, stack } = err;
  const date = new Date().toLocaleString('ua', {
    timeZone: 'Europe/Kiev',
  });
  await db(logTable).insert({
    date,
    status,
    method,
    url,
    message,
    stack,
  });
  res.status(500).send("Something's going wrong!");
  next();
};

module.exports = errorHandler;
