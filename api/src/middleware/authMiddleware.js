const jwt = require("jsonwebtoken");

const {appKey} = require("../configs/config");
const UnauthorizedException = require("../errors/UnauthorizedException");

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        let decoded;
        try {
            decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, appKey, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            });
        } catch (e) {
            // do nothing
        }
        if (decoded) {
            req.auth = decoded;
            return next();
        }
    }
    return next(new UnauthorizedException());
};
