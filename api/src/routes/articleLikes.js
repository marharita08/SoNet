const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(await db.select().from('article_likes').orderBy('article_id'));
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(
    await db.select().from('article_likes').where('article_id', '=', id)
  );
});

router.post('/', async (req, res) => {
  const { articleID, userID } = req.body;
  await db('article_likes').insert({
    article_id: articleID,
    user_id: userID,
  });
  res.send('Like was added successfully.');
});

router.delete('/', async (req, res) => {
  const { articleID, userID } = req.body;
  await db('article_likes')
    .delete()
    .where('article_id', articleID)
    .andWhere('user_id', userID);
  res.send('Like was deleted successfully.');
});

module.exports = router;
