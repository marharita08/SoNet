const db = require("../../configs/db");
const {tables, fullColumns, shortColumns, status, articleVisibilities} = require("../dbSchema");

const createdAt = `to_char(${fullColumns.articles.createdAt} AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Kiev', 'DD.MM.YYYY HH24:MI:SS') as ${shortColumns.articles.createdAt}`;
const createdAtTimestamp = `${fullColumns.articles.createdAt} as created_at_timestamp`;

const fullDataColumns = [
    fullColumns.articles.articleId,
    fullColumns.articles.text,
    fullColumns.articles.image,
    db.raw(createdAt),
    db.raw(createdAtTimestamp),
    fullColumns.articles.visibilityId,
    fullColumns.users.userId,
    fullColumns.users.name,
    fullColumns.users.avatar,
    fullColumns.articleVisibilities.visibility
];

function articleFullData() {
    return db
        .select(...fullDataColumns)
        .from(tables.articles)
        .join(tables.users, fullColumns.articles.userId, fullColumns.users.userId)
        .join(tables.articleVisibilities, fullColumns.articleVisibilities.visibilityId, fullColumns.articles.visibilityId);
}

module.exports = {
    getAll: async () => db(tables.articles).select().orderBy(shortColumns.articles.articleId, "desc"),
    getById: async (id) => db(tables.articles).select().first().where(shortColumns.articles.articleId, id),
    create: async (article) => db(tables.articles).returning(shortColumns.articles.articleId).insert(article),
    update: async (id, article) => db(tables.articles).update(article).where(shortColumns.articles.articleId, id),
    delete: async (id) => db(tables.articles).delete().where(shortColumns.articles.articleId, id),
    getWholeArticleById: async (id) =>
        articleFullData()
            .first()
            .where(fullColumns.articles.articleId, id),
    getAllNews: async (page, limit) =>
        articleFullData()
            .orderBy(fullColumns.articles.createdAt, "desc")
            .limit(limit)
            .offset(page * limit - limit),
    getByIdAndUserId: async (id, userId) =>
        articleFullData()
            .first()
            .leftJoin(tables.friends, function () {
                this.on(fullColumns.users.userId, fullColumns.friends.fromUserId)
                    .andOn(fullColumns.friends.toUserId, userId)
                    .orOn(fullColumns.users.userId, fullColumns.friends.toUserId)
                    .andOn(fullColumns.friends.fromUserId, userId);
            })
            .leftJoin(tables.status, function () {
                this.on(fullColumns.status.statusId, fullColumns.friends.statusId).andOnVal(fullColumns.status.status, status.accepted);
            })
            .where(fullColumns.articles.articleId, id)
            .andWhere(function () {
                this.where(fullColumns.articles.userId, userId)
                    .orWhere(fullColumns.articleVisibilities.visibility, articleVisibilities.all)
                    .orWhere(function () {
                        this.where(fullColumns.articleVisibilities.visibility, articleVisibilities.friends)
                            .andWhere(fullColumns.status.statusId, "is not", null);
                    });
            }),
    getNewsByUserId: async (userId, page, limit) =>
        db
            .select()
            .from({
                main: articleFullData()
                    .join(tables.friends, function () {
                        this.on(fullColumns.users.userId, fullColumns.friends.fromUserId)
                            .andOn(fullColumns.friends.toUserId, userId)
                            .orOn(fullColumns.users.userId, fullColumns.friends.toUserId)
                            .andOn(fullColumns.friends.fromUserId, userId);
                    })
                    .join(tables.status, function () {
                        this.on(fullColumns.status.statusId, fullColumns.friends.statusId).andOnVal(fullColumns.status.status, status.accepted);
                    })
                    .where(fullColumns.articleVisibilities.visibility, "in", [articleVisibilities.all, articleVisibilities.friends])
                    .unionAll(function () {
                        this.select(...fullDataColumns)
                            .from(tables.articles)
                            .join(tables.users, function () {
                                this.on(fullColumns.users.userId, fullColumns.articles.userId).andOnVal(fullColumns.users.userId, userId);
                            })
                            .join(
                                tables.articleVisibilities,
                                fullColumns.articles.visibilityId,
                                fullColumns.articleVisibilities.visibilityId
                            );
                    })
            })
            .orderBy(shortColumns.articles.createdAt, "desc")
            .limit(limit)
            .offset(page * limit - limit),
    getImageByArticleId: async (id) =>
        db(tables.articles).select(fullColumns.articles.image).first().where(fullColumns.articles.articleId, id),
    getCountOfAllNews: async () => db(tables.articles).count(fullColumns.articles.articleId).first(),
    getCountOfNewsByUserId: async (userId) =>
        db
            .count(shortColumns.articles.articleId)
            .first()
            .from({
                main: db
                    .select(fullColumns.articles.articleId)
                    .from(tables.articles)
                    .join(tables.friends, function () {
                        this.on(fullColumns.articles.userId, fullColumns.friends.fromUserId)
                            .andOn(fullColumns.friends.toUserId, userId)
                            .orOn(fullColumns.articles.userId, fullColumns.friends.toUserId)
                            .andOn(fullColumns.friends.fromUserId, userId);
                    })
                    .join(tables.status, function () {
                        this.on(fullColumns.status.statusId, fullColumns.friends.statusId).andOnVal(fullColumns.status.status, status.accepted);
                    })
                    .join(tables.articleVisibilities, function () {
                        this.on(fullColumns.articleVisibilities.visibilityId, fullColumns.articles.visibilityId).andOnIn(
                            fullColumns.articleVisibilities.visibility,
                            [articleVisibilities.all, articleVisibilities.friends]
                        );
                    })
                    .unionAll(function () {
                        this.select(fullColumns.articles.articleId).from(tables.articles).where(fullColumns.articles.userId, userId);
                    }),
            }),
    getRandomArticleId: async () =>
        db(tables.articles).select(shortColumns.articles.articleId).first().orderByRaw("random()").limit(1)
};
