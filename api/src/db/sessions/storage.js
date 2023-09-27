const db = require('../../services/db');
const {tables, shortColumns} = require("../dbSchema");
const {session} = shortColumns;

module.exports = {
  create: (session) => db(tables.session).insert(session),
  getByToken: (token) => db(tables.session).select().first().where(session.token, token),
  deleteByToken: (token) => db(tables.session).where(session.token, token).delete(),
};
