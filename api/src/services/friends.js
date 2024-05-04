const friendsStorage = require("../db/friends/storage");
const recommendedUsersStorage = require("../db/recommended_users/storage");
const BaseService = require("./base");

const status = {
  UNDER_CONSIDERATION: 1,
  ACCEPTED: 2,
  DENIED: 3,
  HIDDEN: 4
};

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
    if (statusId === status.ACCEPTED) {
      return { ...row, is_friends: true };
    }
    if (fromUserId === currentUserId) {
      return { ...row, is_outgoing_request: true };
    }
    return { ...row, is_incoming_request: true };
  }

  async add({statusId, ...request}) {
    await recommendedUsersStorage.deleteByUserIds(...request);
    const {request_id} = await super.add({
      ...request,
      status_id: statusId || status.UNDER_CONSIDERATION,
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
