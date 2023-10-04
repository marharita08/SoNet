const likesStorage = require("../db/likes/storage");

const getAll = async () => {
    return await likesStorage.getAll();
}

const isLiked = async (articleId, userId) => {
    return !!await likesStorage.getByArticleIdAndUserId(articleId, userId);
}

const add = async (articleId, userId) => {
    await likesStorage.create({
        article_id: articleId,
        user_id: userId,
    });
}

const _delete = async (articleId, userId) => {
    await likesStorage.delete(articleId, userId);
}

const getByArticleId = async (articleId) => {
    return await likesStorage.getByArticleId(articleId);
}

const getAmountByArticleId = async (articleId) => {
    return await likesStorage.getAmountByArticleId(articleId);
}

module.exports = {
    getAll,
    isLiked,
    add,
    delete: _delete,
    getByArticleId,
    getAmountByArticleId
}
