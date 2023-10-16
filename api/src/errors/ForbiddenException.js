const ClientException = require("./ClientExceptoin");
const {FORBIDDEN} = require("../constants/errorMessages");

class ForbiddenException extends ClientException {
    constructor(message) {
        super(message || FORBIDDEN);
        this.name = "ForbiddenException";
        this.statusCode = 403;
    }
}

module.exports = ForbiddenException;
