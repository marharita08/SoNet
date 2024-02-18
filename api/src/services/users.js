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

  getProfile = async (id) => {
    const dbResponse = await this.storage.getProfileById(id);
    const interests = await userInterestsService.getByUserId(id);
    return {...parseToProfile(dbResponse[0]), interests};
  };

  getByEmail = async (email) => {
    return await this.storage.getByEmail(email);
  };

  getProfileById = async (id) => {
    const profile = await this.getProfile(id);
    if (profile) {
      return profile;
    }
    throw new NotFoundException(USER_NOT_FOUND);
  };

  update = async (id, {userData, fileData}) => {
    const {user: {interests, ...user}, settings} = parseToUserAndSettings(userData);
    let avatarUrl;
    let avatarPath;
    if (fileData) {
      const {avatar_path: oldAvatarPath} = await this.storage.getAvatarPath(id);
      avatarPath = fileData.path;
      avatarUrl = config.appUrl + fileHelper.getUrlPath(fileData);
      fileHelper.deleteFile(oldAvatarPath);
    }
    await super.update(id, {
      ...user,
      avatar: avatarUrl,
      avatar_path: avatarPath,
    });
    await settingsStorage.update(id, settings);
    await userInterestsService.updateByUserId(id, interests.map(i => +i));
    return await this.getProfile(id);
  };

  getFriends = async (id) => {
    return await this.storage.getFriends(id);
  };

  getIncomingRequests = async (id) => {
    return await this.storage.getIncomingRequests(id);
  };

  getOutgoingRequests = async (id) => {
    return await this.storage.getOutgoingRequests(id);
  };

  searchUsers = async (id, text) => {
    return await this.storage.searchUsers(id, text);
  };
}

module.exports = new UsersServices();
