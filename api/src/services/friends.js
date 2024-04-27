const friendsStorage = require("../db/friends/storage");
const BaseService = require("./base");

class FriendsService extends BaseService {

  constructor() {
    super(friendsStorage);
  }

  async getRequest(userId, currentUserId) {
    const row = await this.storage.getByUsersId(userId, currentUserId);
    if (!row) {
      return { is_not_friends: true };
    }
    const { from_user_id: fromUserId, status_id: statusId } = row;
    if (statusId === 2) {
      return { ...row, is_friends: true };
    }
    if (fromUserId === currentUserId) {
      return { ...row, is_outgoing_request: true };
    }
    return { ...row, is_incoming_request: true };
  }

  async add(request) {
    const {request_id} = await super.add({
      ...request,
      status_id: 1,
    });
    return { request: await this.storage.getRequestById(request_id) };
  }

  async update(requestId, statusId) {
    await super.update(
      requestId,
      { status_id: statusId }
    );
    return { id: requestId };
  }

  async delete(id) {
    await super.delete(id);
    return { id };
  }

  async getFriendsIds(id) {
    return await this.storage.getFriendsIds(id);
  }
}

module.exports = new FriendsService();
