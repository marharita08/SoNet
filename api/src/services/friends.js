const friendsStorage = require("../db/friends/storage");
const BaseService = require("./base");

class FriendsService extends BaseService {

  constructor() {
    super(friendsStorage);
  }

  getRequest = async (userId, currentUserId) => {
    const row = await this.storage.getByUsersId(userId, currentUserId);
    if (!row) {
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
  };

  add = async (request) => {
    const id = await super.add({
      ...request,
      status_id: 1,
    });
    return {request: await this.storage.getRequestById(id)};
  };

  update = async (requestId, statusId) => {
    await super.update(
      requestId,
      {status_id: statusId}
    );
    return {id: requestId};
  };

  delete = async (id) => {
    await super.delete(id);
    return {id};
  };
}

module.exports = new FriendsService();
