const router = require("express").Router();
const passwordHasher = require("../services/passwordHasher");
const usersStorage = require("../db/users/storage");
const transporter = require("../services/transporterConfig");
const NotFoundException = require("../errors/NotFoundException");
const {v4: uuidv4} = require("uuid");
const config = require("../services/config");
const asyncHandler = require("../middleware/asyncHandler");
const passwordStorage = require("../db/password/storage");
const ForbiddenException = require("../errors/ForbiddenException");
const validationMiddleware = require("../middleware/validationMiddleware");

const {mailFrom, salt, resetPasswordUrl} = config;

router.post("/reset",
    validationMiddleware({
        email: [
            {
                name: "required",
            },
            {
                name: "email",
            },
            {
                name: "max",
                value: 255,
            },
        ],
    }),
    asyncHandler(async (req, res, next) => {
        const {email} = req.body;

        const user = await usersStorage.getByEmail(email);

        if (!user) {
            return next(new NotFoundException("User not found"));
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
            subject: "Reset password for Social Network",
            html: `To change your password for Social Network use this <a href="${resetLink}">link</a>.`
        };

        await transporter.sendMail(mailOptions);
        res.send({message: "Check your mailbox"});
    })
);

router.post("/save",
    validationMiddleware({
        token: [
            {
                name: "required",
            },
        ],
        password: [
            {
                name: "required",
            },
            {
                name: "min",
                value: 8,
            },
        ],
    }),
    asyncHandler(async (req, res, next) => {
        const {token, password} = req.body;

        const reset_password_token = await passwordStorage.getByToken(token);

        if (!reset_password_token) {
            return next(new NotFoundException("Token not found"));
        }
        if (new Date() > new Date(reset_password_token.expires_on)) {
            return next(new ForbiddenException("Token has been expired"));
        }

        const user = usersStorage.getById(reset_password_token.user_id);
        const hashedPassword = passwordHasher(password, salt);
        await usersStorage.updatePassword(reset_password_token.user_id, hashedPassword);
        await passwordStorage.delete(token);
        const mailOptions = {
            from: mailFrom,
            to: user.email,
            subject: "Reset password for Social Network",
            text: "Your password for Social Network has been changed successfully"
        };

        await transporter.sendMail(mailOptions);
        res.send({message: "Password has been changed successfully"});
    })
);

module.exports = router;
