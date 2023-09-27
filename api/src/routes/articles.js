const router = require("express").Router();
const fs = require("fs");
const upload = require("../services/multerConfig");
const asyncHandler = require("../middleware/asyncHandler");
const storage = require("../db/articles/storage");
const commentStorage = require("../db/comments/storage");
const likeStorage = require("../db/likes/storage");
const userStorage = require("../db/users/storage");
const authMiddleware = require("../middleware/authMiddleware");
const aclMiddleware = require("../middleware/aclMiddleware");
const NotFoundException = require("../errors/NotFoundException");
const ForbiddenException = require("../errors/ForbiddenException");
const validationMiddleware = require("../middleware/validationMiddleware");
const articleStorage = require("../db/articles/storage");

router.get(
    "/all-news",
    authMiddleware,
    asyncHandler(async (req, res, next) => {
        const id = parseInt(req.auth.user_id, 10);
        const user = await userStorage.getById(id);
        if (user.role !== "admin") {
            return next(new ForbiddenException());
        }
        const page = parseInt(req.query.page, 10);
        const limit = parseInt(req.query.limit, 10);
        const dbResponse = await storage.getAllNews(page, limit);
        const result = [];
        Object.keys(dbResponse).forEach((dbResponseKey) => {
            result.push({
                ...dbResponse[dbResponseKey],
                visibility: {
                    value: dbResponse[dbResponseKey].visibility_id,
                    label: dbResponse[dbResponseKey].visibility,
                },
            });
        });
        return res.send(result);
    })
);

router.get(
    "/all-news/amount",
    authMiddleware,
    asyncHandler(async (req, res, next) => {
        const id = parseInt(req.auth.user_id, 10);
        const user = await userStorage.getById(id);
        if (user.role !== "admin") {
            return next(new ForbiddenException());
        }
        return res.send(await storage.getCountOfAllNews());
    })
);

router.get(
    "/news",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.auth.user_id, 10);
        const page = parseInt(req.query.page, 10);
        const limit = parseInt(req.query.limit, 10);
        const dbResponse = await articleStorage.getNewsByUserId(id, page, limit);
        const result = [];
        Object.keys(dbResponse).forEach((dbResponseKey) => {
            result.push({
                ...dbResponse[dbResponseKey],
                visibility: {
                    value: dbResponse[dbResponseKey].visibility_id,
                    label: dbResponse[dbResponseKey].visibility,
                },
            });
        });
        res.send(result);
    })
);

router.get(
    "/news/amount",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.auth.user_id, 10);
        return res.send(await storage.getCountOfNewsByUserId(id));
    })
);

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await storage.getAll());
    })
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const userId = parseInt(req.auth.user_id, 10);
        const user = await userStorage.getById(userId);
        let dbResponse;
        if (user.role === "admin") {
            dbResponse = await storage.getWholeArticleById(id);
        } else {
            dbResponse = await storage.getByIdAndUserId(id, userId);
        }
        if (dbResponse) {
            const result = [
                {
                    ...dbResponse,
                    visibility: {
                        value: dbResponse.visibility_id,
                        label: dbResponse.visibility,
                    },
                },
            ];
            return res.send(result);
        }
        return next(new NotFoundException("Article not found"));
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
        const date = new Date().toLocaleString("ua", {
            timeZone: "Europe/Kiev",
        });
        let path = null;
        if (fileData) {
            const filePath = fileData.path;
            path = filePath.substr(filePath.indexOf("/"), filePath.length);
        }
        const id = await storage.create({
            user_id: userID,
            text,
            visibility_id: visibilityID,
            created_at: date,
            image: path,
        });
        const dbResponse = await storage.getWholeArticleById(id[0]);
        const result = {
            ...dbResponse,
            visibility: {
                value: dbResponse.visibility_id,
                label: dbResponse.visibility,
            },
        };
        res.send(result);
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
            getResource: (req) => storage.getById(req.params.id),
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
            visibility: {value: visibilityID},
        } = req.body;
        const id = parseInt(req.params.id, 10);
        const fileData = req.file;
        let path = null;
        if (fileData) {
            const {image: oldFile} = await storage.getImageByArticleId(id);
            const filePath = fileData.path;
            path = filePath.substring(filePath.indexOf("/"), filePath.length);
            if (oldFile != null) {
                fs.unlink(`public${oldFile}`, (err) => {
                    if (err) {
                        next(err);
                    }
                });
            }
        }
        await storage.update(id, {
            text,
            visibility_id: visibilityID,
            image: path,
        });
        const dbResponse = await storage.getWholeArticleById(id);
        const result = {
            ...dbResponse,
            visibility: {
                value: dbResponse.visibility_id,
                label: dbResponse.visibility,
            },
        };
        res.send(result);
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
            getResource: (req) => storage.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    asyncHandler(async (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const {image} = await storage.getImageByArticleId(id);
        if (image) {
            fs.unlink(`public${image}`, (err) => {
                if (err) {
                    next(err);
                }
            });
        }
        await storage.delete(id);
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
