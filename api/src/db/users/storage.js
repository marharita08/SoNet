const db = require("../../configs/db");
const {tables, shortColumns, fullColumns, status} = require("../dbSchema");
const friendsAndRequestsColumns = [
    shortColumns.friends.requestId,
    shortColumns.users.userId,
    shortColumns.users.name,
    shortColumns.users.avatar
];

module.exports = {
    create: async (user) => db(tables.users).returning(shortColumns.users.userId).insert(user),
    getAll: async () => db.select().from(tables.users).orderBy(shortColumns.users.userId),
    getById: async (id) => db(tables.users).select().first().where(shortColumns.users.userId, id),
    getProfileById: async (id) =>
        db
            .select(
                `${tables.users}.*`,
                `${tables.userSettings}.*`,
                `${fullColumns.universities.name} as university_label`,
                `ev.${shortColumns.fieldVisibilities.visibility} as ev_label`,
                `pv.${shortColumns.fieldVisibilities.visibility} as pv_label`,
                `uv.${shortColumns.fieldVisibilities.visibility} as uv_label`,
                `cv.${shortColumns.fieldVisibilities.visibility} as cv_label`,
                `sv.${shortColumns.fieldVisibilities.visibility} as sv_label`,
                `civ.${shortColumns.fieldVisibilities.visibility} as civ_label`
            )
            .from(tables.users)
            .join(tables.userSettings, fullColumns.users.userId, fullColumns.userSettings.userId)
            .join(
                {ev: tables.fieldVisibilities},
                shortColumns.userSettings.emailVisibilityId,
                `ev.${shortColumns.fieldVisibilities.visibilityId}`
            )
            .join(
                {pv: tables.fieldVisibilities},
                shortColumns.userSettings.phoneVisibilityId,
                `pv.${shortColumns.fieldVisibilities.visibilityId}`
            )
            .join(
                {uv: tables.fieldVisibilities},
                shortColumns.userSettings.universityVisibilityId,
                `uv.${shortColumns.fieldVisibilities.visibilityId}`
            )
            .join(
                {cv: tables.fieldVisibilities},
                shortColumns.userSettings.countryVisibility,
                `cv.${shortColumns.fieldVisibilities.visibilityId}`
            )
            .join(
                {sv: tables.fieldVisibilities},
                shortColumns.userSettings.stateVisibility,
                `sv.${shortColumns.fieldVisibilities.visibilityId}`
            )
            .join(
                {civ: tables.fieldVisibilities},
                shortColumns.userSettings.cityVisibility,
                `civ.${shortColumns.fieldVisibilities.visibilityId}`
            )
            .leftOuterJoin(tables.universities, fullColumns.users.universityId, fullColumns.universities.universityId)
            .where(fullColumns.users.userId, id),
    update: async (id, user) => db(tables.users).update(user).where(shortColumns.users.userId, id),
    getAvatarPath: async (id) =>
        db(tables.users).select(shortColumns.users.avatarPath).first().where(shortColumns.users.userId, id),
    delete: async (id) => db(tables.users).delete().where(shortColumns.users.userId, id),
    getFriends: async (id) =>
        db
            .select(...friendsAndRequestsColumns)
            .from(tables.users)
            .join(tables.friends, function () {
                this.on(shortColumns.users.userId, shortColumns.friends.fromUserId)
                    .andOn(shortColumns.friends.toUserId, id)
                    .orOn(shortColumns.users.userId, shortColumns.friends.toUserId)
                    .andOn(shortColumns.friends.fromUserId, id);
            })
            .join(tables.status, function () {
                this.on(fullColumns.status.statusId, fullColumns.friends.statusId)
                    .andOnVal(fullColumns.status.status, status.accepted);
            }),
    getIncomingRequests: async (id) =>
        db
            .select(...friendsAndRequestsColumns)
            .from(tables.users)
            .join(tables.friends, function () {
                this.on(shortColumns.users.userId, shortColumns.friends.fromUserId)
                    .andOnVal(shortColumns.friends.toUserId, id);
            })
            .join(tables.status, function () {
                this.on(fullColumns.status.statusId, fullColumns.friends.statusId).andOnVal(
                    fullColumns.status.status,
                    status.underConsideration
                );
            }),
    getOutgoingRequests: async (id) =>
        db
            .select(...friendsAndRequestsColumns)
            .from(tables.users)
            .join(tables.friends, function () {
                this.on(shortColumns.users.userId, shortColumns.friends.toUserId)
                    .andOnVal(shortColumns.friends.fromUserId, id);
            })
            .join(tables.status, function () {
                this.on(fullColumns.status.statusId, fullColumns.friends.statusId).andOnVal(
                    fullColumns.status.status,
                    status.underConsideration
                );
            }),
    getByEmail: async (email) =>
        db(tables.users).select().first().where(shortColumns.users.email, email),
    getByFbId: async (fbId) => db(tables.users).select().first().where(shortColumns.users.fbId, fbId),
    searchUsers: async (id, text) =>
        db
            .select(
                fullColumns.users.userId,
                fullColumns.users.name,
                fullColumns.users.email,
                fullColumns.users.avatar,
                fullColumns.friends.requestId,
                db.raw(
                    `case when ${fullColumns.status.status} is null then true else false end as is_not_friends, ` +
                    `case when ${fullColumns.status.status} = '${status.accepted}' then true else false end as is_friends, ` +
                    `case when ${fullColumns.friends.fromUserId}=${id} and ${fullColumns.status.status} != '${status.accepted}' then true else false end as is_outgoing_request, ` +
                    `case when ${fullColumns.friends.toUserId}=${id} and ${fullColumns.status.status} != '${status.accepted}' then true else false end as is_incoming_request`
                )
            )
            .from(tables.users)
            .leftJoin(tables.friends, function () {
                this.on(shortColumns.users.userId, shortColumns.friends.fromUserId)
                    .andOn(shortColumns.friends.toUserId, id)
                    .orOn(shortColumns.users.userId, shortColumns.friends.toUserId)
                    .andOn(shortColumns.friends.fromUserId, id);
            })
            .leftJoin(tables.status, fullColumns.status.statusId, fullColumns.friends.statusId)
            .where(fullColumns.users.userId, "!=", id)
            .andWhere(function() {
                this.where(fullColumns.users.name, "like", `%${text}%`)
                    .orWhere(fullColumns.users.email, "like", `%${text}%`);
            })
            .orderBy(fullColumns.users.name)
            .limit(10),
    getRandomUserId: async () =>
        db(tables.users).select(shortColumns.users.userId).first().orderByRaw("random()").limit(1)
};
