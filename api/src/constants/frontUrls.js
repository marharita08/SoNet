const config = require("../configs/config");
const {frontUrl} = config;

module.exports = {
  HOME: frontUrl,
  RESET_PASSWORD: frontUrl + "/new-password/"
};
