const ClientException = require("./ClientExceptoin");
const {NOT_FOUND} = require("../constants/errorMessages");

class NotFoundException extends ClientException {
    constructor(message) {
        super(message || NOT_FOUND);
        this.name = "NotFoundException";
        this.statusCode = 404;
    }
}

module.exports = NotFoundException;
