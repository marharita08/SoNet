const db = require('../../configs/db');
const {tables, shortColumns} = require("../dbSchema");

module.exports = {
    create: async (reset_password_token) => db(tables.resetPasswordTokens).insert(reset_password_token),
    getByToken: async (token) =>
        db(tables.resetPasswordTokens)
            .select()
            .where(shortColumns.resetPasswordTokens.token, token)
            .first(),
    delete: async (token) =>
        db(tables.resetPasswordTokens)
            .delete()
            .where(shortColumns.resetPasswordTokens.token, token)
}
