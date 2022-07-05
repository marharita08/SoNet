const router = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/likes/storage');
const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await storage.getAll());
  })
);

router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { article_id: articleID, user_id: userID } = req.body;
    await storage.create({
      article_id: articleID,
      user_id: userID,
    });
    res.send({ success: true });
  })
);

router.delete(
  '/:article_id/:user_id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { article_id: articleID, user_id: userID } = req.params;
    await storage.delete(articleID, userID);
    res.send({ success: true });
  })
);

module.exports = router;
