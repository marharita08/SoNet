const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

const articleVisibilities = {
  ALL: "All",
  FRIENDS: "Friends",
  ONLY_ME: "Only Me"
};

class ArticleStorage extends BaseStorage {
  constructor() {
    super("articles", "article_id", db);
  }

  getFullColumns() {
    return [
      `${this.table}.${this.primaryKey}`,
      `${this.table}.text`,
      `${this.table}.image`,
      this.db.raw(
        `to_char(${this.table}.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Kiev', 'DD.MM.YYYY HH24:MI:SS') as created_at`
      ),
      this.db.raw(`${this.table}.created_at as created_at_timestamp`),
      `${this.table}.visibility_id`,
      "users.user_id",
      "users.name",
      "users.avatar",
      "article_visibilities.visibility"
    ];
  }

  getArticleFullData() {
    return this.db()
      .select(...this.getFullColumns())
      .from(this.table)
      .join("users", `${this.table}.user_id`, "users.user_id")
      .join("article_visibilities", `${this.table}.visibility_id`, "article_visibilities.visibility_id");
  }

  async getWholeArticleById(id) {
    return this.getArticleFullData()
      .first()
      .where(`${this.table}.${this.primaryKey}`, id);
  }

  async getAllNews(page, limit) {
    return this.getArticleFullData()
      .orderBy(`${this.table}.created_at`, "desc")
      .limit(limit)
      .offset(page * limit - limit);
  }

  getJoinFriendsFn(userId) {
    return (qb) => {
      qb.on(`${this.table}.user_id`, "friends.from_user_id")
        .andOn("friends.to_user_id", userId)
        .orOn("users.user_id", "friends.to_user_id")
        .andOn("friends.from_user_id", userId);
    }
  }

  joinAcceptedStatus(qb) {
    qb.on("status.status_id", "friends.status_id")
      .andOnVal("status.status", "Accepted");
  }

  async getByIdAndUserId(id, userId) {
    return this.getArticleFullData()
      .first()
      .leftJoin("friends", this.getJoinFriendsFn(userId))
      .leftJoin("status", this.joinAcceptedStatus)
      .where(`${this.table}.${this.primaryKey}`, id)
      .andWhere((qb) => {
        qb.where("articles.user_id", userId)
          .orWhere("article_visibilities.visibility", articleVisibilities.ALL)
          .orWhere((qb) => {
            qb.where("article_visibilities.visibility", articleVisibilities.FRIENDS)
              .andWhere("status.status_id", "is not", null);
          });
      });
  }

  async getNewsByUserId(userId, page, limit) {
    return this.db
      .select()
      .from({
        main: this.getArticleFullData()
          .join("friends", this.getJoinFriendsFn(userId))
          .join("status", this.joinAcceptedStatus)
          .where("article_visibilities.visibility", "in", [articleVisibilities.ALL, articleVisibilities.FRIENDS])
          .unionAll((qb) => {
            qb.select(...this.getFullColumns())
              .from(this.table)
              .join("users", (qb) => {
                qb.on("users.user_id", `${this.table}.user_id`)
                  .andOnVal("users.user_id", userId);
              })
              .join("article_visibilities", `${this.table}.visibility_id`, "article_visibilities.visibility_id");
          })
      })
      .orderBy("created_at_timestamp", "desc")
      .limit(limit)
      .offset(page * limit - limit);
  }

  async getImageByArticleId(id) {
    return await super.getFieldById(id, "image");
  }

  async getCountOfAllNews() {
    return this.db(this.table)
      .count(this.primaryKey)
      .first();
  }

  async getCountOfNewsByUserId(userId) {
    return this.db
      .count(this.primaryKey)
      .first()
      .from({
        main: db
          .select(`${this.table}.${this.primaryKey}`)
          .from(this.table)
          .join("users", `${this.table}.user_id`, "users.user_id")
          .join("friends", this.getJoinFriendsFn(userId))
          .join("status", this.joinAcceptedStatus)
          .join("article_visibilities",  (qb) => {
            qb.on("article_visibilities.visibility_id", `${this.table}.visibility_id`)
              .andOnIn(
                "article_visibilities.visibility",
                [articleVisibilities.ALL, articleVisibilities.friends]
              );
          })
          .unionAll((qb) => {
            qb.select(`${this.table}.${this.primaryKey}`)
              .from(this.table)
              .where(`${this.table}.user_id`, userId);
          }),
      });
  }

  async getRandomArticleId() {
    return await super.getRandomId();
  }
}

module.exports = new ArticleStorage();
