const ClientException = require("../errors/ClientExceptoin");
const Messages = require("../constants/messages");
const {status, X_FORWARDED_FOR} = require("../constants/logger");
const {Type, Code} = require("../constants/exceptions");
const storage = require("../db/logger/storage");

const errorHandler = async (err, req, res, next) => {
  const {method, originalUrl: url} = req;
  const {message, stack} = err;
  const type = err.type || Type.SERVER;
  const statusCode = err.statusCode || Code.INTERNAL_SERVER_ERROR;
  const ip = req.headers[X_FORWARDED_FOR] || req.connection.remoteAddress;
  await storage.create({
    ip,
    status: status.ERROR,
    status_code: statusCode,
    type,
    method,
    url,
    message,
    stack,
  });
  if (err instanceof ClientException) {
    return res.status(statusCode).send({message});
  }
  res.status(statusCode).send({message: Messages.INTERNAL_SERVER_ERROR});
  return next();
};

module.exports = errorHandler;
