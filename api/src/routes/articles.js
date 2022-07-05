const router = require('express').Router();
const fs = require('fs');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/articles/storage');
const commentStorage = require('../db/comments/storage');
const likeStorage = require('../db/likes/storage');
const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const dbResponse = await storage.getAll();
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

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
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
  upload.single('file'),
  asyncHandler(async (req, res, next) => {
    const {
      text,
      visibility: { value: visibilityID },
    } = req.body;
    const id = parseInt(req.params.id, 10);
    const fileData = req.file;
    let path = null;
    if (fileData) {
      const oldFile = await storage.getFile(id);
      const { image } = oldFile[0];
      const filePath = fileData.path;
      path = filePath.substr(filePath.indexOf('/'), filePath.length);
      if (image != null) {
        fs.unlink(`public${image}`, (err) => {
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
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const file = await storage.getFile(id);
    const { image } = file[0];
    if (image != null) {
      fs.unlink(`public${image}`, (err) => {
        if (err) {
          next(err);
        }
      });
    }
    await likeStorage.deleteByArticle(id);
    await commentStorage.deleteByArticle(id);
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
    res.send(await likeStorage.getByArticle(id));
  })
);

router.get(
  '/:id/:user_id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userId = parseInt(req.params.user_id, 10);
    const dbResponse = await storage.getById(id, userId);
    const result = [
      {
        ...dbResponse[0],
        visibility: {
          value: dbResponse[0].visibility_id,
          label: dbResponse[0].visibility,
        },
      },
    ];
    res.send(result);
  })
);

module.exports = router;
