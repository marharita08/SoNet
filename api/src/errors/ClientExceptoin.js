const {Type} = require("../constants/exceptions");
class ClientException extends Error {
    constructor(message) {
        super(message);
        this.type = Type.CLIENT;
    }
}

module.exports = ClientException;
