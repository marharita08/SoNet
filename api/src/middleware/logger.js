const db = require("../configs/db");

const logger = (logTable) => async (req, res, next) => {
    const status = "info";
    const {method, originalUrl: url} = req;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const date = new Date().toLocaleString("ua", {
        timeZone: "Europe/Kiev",
    });
    await db(logTable).insert({
        ip,
        date,
        status,
        method,
        url,
    });
    next();
};

module.exports = logger;
