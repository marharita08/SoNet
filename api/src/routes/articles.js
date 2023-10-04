const router = require("express").Router();
const upload = require("../configs/multerConfig");
const asyncHandler = require("../middleware/asyncHandler");
const commentStorage = require("../db/comments/storage");
const likeStorage = require("../db/likes/storage");
const authMiddleware = require("../middleware/authMiddleware");
const aclMiddleware = require("../middleware/aclMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const articlesService = require("../services/articles");

router.get(
    "/all-news",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        const {page, limit} = req.query;
        return res.send(await articlesService.getAllNews(+userId, +page, +limit));
    })
);

router.get(
    "/all-news/amount",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        return res.send(await articlesService.getAllNewsAmount(+userId));
    })
);

router.get(
    "/news",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        const {page, limit} = req.query;
        return res.send(await articlesService.getNewsByUserId(+userId, +page, +limit));
    })
);

router.get(
    "/news/amount",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        return res.send(await articlesService.getNewsAmountByUserId(+userId));
    })
);

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await articlesService.getAll());
    })
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id: articleId} = req.params;
        const {user_id: userId} = req.auth;
        return res.send(await articlesService.getWholeArticleById(+articleId, +userId));
    })
);

router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    validationMiddleware({
        user_id: [{name: "required"}],
        text: [{name: "required"}],
        visibility: [{name: "required"}],
    }),
    asyncHandler(async (req, res) => {
        const {
            user_id: userID,
            text,
            visibility: {value: visibilityID},
        } = req.body;
        const fileData = req.file;
        return res.send(await articlesService.addArticle(userID, text, visibilityID, fileData));
    })
);

router.put(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: "post",
            action: "update",
            possession: "own",
            getResource: (req) => articlesService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    upload.single("file"),
    validationMiddleware({
        text: [{name: "required"}],
        visibility: [{name: "required"}],
    }),
    asyncHandler(async (req, res, next) => {
        const {
            text,
            visibility: {value: visibilityId},
        } = req.body;
        const {id: articleId} = req.params;
        const fileData = req.file;
        return res.send(articlesService.updateArticle(+articleId, text, visibilityId, fileData, next));
    })
);

router.delete(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: "post",
            action: "delete",
            possession: "own",
            getResource: (req) => articlesService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    asyncHandler(async (req, res, next) => {
        const {id: articleId} = req.params;
        await articlesService.deleteArticle(+articleId, next);
        res.sendStatus(204);
    })
);

router.get(
    "/:id/comments",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await commentStorage.getFullDataByArticleId(id));
    })
);

router.get(
    "/:id/comments-count",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await commentStorage.getAmountByArticleId(id));
    })
);

router.get(
    "/:id/likes",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await likeStorage.getByArticleId(id));
    })
);

router.get(
    "/:id/likes-count",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await likeStorage.getAmountByArticleId(id));
    })
);

module.exports = router;
