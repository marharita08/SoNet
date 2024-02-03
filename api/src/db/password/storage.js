const db = require('../../configs/db');
const BaseStorage = require("../base/storage");

class PasswordTokenStorage extends BaseStorage {
    constructor() {
        super("reset_password_token", "token", db);
    }
}

module.exports = new PasswordTokenStorage();
