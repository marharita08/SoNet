const router = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/likes/storage');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await storage.getAll());
  })
);

router.get(
  '/:article_id/is-liked',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user_id: userId } = req.auth;
    const { article_id: articleId } = req.params;
    const row = await storage.getByArticleIdAndUserId(articleId, userId);
    if (row) {
      return res.send(true);
    }
    return res.send(false);
  })
);

router.post(
  '/',
  authMiddleware,
  validationMiddleware({
    article_id: [{ name: 'required' }],
  }),
  asyncHandler(async (req, res) => {
    const { article_id: articleID } = req.body;
    const { user_id: userID } = req.auth;
    await storage.create({
      article_id: articleID,
      user_id: userID,
    });
    res.sendStatus(204);
  })
);

router.delete(
  '/article/:article_id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { article_id: articleID } = req.params;
    const { user_id: userID } = req.auth;
    await storage.delete(articleID, userID);
    res.sendStatus(204);
  })
);

module.exports = router;
