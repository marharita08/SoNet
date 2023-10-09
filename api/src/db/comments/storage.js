const db = require("../../configs/db");
const {tables, shortColumns} = require("../dbSchema");
const {users, comments} = shortColumns;

function commentFullData() {
    return db
        .select(
            `ch.${comments.commentId}`,
            `ch.${comments.articleId}`,
            `ch.${comments.userId}`,
            `ch.${comments.text}`,
            `ch.${comments.parentId}`,
            `ch.${comments.path}`,
            `ch.${comments.level}`,
            db.raw(
                `ch.${comments.commentedAt} as ${comments.commentedAt}`
            ),
            `chu.${users.name}`,
            `chu.${users.avatar}`,
            `pu.${users.name} as to`,
            `p.${users.userId} as p_user_id`,
            `p.${comments.text} as parent_text`
        )
        .from({ch: tables.comments})
        .leftOuterJoin({p: tables.comments}, `p.${comments.commentId}`, `ch.${comments.parentId}`)
        .leftOuterJoin({pu: tables.users}, `pu.${users.userId}`, `p.${users.userId}`)
        .join({chu: tables.users}, `chu.${users.userId}`, `ch.${users.userId}`)
}

module.exports = {
    getAll: async () => db.select().from(tables.comments).orderBy(comments.commentId),
    getById: async (id) => db.select().first().from(tables.comments).where(comments.commentId, id),
    create: async (comment) => db(tables.comments).returning(comments.commentId).insert(comment),
    update: async (id, comment) => db(tables.comments).update(comment).where(comments.commentId, id),
    delete: async (id) => db(tables.comments).delete().where(comments.commentId, id),
    getFullDataById: async (id) =>
        commentFullData()
            .first()
            .where(`ch.${comments.commentId}`, id),
    getFullDataByArticleId: async (id) =>
        commentFullData()
            .where(`ch.${shortColumns.articles.articleId}`, id)
            .orderBy(`ch.${comments.path}`),
    getAmountByArticleId: async (id) =>
        db(tables.comments).countDistinct(comments.commentId).first().where(shortColumns.articles.articleId, id),
};
