const ClientException = require("./ClientExceptoin");
const {UNAUTHORIZED} = require("../constants/errorMessages");

class UnauthorizedException extends ClientException {
    constructor(message) {
        super(message || UNAUTHORIZED);
        this.name = "UnauthorizedException";
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedException;
