const db = require("../services/db");
const ClientException = require("../errors/ClientExceptoin");

const errorHandler = (logTable) => async (err, req, res, next) => {
    const status = "error";
    const {method, originalUrl: url} = req;
    const {message, stack} = err;
    const type = err.type || "Server Exception";
    const statusCode = err.statusCode || 500;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const date = new Date().toLocaleString("ua", {
        timeZone: "Europe/Kiev",
    });
    await db(logTable).insert({
        ip,
        date,
        status,
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
    res.status(statusCode).send({message: "Something went wrong!"});
    return next();
};

module.exports = errorHandler;
