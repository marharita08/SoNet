const db = require("../../configs/db");

const getVisibilities = (table) =>
  db
    .select(
      "visibility_id as value",
      "visibility as label"
    )
    .from(table)
    .orderBy("visibility_id");

const getForFiled = async () => getVisibilities("field_visibilities");

const getForArticle = async () => getVisibilities("article_visibilities");

module.exports = {getForFiled, getForArticle};
