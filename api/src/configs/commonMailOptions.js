const config = require("../configs/config");

module.exports = {
  from: config.mailFrom,
  attachments: [{
    filename: "logo.png",
    path: "public/images/logo.png",
    cid: "logo"
  }]
};
