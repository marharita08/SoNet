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
  "avatar"
];

class UsersStorage extends BaseStorage {
  constructor() {
    super("users", "user_id", db);
  }

  getProfileById = async (id) =>
    this.db
      .select(
        `${this.table}.*`,
        "user_settings.*",
        "universities.name as university_label",
        "ev.visibility as ev_label",
        "pv.visibility as pv_label",
        "uv.visibility as uv_label",
        "cv.visibility as cv_label",
        "sv.visibility as sv_label",
        "civ.visibility as civ_label"
      )
      .from(this.table)
      .join("user_settings", `${this.table}.${this.primaryKey}`, "user_settings.user_id")
      .join({ev: "field_visibilities"}, "email_visibility_id", "ev.visibility_id")
      .join({pv: "field_visibilities"}, "phone_visibility_id", "pv.visibility_id")
      .join({uv: "field_visibilities"}, "university_visibility_id", "uv.visibility_id")
      .join({cv: "field_visibilities"}, "country_visibility_id", "cv.visibility_id")
      .join({sv: "field_visibilities"}, "state_visibility_id", "sv.visibility_id")
      .join({civ: "field_visibilities"}, "city_visibility_id", "civ.visibility_id")
      .leftOuterJoin("universities", "users.university_id", "universities.university_id")
      .where(`${this.table}.${this.primaryKey}`, id);

  getAvatarPath = async (id) => super.getFieldById(id, "avatar_path");

  getFriends = async (id) =>
    this.db
      .select(...friendsAndRequestsColumns)
      .from(this.table)
      .join("friends", function () {
        this.on("user_id", "from_user_id").andOn("to_user_id", id)
          .orOn("user_id", "to_user_id").andOn("from_user_id", id);
      })
      .join("status", function () {
        this.on("status.status_id", "friends.status_id")
          .andOnVal("status.status", status.ACCEPTED);
      });

  getIncomingRequests = async (id) =>
    this.db
      .select(...friendsAndRequestsColumns)
      .from(this.table)
      .join("friends", function () {
        this.on("user_id", "from_user_id")
          .andOnVal("to_user_id", id);
      })
      .join("status", function () {
        this.on("status.status_id", "friends.status_id")
          .andOnVal("status.status", status.UNDER_CONSIDERATION);
      });

  getOutgoingRequests = async (id) =>
    this.db
      .select(...friendsAndRequestsColumns)
      .from(this.table)
      .join("friends", function () {
        this.on("user_id", "to_user_id")
          .andOnVal("from_user_id", id);
      })
      .join("status", function () {
        this.on("status.status_id", "friends.status_id")
          .andOnVal("status.status", status.UNDER_CONSIDERATION);
      });

  getByEmail = async (email) => super.getOneByField(email, "email");

  getByFbId = async (fbId) => super.getOneByField(fbId, "fb_id")

  searchUsers = async (id, text) =>
    this.db
      .select(
        "users.user_id",
        "users.name",
        "users.email",
        "users.avatar",
        "friends.request_id",
        db.raw(
          `case when status.status is null then true else false end as is_not_friends, ` +
          `case when status.status = '${status.ACCEPTED}' then true else false end as is_friends, ` +
          `case when from_user_id=${id} and status.status != '${status.ACCEPTED}' then true else false end as is_outgoing_request, ` +
          `case when to_user_id=${id} and status.status != '${status.ACCEPTED}' then true else false end as is_incoming_request`
        )
      )
      .from(this.table)
      .leftJoin("friends", function () {
        this.on("user_id", "from_user_id").andOn("to_user_id", id)
          .orOn("user_id", "to_user_id").andOn("from_user_id", id);
      })
      .leftJoin("status", "status.status_id", "friends.status_id")
      .where("users.user_id", "!=", id)
      .andWhere(function () {
        this.where("users.name", "like", `%${text}%`)
          .orWhere("users.email", "like", `%${text}%`);
      })
      .orderBy("users.name")
      .limit(10);

  getRandomUserId = async () => super.getRandomId();
}

module.exports = new UsersStorage();
