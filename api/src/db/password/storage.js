const db = require('../../services/db');

const table = 'reset_password_tokens';

module.exports = {
    create: async (reset_password_token) => db(table).insert(reset_password_token),
    getByToken: async (token) =>
        db(table).select().where('token', token).first(),
    delete: async (token) => db(table).delete().where('token', token)
}
