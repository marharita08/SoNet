const usersStorage = require("../db/users/storage");
const NotFoundException = require("../errors/NotFoundException");
const config = require("../configs/config");
const settingsStorage = require("../db/settings/storage");
const fileHelper = require("../utils/fileHelper");

const getProfile = async (id) => {
    const dbResponse = await usersStorage.getProfileById(id);
    if (dbResponse[0]) {
        const {
            email_visibility_id, ev_label,
            phone_visibility_id, pv_label,
            university_id, university_label,
            university_visibility_id, uv_label,
            ...rest
        } = dbResponse[0];
        const result = {
            ...rest,
            email_visibility: {
                value: email_visibility_id,
                label: ev_label,
            },
            phone_visibility: {
                value: phone_visibility_id,
                label: pv_label,
            },
            university: {
                value: university_id,
                label: university_label,
            },
            university_visibility: {
                value: university_visibility_id,
                label: uv_label,
            },
        };
        if (result.university.value == null) {
            result.university = null;
        }
        return result;
    }
    return undefined;
};

const getAll = async () => {
    return await usersStorage.getAll();
}

const getById = async (id) => {
    return await usersStorage.getById(id);
}

const getByEmail = async (email) => {
    return await usersStorage.getByEmail(email)
}

const getProfileById = async (id) => {
    const profile = await getProfile(id);
    if (profile) {
        return profile;
    }
    throw new NotFoundException("User not found");
}

const update = async (id, user, settings, fileData, errorHandler) => {
    if (user.phone === "") {
        user.phone = null;
    }
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
}

const _delete = async (id) => {
    return await usersStorage.delete(id);
}

const getFriends = async (id) => {
    return await usersStorage.getFriends(id);
}

const getIncomingRequests = async (id) => {
    return await usersStorage.getIncomingRequests(id);
}

const getOutgoingRequests = async (id) => {
    return await usersStorage.getOutgoingRequests(id);
}

const getAllForSearch = async (id) => {
    return await usersStorage.getAllForSearch(id);
}

module.exports = {
    getAll,
    getById,
    getByEmail,
    getProfileById,
    getFriends,
    getOutgoingRequests,
    getIncomingRequests,
    getAllForSearch,
    update,
    delete: _delete
}
