const db = require("../../services/db");
const {tables, columns, status, articleVisibilities} = require("../dbSchema");

const createdAt = `to_char(${columns.articles.createdAt}, 'DD.MM.YYYY HH24:MI:SS') as ${columns.createdAt}`;

module.exports = {
    getAll: async () => db(tables.articles).select().orderBy(columns.articles.articleId, "desc"),
    getById: async (id) => db(tables.articles).select().first().where(columns.articles.articleId, id),
    create: async (article) => db(tables.articles).returning(columns.articles.articleId).insert(article),
    update: async (id, article) => db(tables.articles).update(article).where(columns.articles.articleId, id),
    delete: async (id) => db(tables.articles).delete().where(columns.articles.articleId, id),
    getWholeArticleById: async (id) =>
        db
            .select(
                columns.articles.articleId,
                columns.articles.text,
                columns.articles.image,
                db.raw(createdAt),
                columns.users.userId,
                columns.users.name,
                columns.users.avatar,
                columns.articleVisibilities.visibility
            )
            .first()
            .from(tables.articles)
            .join(tables.users, columns.articles.userId, columns.users.userId)
            .join(tables.articleVisibilities, columns.articleVisibilities.visibilityId, columns.articles.visibilityId)
            .where(columns.articles.articleId, id),
    getAllNews: async (page, limit) =>
        db
            .select(
                columns.articles.articleId,
                columns.articles.text,
                columns.articles.image,
                db.raw(createdAt),
                columns.users.userId,
                columns.users.name,
                columns.users.avatar,
                columns.articleVisibilities.visibility
            )
            .from(tables.articles)
            .join(tables.users, columns.articles.userId, columns.users.userId)
            .join(tables.articleVisibilities, columns.articleVisibilities.visibilityId, columns.articles.visibilityId)
            .orderBy(columns.articles.articleId, "desc")
            .limit(limit)
            .offset(page * limit - limit),
    getByIdAndUserId: async (id, userId) =>
        db
            .select(
                `${tables.articles}.*`,
                db.raw(createdAt),
                columns.users.name,
                columns.users.avatar,
                columns.articleVisibilities.visibility
            )
            .from(tables.articles)
            .first()
            .join(tables.users, columns.articles.userId, columns.users.userId)
            .join(tables.articleVisibilities, columns.articleVisibilities.visibilityId, columns.articles.visibilityId)
            .leftJoin(tables.friends, function () {
                this.on(columns.users.userId, columns.friends.fromUserId)
                    .andOn(columns.friends.toUserId, userId)
                    .orOn(columns.users.userId, columns.friends.toUserId)
                    .andOn(columns.friends.fromUserId, userId);
            })
            .leftJoin(tables.status, function () {
                this.on(columns.status.statusId, columns.friends.statusId).andOnVal(columns.status.status, status.accepted);
            })
            .where(columns.articles.articleId, id)
            .andWhere(function () {
                this.where(columns.articles.userId, userId)
                    .orWhere(columns.articleVisibilities.visibility, articleVisibilities.all)
                    .orWhere(function () {
                        this.where(columns.articleVisibilities.visibility, articleVisibilities.friends)
                            .andWhere(columns.status.statusId, "is not", null);
                    });
            }),
    getNewsByUserId: async (userId, page, limit) =>
        db
            .select(
                columns.articles.articleId,
                columns.articles.text,
                columns.articles.image,
                db.raw(createdAt),
                columns.users.userId,
                columns.users.name,
                columns.users.avatar,
                columns.articleVisibilities.visibility
            )
            .from(tables.articles)
            .join(tables.users, columns.articles.userId, columns.users.userId)
            .join(tables.friends, function () {
                this.on(columns.users.userId, columns.friends.fromUserId)
                    .andOn(columns.friends.toUserId, userId)
                    .orOn(columns.users.userId, columns.friends.toUserId)
                    .andOn(columns.friends.fromUserId, userId);
            })
            .join(tables.status, function () {
                this.on(columns.status.statusId, columns.friends.statusId).andOnVal(columns.status.status, status.accepted);
            })
            .join(tables.articleVisibilities, function () {
                this.on(columns.articleVisibilities.visibilityId, columns.articles.visibilityId).andOnIn(
                    columns.articleVisibilities.visibility,
                    [articleVisibilities.all, articleVisibilities.friends]
                );
            })
            .unionAll(function () {
                this.select(
                    columns.articles.articleId,
                    columns.articles.text,
                    columns.articles.image,
                    db.raw(createdAt),
                    columns.users.userId,
                    columns.users.name,
                    columns.users.avatar,
                    columns.articleVisibilities.visibility
                )
                    .from(tables.articles)
                    .join(tables.users, function () {
                        this.on(columns.users.userId, columns.articles.userId).andOnVal(columns.users.userId, userId);
                    })
                    .join(
                        tables.articleVisibilities,
                        columns.articles.visibilityId,
                        columns.articleVisibilities.visibilityId
                    );
            })
            .orderBy(columns.articleId, "desc")
            .limit(limit)
            .offset(page * limit - limit),
    getImageByArticleId: async (id) =>
        db(tables.articles).select(columns.articles.image).first().where(columns.articles.articleId, id),
    getCountOfAllNews: async () => db(tables.articles).count(columns.articles.articleId).first(),
    getCountOfNewsByUserId: async (userId) =>
        db
            .select(columns.articles.articleId)
            .from(tables.articles)
            .join(tables.friends, function () {
                this.on(columns.users.userId, columns.friends.fromUserId)
                    .andOn(columns.friends.toUserId, userId)
                    .orOn(columns.users.userId, columns.friends.toUserId)
                    .andOn(columns.friends.fromUserId, userId);
            })
            .join(tables.status, function () {
                this.on(columns.status.statusId, columns.friends.statusId).andOnVal(columns.status.status, status.accepted);
            })
            .join(tables.articleVisibilities, function () {
                this.on(columns.articleVisibilities.visibilityId, columns.articles.visibilityId).andOnIn(
                    columns.articleVisibilities.visibility,
                    [articleVisibilities.all, articleVisibilities.friends]
                );
            })
            .unionAll(function () {
                this.select(columns.articles.articleId).from(tables.articles).where(columns.articles.userId, userId);
            }).count(columns.articleId).first(),
};
