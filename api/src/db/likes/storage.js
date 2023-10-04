const db = require("../../configs/db");
const {tables, shortColumns, fullColumns} = require("../dbSchema");

module.exports = {
    getAll: async () => db.select().from(tables.articleLikes).orderBy(shortColumns.articleLikes.articleId),
    create: async (like) => db(tables.articleLikes).insert(like),
    delete: async (articleID, userID) =>
        db(tables.articleLikes)
            .delete()
            .where(shortColumns.articleLikes.articleId, articleID)
            .andWhere(shortColumns.articleLikes.userId, userID),
    getByArticleId: async (id) =>
        db(tables.articleLikes)
            .select(fullColumns.users.userId, fullColumns.users.avatar)
            .join(tables.users, fullColumns.users.userId, fullColumns.articleLikes.userId)
            .where(shortColumns.articleLikes.articleId, id),
    getByArticleIdAndUserId: async (articleId, userId) =>
        db(tables.articleLikes)
            .select()
            .first()
            .where(shortColumns.articleLikes.articleId, articleId)
            .andWhere(shortColumns.articleLikes.userId, userId),
    getAmountByArticleId: async (id) =>
        db(tables.articleLikes)
            .countDistinct(shortColumns.articleLikes.userId)
            .first()
            .where(shortColumns.articleLikes.articleId, id),
};
