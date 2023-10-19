const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const validationMiddleware = require("../middleware/validationMiddleware");
const passwordService = require("../services/password");
const validation = require("../utils/validationRules");

router.post("/reset",
    validationMiddleware({
        email: validation.email,
    }),
    asyncHandler(async (req, res) => {
        const {email} = req.body;
        res.send(await passwordService.resetPassword(email));
    })
);

router.post("/save",
    validationMiddleware({
        token: validation.required,
        password: validation.password,
    }),
    asyncHandler(async (req, res) => {
        const {token, password} = req.body;
        res.send(await passwordService.saveNewPassword(token, password));
    })
);

module.exports = router;
