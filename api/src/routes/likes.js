const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const likesService = require("../services/likes");

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await likesService.getAll());
    })
);

router.get(
    "/:article_id/is-liked",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        const {article_id: articleId} = req.params;
        res.send(likesService.isLiked(articleId, userId));
    })
);

router.post(
    "/",
    authMiddleware,
    validationMiddleware({
        article_id: [{name: "required"}],
    }),
    asyncHandler(async (req, res) => {
        const {article_id: articleId} = req.body;
        const {user_id: userId} = req.auth;
        await likesService.add(articleId, userId);
        res.sendStatus(204);
    })
);

router.delete(
    "/article/:article_id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {article_id: articleId} = req.params;
        const {user_id: userId} = req.auth;
        await likesService.delete(articleId, userId);
        res.sendStatus(204);
    })
);

module.exports = router;
