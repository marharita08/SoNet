const ClientException = require('./ClientExceptoin');

class UnauthorizedException extends ClientException {
  constructor(message) {
    let msg;
    if (message === undefined) {
      msg = 'Unauthorized';
    } else {
      msg = message;
    }
    super(msg);
    this.name = 'UnauthorizedException';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedException;
