const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const storage = require("../db/visibilities/storage");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/field",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await storage.getForFiled());
    })
);

router.get(
    "/article",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await storage.getForArticle());
    })
);

module.exports = router;
