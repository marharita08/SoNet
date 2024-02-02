const usersStorage = require("../db/users/storage");
const NotFoundException = require("../errors/NotFoundException");
const config = require("../configs/config");
const settingsStorage = require("../db/settings/storage");
const fileHelper = require("../utils/fileHelper");
const {USER_NOT_FOUND} = require("../constants/messages");
const {parseToProfile, parseToUserAndSettings} = require("../utils/parser");

const getProfile = async (id) => {
    const dbResponse = await usersStorage.getProfileById(id);
    return parseToProfile(dbResponse[0]);
};

const getAll = async () => {
    return await usersStorage.getAll();
};

const getById = async (id) => {
    return await usersStorage.getById(id);
};

const getByEmail = async (email) => {
    return await usersStorage.getByEmail(email);
};

const getProfileById = async (id) => {
    const profile = await getProfile(id);
    if (profile) {
        return profile;
    }
    throw new NotFoundException(USER_NOT_FOUND);
};

const update = async (id, userData, fileData, errorHandler) => {
    const {user, settings} = parseToUserAndSettings(userData);
    let avatarUrl;
    let avatarPath;
    if (fileData) {
        const {avatar_path: oldAvatarPath} = await usersStorage.getAvatarPath(id);
        avatarPath = fileData.path;
        avatarUrl = config.appUrl + fileHelper.getUrlPath(fileData);
        fileHelper.deleteFile(oldAvatarPath, errorHandler);
    }
    await usersStorage.update(id, {
        ...user,
        avatar: avatarUrl,
        avatar_path: avatarPath,
    });
    await settingsStorage.update(id, settings);
    return await getProfile(id);
};

const _delete = async (id) => {
    return await usersStorage.delete(id);
};

const getFriends = async (id) => {
    return await usersStorage.getFriends(id);
};

const getIncomingRequests = async (id) => {
    return await usersStorage.getIncomingRequests(id);
};

const getOutgoingRequests = async (id) => {
    return await usersStorage.getOutgoingRequests(id);
};

const searchUsers = async (id, text) => {
    return await usersStorage.searchUsers(id, text);
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    getProfileById,
    getFriends,
    getOutgoingRequests,
    getIncomingRequests,
    searchUsers,
    update,
    delete: _delete
};
