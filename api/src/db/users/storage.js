const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

const status = {
  ACCEPTED: "Accepted",
  UNDER_CONSIDERATION: "Under consideration"
};

const friendsAndRequestsColumns = [
  "request_id",
  "user_id",
  "name",
  "avatar",
  "city_name"
];

class UsersStorage extends BaseStorage {
  constructor() {
    super("users", "user_id", db);
  }

  async getProfileById(id) {
    return this.db
      .select(
        `${this.table}.*`,
        "user_settings.*",
        this.db.raw(
          `to_char(${this.table}.birthday, 'DD.MM.YYYY') as birthday`
        ),
        "universities.name as university_label",
        "ev.visibility as ev_label",
        "pv.visibility as pv_label",
        "uv.visibility as uv_label",
        "cv.visibility as cv_label",
        "sv.visibility as sv_label",
        "civ.visibility as civ_label",
        "bv.visibility as bv_label"
      )
      .from(this.table)
      .join("user_settings", `${this.table}.${this.primaryKey}`, "user_settings.user_id")
      .join({ev: "field_visibilities"}, "email_visibility_id", "ev.visibility_id")
      .join({pv: "field_visibilities"}, "phone_visibility_id", "pv.visibility_id")
      .join({uv: "field_visibilities"}, "university_visibility_id", "uv.visibility_id")
      .join({cv: "field_visibilities"}, "country_visibility_id", "cv.visibility_id")
      .join({sv: "field_visibilities"}, "state_visibility_id", "sv.visibility_id")
      .join({civ: "field_visibilities"}, "city_visibility_id", "civ.visibility_id")
      .join({bv: "field_visibilities"}, "birthday_visibility_id", "bv.visibility_id")
      .leftOuterJoin("universities", "users.university_id", "universities.university_id")
      .where(`${this.table}.${this.primaryKey}`, id);
  }

  async getAvatarPath(id) {
    return await super.getFieldById(id, "avatar_path");
  }

  getJoinFriendsFn(id) {
    return (qb) => {
      qb.on("user_id", "from_user_id").andOn("to_user_id", db.raw("?", [id]))
        .orOn("user_id", "to_user_id").andOn("from_user_id", db.raw("?", [id]));
    }
  }

  getJoinStatusFn(st) {
    return (qb) => {
      qb.on("status.status_id", "friends.status_id").andOnVal("status.status", st);
    }
  }

  async getFriends(id) {
    return this.db
      .select(...friendsAndRequestsColumns)
      .from(this.table)
      .join("friends", this.getJoinFriendsFn(id))
      .join("status", this.getJoinStatusFn(status.ACCEPTED));
  }

  async getIncomingRequests(id) {
    return this.db
      .select(...friendsAndRequestsColumns)
      .from(this.table)
      .join("friends", function () {
        this.on("user_id", "from_user_id")
          .andOnVal("to_user_id", id);
      })
      .join("status", this.getJoinStatusFn(status.UNDER_CONSIDERATION));
  }

  async getOutgoingRequests(id) {
    return this.db
      .select(...friendsAndRequestsColumns)
      .from(this.table)
      .join("friends", function () {
        this.on("user_id", "to_user_id")
          .andOnVal("from_user_id", id);
      })
      .join("status", this.getJoinStatusFn(status.UNDER_CONSIDERATION));
  }

  async getByEmail(email) {
    return await super.getOneByField(email, "email");
  }

  async getByFbId(fbId) {
    return await super.getOneByField(fbId, "fb_id");
  }

  getColumnsForSearch(id) {
    return [
      "users.user_id",
      "users.name",
      "users.email",
      "users.avatar",
      "friends.request_id",
      this.db.raw(
        `case when status.status is null then true else false end as is_not_friends, ` +
        `case when status.status = '${status.ACCEPTED}' then true else false end as is_friends, ` +
        `case when from_user_id=${id} and status.status != '${status.ACCEPTED}' then true else false end as is_outgoing_request, ` +
        `case when to_user_id=${id} and status.status != '${status.ACCEPTED}' then true else false end as is_incoming_request`
      )
    ];
  }

  async searchUsers(id, text) {
    return this.db
      .select(...this.getColumnsForSearch(id))
      .from(this.table)
      .leftJoin("friends", this.getJoinFriendsFn(id))
      .leftJoin("status", "status.status_id", "friends.status_id")
      .where("users.user_id", "!=", id)
      .andWhere( (qb) => {
        qb.where(this.db.raw(`upper(users.name) like '${text.toUpperCase()}%'`))
          .orWhere(this.db.raw(`upper(split_part(users.name, ' ', 2)) like '${text.toUpperCase()}%'`))
          .orWhere("users.email", "like", `${text}%`);
      }).union((qb) =>
        qb.select(...this.getColumnsForSearch(id))
          .from(this.table)
          .leftJoin("friends", this.getJoinFriendsFn(id))
          .leftJoin("status", "status.status_id", "friends.status_id")
          .where("users.user_id", "!=", id)
          .andWhere((qb) => {
            qb.where(this.db.raw(`upper(users.name) like '%${text.toUpperCase()}%'`))
              .orWhere("users.email", "like", `%${text}%`);
          })
      )
      .limit(10);
  }

