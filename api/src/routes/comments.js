const router = require('express').Router();
const db = require('../services/db');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/comments/storage');
const authMiddleware = require('../middleware/authMiddleware');

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
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getById(id));
  })
);

router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {
      article_id: articleID,
      user_id: userID,
      text,
      parent_id: parentID,
    } = req.body;
    const date = new Date().toLocaleString('ua', {
      timeZone: 'Europe/Kiev',
    });
    let level;
    let path;
    if (parentID !== undefined) {
      const row = await storage.getLevelAndPath(parentID);
      level = row[0].level;
      level = parseInt(level, 10);
      level += 1;
      path = row[0].path;
    } else {
      level = 1;
      path = '';
    }
    await db.transaction(async () => {
      const id = await storage.create({
        article_id: articleID,
        user_id: userID,
        text,
        parent_id: parentID,
        level,
        commented_at: date,
      });
      if (path === '') {
        // eslint-disable-next-line prefer-destructuring
        path = id[0];
      } else {
        path = `${path}.${id[0]}`;
      }
      await storage.update(id[0], {
        path,
      });
    });
    res.send({ message: 'Comment was added successfully.' });
  })
);

router.put(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { text } = req.body;
    const id = parseInt(req.params.id, 10);
    await storage.update(id, {
      text,
    });
    res.send({ message: 'Comment was updated successfully.' });
  })
);

router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await storage.delete(id);
    res.send({ message: 'Comment was deleted successfully.' });
  })
);

module.exports = router;
