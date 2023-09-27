const ClientException = require("./ClientExceptoin");

class NotFoundException extends ClientException {
    constructor(message) {
        let msg;
        if (message === undefined) {
            msg = "Not found";
        } else {
            msg = message;
        }
        super(msg);
        this.name = "NotFoundException";
        this.statusCode = 404;
    }
}

module.exports = NotFoundException;
