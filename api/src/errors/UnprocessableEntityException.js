const ClientException = require("./ClientExceptoin");
const {Name, Code} = require("../constants/exceptions");

class UnprocessableEntityException extends ClientException {
  constructor(message) {
    super(message);
    this.name = Name.UNPROCESSABLE_ENTITY;
    this.statusCode = Code.UNPROCESSABLE_ENTITY;
  }
}

module.exports = UnprocessableEntityException;
