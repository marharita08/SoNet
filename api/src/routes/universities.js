const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const storage = require("../db/universities/storage");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await storage.getAll());
    })
);

module.exports = router;
