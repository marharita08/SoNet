const usersStorage = require("../db/users/storage");
const NotFoundException = require("../errors/NotFoundException");
const {v4: uuidv4} = require("uuid");
const passwordStorage = require("../db/password/storage");
const transporter = require("../configs/transporterConfig");
const config = require("../configs/config");
const ForbiddenException = require("../errors/ForbiddenException");
const passwordHasher = require("../utils/passwordHasher");
const {USER_NOT_FOUND, TOKEN_NOT_FOUND, EXPIRED_TOKEN} = require("../constants/errorMessages");

const {mailFrom, salt, resetPasswordUrl} = config;

const resetPassword = async (email) => {
    const user = await usersStorage.getByEmail(email);

    if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
    }

    const token = uuidv4();

    await passwordStorage.create({
        user_id: user.user_id,
        token
    });

    const resetLink = `${resetPasswordUrl}${token}`;
    const mailOptions = {
        from: mailFrom,
        to: email,
        subject: "Reset password for SoNet",
        html: `To change your password for SoNet use this <a href="${resetLink}">link</a>.`
    };

    await transporter.sendMail(mailOptions);
    return {message: "Check your mailbox"};
}

const saveNewPassword = async (token, password) => {
    const reset_password_token = await passwordStorage.getByToken(token);

    if (!reset_password_token) {
        throw new NotFoundException(TOKEN_NOT_FOUND);
    }
    if (new Date() > new Date(reset_password_token.expires_on)) {
        throw new ForbiddenException(EXPIRED_TOKEN);
    }

    const user = await usersStorage.getById(reset_password_token.user_id);
    const hashedPassword = passwordHasher(password, salt);
    await usersStorage.update(reset_password_token.user_id, {password: hashedPassword});
    await passwordStorage.delete(token);
    const mailOptions = {
        from: mailFrom,
        to: user.email,
        subject: "Reset password for SoNet",
        text: "Your password for SoNet has been changed successfully."
    };

    await transporter.sendMail(mailOptions);
    return {message: "Password has been changed successfully"};
}

module.exports = {
    resetPassword,
    saveNewPassword
}
