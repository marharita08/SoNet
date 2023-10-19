const usersStorage = require("../db/users/storage");
const NotFoundException = require("../errors/NotFoundException");
const {v4: uuidv4} = require("uuid");
const passwordStorage = require("../db/password/storage");
const transporter = require("../configs/transporterConfig");
const config = require("../configs/config");
const ForbiddenException = require("../errors/ForbiddenException");
const passwordHasher = require("../utils/passwordHasher");
const Messages = require("../constants/messages");
const hbs = require("../configs/handlebarsConfig");
const commonMailOptions = require("../configs/commonMailOptions");
const views = require("../constants/views");
const frontUrls = require("../constants/frontUrls");

const {salt} = config;
const subject = "Reset password for SoNet";

const resetPassword = async (email) => {
    const user = await usersStorage.getByEmail(email);

    if (!user) {
        throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    const token = uuidv4();

    await passwordStorage.create({
        user_id: user.user_id,
        token
    });
    const resetLink = `${frontUrls.RESET_PASSWORD}${token}`;

    const htmlContent = await hbs.render(views.RESET_PASSWORD, {
        link: resetLink,
        user: user.name,
        home: frontUrls.HOME
    });

    const mailOptions = {
        ...commonMailOptions,
        to: email,
        subject,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return {message: Messages.CHECK_MAILBOX};
}

const saveNewPassword = async (token, password) => {
    const reset_password_token = await passwordStorage.getByToken(token);

    if (!reset_password_token) {
        throw new NotFoundException(Messages.TOKEN_NOT_FOUND);
    }
    if (new Date() > new Date(reset_password_token.expires_on)) {
        throw new ForbiddenException(Messages.EXPIRED_TOKEN);
    }

    const user = await usersStorage.getById(reset_password_token.user_id);
    const hashedPassword = passwordHasher(password, salt);
    await usersStorage.update(reset_password_token.user_id, {password: hashedPassword});
    await passwordStorage.delete(token);

    const htmlContent = await hbs.render(views.PASSWORD_CHANGED, {
        user: user.name,
        home: frontUrls.HOME
    });

    const mailOptions = {
        ...commonMailOptions,
        to: user.email,
        subject,
        html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    return {message: Messages.PASSWORD_CHANGED};
}

module.exports = {
    resetPassword,
    saveNewPassword
}
