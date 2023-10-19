const db = require("../configs/db");
const {status, X_FORWARDED_FOR} = require("../constants/logger");

const logger = (logTable) => async (req, res, next) => {
    const {method, originalUrl: url} = req;
    const ip = req.headers[X_FORWARDED_FOR] || req.connection.remoteAddress;
    await db(logTable).insert({
        ip,
        status: status.INFO,
        method,
        url,
    });
    next();
};

module.exports = logger;
