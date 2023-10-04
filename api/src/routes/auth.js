const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("../middleware/asyncHandler");
const validationMiddleware = require("../middleware/validationMiddleware");
const authService = require("../services/auth");

router.post(
    "/facebook",
    validationMiddleware({
        access_token: [
            {
                name: "required",
            },
        ],
    }),
    passport.authenticate("facebookToken", {
        session: false,
    }),
    asyncHandler(async (req, res) => {
        const {user} = req;
        return res.send(await authService.createTokens(user));
    })
);

router.post(
    "/google",
    validationMiddleware({
        access_token: [
            {
                name: "required",
            },
        ],
    }),
    passport.authenticate("googleToken", {
        session: false,
    }),
    asyncHandler(async (req, res) => {
        const {user} = req;
        return res.send(await authService.createTokens(user));
    })
);

router.post(
    "/",
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
    asyncHandler(async (req, res) => {
        const {email, password} = req.body;
        return res.send(await authService.loginOrSignUp(email, password));
    })
);

router.post(
    "/refresh",
    validationMiddleware({
        refreshToken: [
            {
                name: "required",
            },
        ],
    }),
    asyncHandler(async (req, res) => {
        return res.send(await authService.refresh(req.body.refreshToken));
    })
);

router.post(
    "/logout",
    validationMiddleware({
        refreshToken: [
            {
                name: "required",
            },
        ],
    }),
    asyncHandler(async (req, res) => {
        await authService.logout(req.body.refreshToken);
        res.sendStatus(204);
    })
);

module.exports = router;
