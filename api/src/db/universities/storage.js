const db = require("../../services/db");
const {tables, shortColumns} = require("../dbSchema");

module.exports = {
    getAll: () =>
        db
            .select(
                `${shortColumns.universities.universityId} as value`,
                `${shortColumns.universities.name} as label`
            )
            .from(tables.universities)
            .orderBy(shortColumns.universities.name),
};
