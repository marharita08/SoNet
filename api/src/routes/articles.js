const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(
    await db
      .select(
        'articles.*',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.name',
        'users.avatar'
      )
      .countDistinct('article_likes.user_id', { as: 'likes' })
      .countDistinct('comments.comment_id', { as: 'comments' })
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .leftJoin(
        'article_likes',
        'article_likes.article_id',
        'articles.article_id'
      )
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .groupBy('users.user_id')
  );
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(
    await db
      .select(
        'articles.*',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.name',
        'users.avatar'
      )
      .countDistinct('article_likes.user_id', { as: 'likes' })
      .countDistinct('comments.comment_id', { as: 'comments' })
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .leftJoin(
        'article_likes',
        'article_likes.article_id',
        'articles.article_id'
      )
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .groupBy('users.user_id')
      .where('articles.article_id', id)
  );
});

router.post('/', async (req, res) => {
  const { user_id: userID, text, visibility_id: visibilityID } = req.body;
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
  const { text, visibility_id: visibilityID } = req.body;
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
      .select(
        'ch.*',
        'chu.name',
        'chu.avatar',
        'pu.name as to',
        'p.user_id as p_user_id'
      )
      .from({ ch: 'comments' })
      .leftOuterJoin({ p: 'comments' }, 'p.comment_id', 'ch.parent_id')
      .leftOuterJoin({ pu: 'users' }, 'pu.user_id', 'p.user_id')
      .join({ chu: 'users' }, 'chu.user_id', 'ch.user_id')
      .where('ch.article_id', id)
      .orderBy('ch.path')
  );
});

module.exports = router;
