const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const validationMiddleware = require("../middleware/validationMiddleware");
const passwordService = require("../services/password");

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
    asyncHandler(async (req, res) => {
        const {email} = req.body;
        res.send(await passwordService.resetPassword(email));
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
    asyncHandler(async (req, res) => {
        const {token, password} = req.body;
        res.send(await passwordService.saveNewPassword(token, password));
    })
);

module.exports = router;
