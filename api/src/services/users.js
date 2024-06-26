const usersStorage = require("../db/users/storage");
const userInterestsService = require("./userInterests");
const NotFoundException = require("../errors/NotFoundException");
const config = require("../configs/config");
const settingsStorage = require("../db/settings/storage");
const fileHelper = require("../utils/fileHelper");
const {USER_NOT_FOUND} = require("../constants/messages");
const {parseToProfile, parseToUserAndSettings} = require("../utils/usersParser");
const BaseService = require("./base");

class UsersServices extends BaseService {

  constructor() {
    super(usersStorage);
  }

  async getUserWithInterests(user) {
    const interests = await userInterestsService.getByUserId(user.user_id);
    return {...user, interests};
  }

  async getById(id) {
    const user = await super.getById(id);
    return await this.getUserWithInterests(user);
  }

  async getProfile(id) {
    const dbResponse = await this.storage.getProfileById(id);
    const user = await this.getUserWithInterests(parseToProfile(dbResponse[0]));
    const interest_names = await userInterestsService.getNamesByUserId(id);
    return {...user, interest_names};
  };

  async getByEmail(email) {
    return await this.storage.getByEmail(email);
  };

  async getProfileById(id) {
    const profile = await this.getProfile(id);
    if (profile) {
      return profile;
    }
    throw new NotFoundException(USER_NOT_FOUND);
  };

  async update(id, {userData, fileData}) {
    const {user: {interests, ...user}, settings} = parseToUserAndSettings(userData);
    let avatarUrl;
    let avatarPath;
    if (fileData) {
      const {avatar_path: oldAvatarPath} = await this.storage.getAvatarPath(id);
      avatarPath = fileData.path;
      avatarUrl = config.appUrl + fileHelper.getUrlPath(fileData);
      fileHelper.deletePublicFile(oldAvatarPath);
    }
    await super.update(id, {
      ...user,
      avatar: avatarUrl,
      avatar_path: avatarPath,
    });
    await settingsStorage.update(id, settings);
    interests && await userInterestsService.updateByUserId(id, interests.map(i => +i));
    return await this.getProfile(id);
  };

  async getFriends(id) {
    return await this.storage.getFriends(id);
  };

  async getIncomingRequests(id) {
    return await this.storage.getIncomingRequests(id);
  };

  async getOutgoingRequests(id) {
    return await this.storage.getOutgoingRequests(id);
  };

  async searchUsers(id, text) {
    return await this.storage.searchUsers(id, text);
  };

  async getRecommendedUsers(ids) {
    return await this.storage.getRecommendedUsers(ids);
  }

  async getByIdForRecommendations(id) {
    const user = await this.storage.getByIdForRecommendations(id);
    return await this.getUserWithInterests(user);
  }

  async getAllUsersIds() {
    return await this.storage.getAllUsersIds();
  }

  async getUsersByIds(ids) {
    const users = await this.storage.getUsersByIds(ids);
    return await Promise.all(
      users.map(async (user) => {
        return await this.getUserWithInterests(user);
      })
    );
  }

  async getForContentFiltering(user) {
    const users = await this.storage.getForContentFiltering(user);
    return await Promise.all(
      users.map(async (user) => {
        return await this.getUserWithInterests(user);
      })
    );
  }

  async getForCollaborativeFiltering(id) {
    return await this.storage.getForCollaborativeFiltering(id);
  }

  async getForTopologyFiltering(id){
    return await this.storage.getForTopologyFiltering(id);
  }

  async getRandomRecommendedUsers(id, recommendationsLength) {
    return await this.storage.getRandomRecommendedUsers(id, recommendationsLength);
  }
}

module.exports = new UsersServices();
