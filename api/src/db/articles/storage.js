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

  getFullColumns = () => {
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
  };

  getArticleFullData = () =>
    this.db()
      .select(...this.getFullColumns())
      .from(this.table)
      .join("users", `${this.table}.user_id`, "users.user_id")
      .join("article_visibilities", `${this.table}.visibility_id`, "article_visibilities.visibility_id");

  getWholeArticleById = async (id) =>
    this.getArticleFullData()
      .first()
      .where(`${this.table}.${this.primaryKey}`, id);

  getAllNews = async (page, limit) =>
    this.getArticleFullData()
      .orderBy(`${this.table}.created_at`, "desc")
      .limit(limit)
      .offset(page * limit - limit);

  joinFriends = (th, userId) =>
    th.on(`${this.table}.user_id`, "friends.from_user_id")
      .andOn("friends.to_user_id", userId)
      .orOn("users.user_id", "friends.to_user_id")
      .andOn("friends.from_user_id", userId);

  joinAcceptedStatus = (th) =>
    th.on("status.status_id", "friends.status_id")
      .andOnVal("status.status", "Accepted");

  getByIdAndUserId = async (id, userId) => {
    const classThis = this;
    this.getArticleFullData()
      .first()
      .leftJoin("friends", function () {
        classThis.joinFriends(this, userId);
      })
      .leftJoin("status", function () {
        classThis.joinAcceptedStatus(this);
      })
      .where(`${this.table}.${this.primaryKey}`, id)
      .andWhere(function () {
        this.where("articles.user_id", userId)
          .orWhere("article_visibilities.visibility", articleVisibilities.ALL)
          .orWhere(function () {
            this.where("article_visibilities.visibility", articleVisibilities.FRIENDS)
              .andWhere("status.status_id", "is not", null);
          });
      });
  };

  getNewsByUserId = async (userId, page, limit) => {
    const classThis = this;
    return this.db
      .select()
      .from({
        main: this.getArticleFullData()
          .join("friends", function () {
            classThis.joinFriends(this, userId);
          })
          .join("status", function () {
            classThis.joinAcceptedStatus(this);
          })
          .where("article_visibilities.visibility", "in", [articleVisibilities.ALL, articleVisibilities.FRIENDS])
          .unionAll(function () {
            this.select(...classThis.getFullColumns())
              .from(classThis.table)
              .join("users", function () {
                this.on("users.user_id", `${classThis.table}.user_id`)
                  .andOnVal("users.user_id", userId);
              })
              .join("article_visibilities", `${classThis.table}.visibility_id`, "article_visibilities.visibility_id");
          })
      })
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset(page * limit - limit);
  };

  getImageByArticleId = async (id) => super.getFieldById(id, "image")

  getCountOfAllNews = async () =>
    this.db(this.table)
      .count(this.primaryKey)
      .first();

  getCountOfNewsByUserId = async (userId) => {
    const classThis = this;
    this.db
      .count(this.primaryKey)
      .first()
      .from({
        main: db
          .select(`${this.table}.${this.primaryKey}`)
          .from(this.table)
          .join("friends", function () {
            classThis.joinFriends(this, userId);
          })
          .join("status", function () {
            classThis.joinAcceptedStatus(this);
          })
          .join("article_visibilities", function () {
            this.on("article_visibilities.visibility_id", `${classThis.table}.visibility_id`)
              .andOnIn(
                "article_visibilities.visibility",
                [articleVisibilities.ALL, articleVisibilities.friends]
              );
          })
          .unionAll(function () {
            this.select(`${classThis.table}.${classThis.primaryKey}`)
              .from(classThis.table)
              .where(`${classThis.table}.user_id`, userId);
          }),
      });
  };

  getRandomArticleId = async () => super.getRandomId();
}

module.exports = new ArticleStorage();
