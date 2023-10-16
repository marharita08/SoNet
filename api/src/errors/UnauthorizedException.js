const ClientException = require("./ClientExceptoin");

class UnauthorizedException extends ClientException {
    constructor(message) {
        super(message || "Unauthorized");
        this.name = "UnauthorizedException";
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedException;
