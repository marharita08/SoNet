const {status, X_FORWARDED_FOR} = require("../constants/logger");
const storage = require("../db/logger/storage");

const logger = async (req, res, next) => {
  const {method, originalUrl: url} = req;
  const ip = req.headers[X_FORWARDED_FOR] || req.connection.remoteAddress;
  await storage.create({
    ip,
    status: status.INFO,
    method,
    url,
  });
  next();
};

module.exports = logger;
