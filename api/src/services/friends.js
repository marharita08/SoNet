const friendsStorage = require("../db/friends/storage");

const getRequest = async (userId, currentUserId) => {
    const row = await friendsStorage.getByUsersId(userId, currentUserId);
    if (row === undefined) {
        return {is_not_friends: true};
    }
    const {from_user_id: fromUserId, status_id: statusId} = row;
    if (statusId === 2) {
        return {...row, is_friends: true};
    }
    if (fromUserId === currentUserId) {
        return {...row, is_outgoing_request: true};
    }
    return {...row, is_incoming_request: true};
}

const add = async (request) => {
    const id = await friendsStorage.create({
        ...request,
        status_id: 1,
    });
    return {request: await friendsStorage.getRequestById(id[0])};
}

const update = async (requestId, statusId) => {
    await friendsStorage.update(
        {
            status_id: statusId,
        },
        requestId
    );
    return {id: requestId};
}

const _delete = async (id) => {
    await friendsStorage.delete(id);
    return {id};
}

module.exports = {
    getRequest,
    add,
    update,
    delete: _delete
}
