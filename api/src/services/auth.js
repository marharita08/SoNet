const {v4: uuidv4} = require("uuid");
const sessionStorage = require("../db/sessions/storage");
const UnauthorizedException = require("../errors/UnauthorizedException");
const userStorage = require("../db/users/storage");
const passwordHasher = require("../utils/passwordHasher");
const config = require("../configs/config");
const settingsStorage = require("../db/settings/storage");
const Messages = require("../constants/messages");
const createAccessToken = require("../utils/createAccessToken");
const {Roles} = require("../middleware/aclRules");

const createTokens = async (user) => {
    let accessToken;
    let refreshToken;
    if (user) {
        accessToken = createAccessToken(user);
        refreshToken = uuidv4();
        await sessionStorage.create({
            user_id: user.user_id,
            token: refreshToken,
        });
    }

    if (accessToken) {
        return {
            user,
            accessToken,
            refreshToken,
            success: true,
        };
    }
    throw new UnauthorizedException();
};

const loginOrSignUp = async (email, password) => {
    let user = await userStorage.getByEmail(email);
    const hashedPassword = passwordHasher(password, config.salt);

    if (!user) {
        const name = email.split("@")[0];
        user = {
            name,
            email,
            password: hashedPassword,
            role: Roles.USER,
        };
        const id = await userStorage.create(user);
        await settingsStorage.create({user_id: id[0]});
        user = await userStorage.getByEmail(email);
    } else if (user.password !== hashedPassword) {
        throw new UnauthorizedException(Messages.WRONG_PASSWORD);
    }
    return createTokens(user);
};

const loginWithGoogle = async (user) => {
    return createTokens(user);
}

const loginWithFacebook = async (user) => {
    return createTokens(user);
}

const refresh = async (refreshToken) => {
    const session = await sessionStorage.getByToken(refreshToken);
    if (session) {
        const user = await userStorage.getById(session.user_id);
        const accessToken = createAccessToken(user);

        if (accessToken) {
            return {
                accessToken,
                refreshToken: session.token,
                success: true,
            };
        }
    }
    throw new UnauthorizedException();
};

const logout = async (refreshToken) => {
    return await sessionStorage.deleteByToken(refreshToken);
};

module.exports = {
    loginOrSignUp,
    loginWithGoogle,
    loginWithFacebook,
    refresh,
    logout
};
