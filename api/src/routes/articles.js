const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(await db.select().from('articles').orderBy('article_id'));
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(await db.select().from('articles').where('article_id', '=', id));
});

router.post('/', async (req, res) => {
  const { userID, text, visibilityID } = req.body;
  const date = new Date().toLocaleString('ua', {
    timeZone: 'Europe/Kiev',
  });
  await db('articles').insert({
    user_id: userID,
    text,
    visibility_id: visibilityID,
    created_at: date,
  });
  res.send('Article was created successfully.');
});

router.put('/:id', async (req, res) => {
  const { text, visibilityID } = req.body;
  const id = parseInt(req.params.id, 10);
  await db('articles')
    .update({
      text,
      visibility_id: visibilityID,
    })
    .where('article_id', id);
  res.send('Article was updated successfully.');
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db('articles').delete().where('article_id', id);
  res.send('Article was deleted successfully.');
});

router.get('/:id/likes', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(
    await db.select().from('article_likes').where('article_id', '=', id)
  );
});

router.get('/:id/comments', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(
    await db
      .select()
      .from('comments')
      .where('article_id', '=', id)
      .orderBy('path')
  );
});

module.exports = router;
