const VisibilitiesStorage = require("../db/visibilities/storage");

const getFieldVisibilities = async () => {
    return await VisibilitiesStorage.getForFiled();
}

const getArticleVisibilities = async () => {
    return await VisibilitiesStorage.getForArticle();
}

module.exports = {
    getArticleVisibilities,
    getFieldVisibilities
}
