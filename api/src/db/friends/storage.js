const db = require("../../configs/db");
const {shortColumns, tables} = require("../dbSchema");
const {friends, users} = shortColumns;

module.exports = {
    create: (request) => db(tables.friends).insert(request).returning(friends.requestId),
    update: (request, id) => db(tables.friends).update(request).where(friends.requestId, id),
    delete: (id) => db(tables.friends).delete().where(friends.requestId, id),
    getByUsersId: (userID, currentUserID) =>
        db(tables.friends)
            .select()
            .first()
            .where(function () {
                this.where(friends.fromUserId, userID).andWhere(friends.toUserId, currentUserID);
            })
            .orWhere(function () {
                this.where(friends.toUserId, userID).andWhere(friends.fromUserId, currentUserID);
            }),
    getRequestById: (id) =>
        db
            .select(friends.requestId, users.userId, users.name, users.avatar)
            .first()
            .from(tables.users)
            .join(tables.friends, function () {
                this.on(users.userId, friends.toUserId).andOn(id, friends.requestId);
            }),
};
