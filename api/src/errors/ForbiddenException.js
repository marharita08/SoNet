const ClientException = require("./ClientExceptoin");
const Messages = require("../constants/messages");
const {Name, Code} = require("../constants/exceptions");

class ForbiddenException extends ClientException {
  constructor(message) {
    super(message || Messages.FORBIDDEN);
    this.name = Name.FORBIDDEN;
    this.statusCode = Code.FORBIDDEN;
  }
}

module.exports = ForbiddenException;
