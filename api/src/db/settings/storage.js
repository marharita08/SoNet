const db = require("../../configs/db");
const {tables, shortColumns} = require("../dbSchema");

module.exports = {
    update: async (id, settings) =>
        db(tables.userSettings)
            .update(settings)
            .where(shortColumns.userSettings.userId, id),
    create: async (settings) => db(tables.userSettings).insert(settings),
};
