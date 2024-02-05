const jwt = require("jsonwebtoken");
const {appKey} = require("../configs/config");

module.exports = createAccessToken = (user) =>
  jwt.sign({user_id: user.user_id, name: user.name}, appKey, {
    expiresIn: "30m",
  });
