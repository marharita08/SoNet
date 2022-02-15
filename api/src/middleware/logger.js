const db = require('../services/db');

const logger = (logTable) => async (req, res, next) => {
  const status = 'info';
  const { method, originalUrl: url } = req;
  const date = new Date().toLocaleString('ua', {
    timeZone: 'Europe/Kiev',
  });
  await db(logTable).insert({
    date,
    status,
    method,
    url,
  });
  next();
};

module.exports = logger;
