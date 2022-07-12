class ClientException extends Error {
  constructor(message) {
    super(message);
    this.type = 'Client Exception';
  }
}

module.exports = ClientException;
