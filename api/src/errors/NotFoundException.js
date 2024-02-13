const ClientException = require("./ClientExceptoin");
const Messages = require("../constants/messages");
const {Name, Code} = require("../constants/exceptions");

class NotFoundException extends ClientException {
  constructor(message) {
    super(message || Messages.NOT_FOUND);
    this.name = Name.NOT_FOUND;
    this.statusCode = Code.NOT_FOUND;
  }
}

module.exports = NotFoundException;