  async getRandomUserId() {
    return await super.getRandomId();
  }

  async getRecommendedUsers(ids) {
    return this.db(this.table)
      .select("user_id", "name", "avatar", "city_name")
      .whereIn("user_id", ids);
  }

  async getUsersByIds(ids) {
    return this.db(this.table)
      .select()
      .whereIn("user_id", ids);
  }

  getRecommendationsColumns() {
    return [
      this.db.raw("COALESCE(user_id, 0) AS user_id"),
      this.db.raw("COALESCE(country_id, 0) AS country_id"),
      this.db.raw("COALESCE(state_id, 0) AS state_id"),
      this.db.raw("COALESCE(city_id, 0) AS city_id"),
      this.db.raw("COALESCE(university_id, 0) AS university_id"),
      this.db.raw("COALESCE(extract(year from birthday)::integer, 0) as birth_year")
    ];
  }

  async getByIdForRecommendations(id) {
    return this.db(this.table)
      .select(...this.getRecommendationsColumns())
      .where("user_id", id)
      .first();
  }

  async getForTopologyFiltering(id) {
    const getUserIdsOfAllRequests = (qb) => {
      qb.select("user_id").from("user_requests");
    }

    const getUserIdsOfAcceptedRequests = (qb) => {
      qb.select("user_id").from("user_requests").where("status_id", 2);
    }

    return db.select()
      .from({
        main:
          db.with("user_requests", (qb) => {
            qb.select("from_user_id as user_id", "status_id")
              .from("friends")
              .where("to_user_id", id)
              .union((qb) => {
                qb.select("to_user_id as user_id", "status_id")
                  .from("friends")
                  .where("from_user_id", id);
              });
          }).select("from_user_id as user_id")
            .from("friends")
            .whereNotIn("from_user_id", getUserIdsOfAllRequests)
            .and.whereIn("to_user_id", getUserIdsOfAcceptedRequests)
            .andWhere("status_id", 2)
            .andWhere("from_user_id", "!=", id)
            .union((qb) => {
              qb.select("to_user_id as user_id")
                .from("friends")
                .whereNotIn("to_user_id", getUserIdsOfAllRequests)
                .and.whereIn("from_user_id", getUserIdsOfAcceptedRequests)
                .andWhere("from_user_id", "!=", id)
                .andWhere("status_id", 2);
            })
      })
      .orderByRaw("random()")
      .limit(1000);
  }

  async getForCollaborativeFiltering(id) {
    return this.db(this.table)
      .select("user_id")
      .whereNotIn(this.primaryKey, (qb) => {
        qb.select("user_id")
          .from("users")
          .join("friends", this.getJoinFriendsFn(id));
      })
      .andWhere("user_id", "!=", id)
      .and.whereIn("user_id", (qb) => {
        qb.select("user_id")
          .from("article_likes")
          .whereIn("article_id", (qb) => {
            qb.select("article_id")
              .from("article_likes")
              .where("user_id", id)
              .andWhere("date", ">=", this.db.raw("CURRENT_DATE - INTERVAL '30 days'"))
              .orderBy("date", "desc")
              .limit(1000);
          })
          .andWhere("date", ">=", this.db.raw("CURRENT_DATE - INTERVAL '30 days'"))
          .orderBy("date", "desc")
          .limit(1000);
      })
  }

  async getForContentFiltering(user) {
    const year = user.birthday ? user.birthday.getFullYear() : 0;
    return this.db(this.table)
      .select(...this.getRecommendationsColumns())
      .whereNotIn(this.primaryKey, (qb) => {
        qb.select("user_id")
          .from("users")
          .join("friends", this.getJoinFriendsFn(user.user_id));
      })
      .andWhere("user_id", "!=", user.user_id)
      .andWhere((qb) => {
        qb.where("country_id", "is not", null).andWhere("country_id", user.country_id)
          .orWhere("state_id", "is not", null).andWhere("state_id", user.state_id)
          .orWhere("city_id", "is not", null).andWhere("city_id", user.city_id)
          .orWhere("university_id", "is not", null).andWhere("university_id", user.university_id)
          .orWhere("birthday", "is not", null)
          .andWhere(this.db.raw("extract(year from birthday)"), "<", year + 3)
          .andWhere(this.db.raw("extract(year from birthday)"), ">", year - 3)
          .orWhereIn("user_id", (qb) => {
            qb.select("user_id")
              .from("users_interests")
              .whereIn("interest_id", (qb) => {
                qb.select("interest_id").where("user_id", user.user_id);
              });
          });
      });
  }

  async getAllUsersIds() {
    return this.db(this.table)
      .select("user_id");
  }

  async getRandomRecommendedUsers(id, recommendationsLength) {
    return this.db(this.table)
      .select("user_id", "name", "avatar", "city_name")
      .whereNotIn(this.primaryKey, (qb) => {
        qb.select("user_id")
          .from("users")
          .join("friends", this.getJoinFriendsFn(id));
      })
      .orderBy(this.db.raw("random()"))
      .limit(recommendationsLength);
  }
}

module.exports = new UsersStorage();
