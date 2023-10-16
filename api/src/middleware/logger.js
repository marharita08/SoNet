const db = require("../configs/db");

const logger = (logTable) => async (req, res, next) => {
    const status = "info";
    const {method, originalUrl: url} = req;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    await db(logTable).insert({
        ip,
        status,
        method,
        url,
    });
    next();
};

module.exports = logger;
