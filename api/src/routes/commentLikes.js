const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(await db.select().from('comment_likes').orderBy('comment_id'));
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(
    await db.select().from('comment_likes').where('comment_id', '=', id)
  );
});

router.post('/', async (req, res) => {
  const { commentID, userID } = req.body;
  await db('comment_likes').insert({
    comment_id: commentID,
    user_id: userID,
  });
  res.send('Like was added successfully.');
});

router.delete('/', async (req, res) => {
  const { commentID, userID } = req.body;
  await db('comment_likes')
    .delete()
    .where('comment_id', commentID)
    .andWhere('user_id', userID);
  res.send('Like was deleted successfully.');
});

module.exports = router;
