const crypto = require('crypto');

module.exports = (password, salt) => {
  const sha256 = crypto.createHash('sha256');
  return sha256.update(`${password}_${salt}`).digest('base64');
};
