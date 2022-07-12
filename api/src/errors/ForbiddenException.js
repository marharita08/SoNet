const ClientException = require('./ClientExceptoin');

class ForbiddenException extends ClientException {
  constructor(message) {
    let msg;
    if (message === undefined) {
      msg = 'Forbidden';
    } else {
      msg = message;
    }
    super(msg);
    this.name = 'ForbiddenException';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenException;
