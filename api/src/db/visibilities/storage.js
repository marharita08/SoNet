const db = require("../../configs/db");
const {tables, shortColumns} = require("../dbSchema");

module.exports = {
    getForFiled: () =>
        db
            .select(
                `${shortColumns.fieldVisibilities.visibilityId} as value`,
                `${shortColumns.fieldVisibilities.visibility} as label`
            )
            .from(tables.fieldVisibilities)
            .orderBy(shortColumns.fieldVisibilities.visibilityId),
    getForArticle: () =>
        db
            .select(
                `${shortColumns.articleVisibilities.visibilityId} as value`,
                `${shortColumns.articleVisibilities.visibility} as label`)
            .from(tables.articleVisibilities)
            .orderBy(shortColumns.articleVisibilities.visibilityId),
};
