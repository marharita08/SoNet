const ClientException = require("./ClientExceptoin");
const Messages = require("../constants/messages");
const {Name, Code} = require("../constants/exceptions");

class UnauthorizedException extends ClientException {
  constructor(message) {
    super(message || Messages.UNAUTHORIZED);
    this.name = Name.UNAUTHORIZED;
    this.statusCode = Code.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedException;
