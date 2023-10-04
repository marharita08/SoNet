const ClientException = require("./ClientExceptoin");

class UnprocessableEntityException extends ClientException {
    constructor(message) {
        super(message);
        this.name = "UnprocessableEntityException";
        this.statusCode = 422;
    }
}

module.exports = UnprocessableEntityException;
