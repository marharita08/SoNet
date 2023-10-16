const ClientException = require("./ClientExceptoin");

class ForbiddenException extends ClientException {
    constructor(message) {
        super(message || "Forbidden");
        this.name = "ForbiddenException";
        this.statusCode = 403;
    }
}

module.exports = ForbiddenException;
