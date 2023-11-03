const db = require("../../configs/db");
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
    getByName: (name) =>
        db.select().from(tables.universities).where(shortColumns.universities.name, name),
    create: (university) => db(tables.universities).insert(university).returning(shortColumns.universities.universityId),
    getRandomUniversityId: () =>
        db(tables.universities)
            .select(shortColumns.universities.universityId).first()
            .orderByRaw("random()")
            .limit(1)
};
