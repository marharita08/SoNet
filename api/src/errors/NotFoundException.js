const ClientException = require("./ClientExceptoin");

class NotFoundException extends ClientException {
    constructor(message) {
        super(message || "Not found");
        this.name = "NotFoundException";
        this.statusCode = 404;
    }
}

module.exports = NotFoundException;
