const router = require('express').Router();
const db = require('../services/db');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/comments/storage');
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
    const comment = await storage.getById(id);
    if (comment[0]) {
      return res.send(comment);
    }
    return next(new NotFoundException('Comment not found'));
  })
);

router.post(
  '/',
  authMiddleware,
  validationMiddleware({
    article_id: [
      {
        name: 'required',
      },
    ],
    user_id: [
      {
        name: 'required',
      },
    ],
    text: [
      {
        name: 'required',
      },
    ],
    level: [
      {
        name: 'required',
      },
    ],
  }),
  asyncHandler(async (req, res) => {
    const {
      article_id: articleID,
      user_id: userID,
      text,
      parent_id: parentID,
      level,
    } = req.body;
    let { path } = req.body;
    const date = new Date().toLocaleString('ua', {
      timeZone: 'Europe/Kiev',
    });
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
  aclMiddleware([
    {
      resource: 'comment',
      action: 'update',
      possession: 'own',
      getResource: (req) => storage.getById(req.params.id),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  validationMiddleware({
    text: [
      {
        name: 'required',
      },
    ],
  }),
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
  aclMiddleware([
    {
      resource: 'comment',
      action: 'delete',
      possession: 'own',
      getResource: (req) => storage.getById(req.params.id),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await storage.delete(id);
    res.send({ message: 'Comment was deleted successfully.' });
  })
);

module.exports = router;
