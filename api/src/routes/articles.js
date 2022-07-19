const router = require('express').Router();
const fs = require('fs');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/articles/storage');
const commentStorage = require('../db/comments/storage');
const likeStorage = require('../db/likes/storage');
const authMiddleware = require('../middleware/authMiddleware');
const aclMiddleware = require('../middleware/aclMiddleware');
const NotFoundException = require('../errors/NotFoundException');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await storage.getAll());
  })
);

router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const article = await storage.getById(id);
    if (article) {
      return res.send(article);
    }
    return next(new NotFoundException('Article not found'));
  })
);

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  validationMiddleware({
    user_id: [{ name: 'required' }],
    text: [{ name: 'required' }],
    visibility: [{ name: 'required' }],
  }),
  asyncHandler(async (req, res) => {
    const {
      user_id: userID,
      text,
      visibility: { value: visibilityID },
    } = req.body;
    const fileData = req.file;
    const date = new Date().toLocaleString('ua', {
      timeZone: 'Europe/Kiev',
    });
    let path = null;
    if (fileData) {
      const filePath = fileData.path;
      path = filePath.substr(filePath.indexOf('/'), filePath.length);
    }
    await storage.create({
      user_id: userID,
      text,
      visibility_id: visibilityID,
      created_at: date,
      image: path,
    });
    res.send({ message: 'Article was created successfully.' });
  })
);

router.put(
  '/:id',
  authMiddleware,
  aclMiddleware([
    {
      resource: 'post',
      action: 'update',
      possession: 'own',
      getResource: (req) => storage.getById(req.params.id),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  upload.single('file'),
  validationMiddleware({
    text: [{ name: 'required' }],
    visibility: [{ name: 'required' }],
  }),
  asyncHandler(async (req, res, next) => {
    const {
      text,
      visibility: { value: visibilityID },
    } = req.body;
    const id = parseInt(req.params.id, 10);
    const fileData = req.file;
    let path = null;
    if (fileData) {
      const { image: oldFile } = await storage.getImageByArticleId(id);
      const filePath = fileData.path;
      path = filePath.substr(filePath.indexOf('/'), filePath.length);
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
    res.send({ message: 'Article was updated successfully.' });
  })
);

router.delete(
  '/:id',
  authMiddleware,
  aclMiddleware([
    {
      resource: 'post',
      action: 'delete',
      possession: 'own',
      getResource: (req) => storage.getById(req.params.id),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const file = await storage.getImageByArticleId(id);
    const { image } = file[0];
    if (image != null) {
      fs.unlink(`public${image}`, (err) => {
        if (err) {
          next(err);
        }
      });
    }
    await likeStorage.deleteByArticleId(id);
    await commentStorage.deleteByArticleId(id);
    await storage.delete(id);
    res.send({ message: 'Article was deleted successfully.' });
  })
);

router.get(
  '/:id/comments',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await commentStorage.getByArticleId(id));
  })
);

router.get(
  '/:id/likes',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await likeStorage.getByArticleId(id));
  })
);

router.get(
  '/:id/:user_id',
  authMiddleware,
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const userId = parseInt(req.params.user_id, 10);
    const dbResponse = await storage.getByIdAndUserId(id, userId);
    if (dbResponse[0]) {
      const result = [
        {
          ...dbResponse[0],
          visibility: {
            value: dbResponse[0].visibility_id,
            label: dbResponse[0].visibility,
          },
        },
      ];
      return res.send(result);
    }
    return next(new NotFoundException('Article not found'));
  })
);

module.exports = router;
