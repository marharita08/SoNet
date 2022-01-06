const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  res.send(await db.select().from('comments').orderBy('comment_id'));
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(await db.select().from('comments').where('comment_id', id));
});

router.post('/', async (req, res) => {
  const { articleID, userID, text, parentID } = req.body;
  const date = new Date().toLocaleString('ua', {
    timeZone: 'Europe/Kiev',
  });
  let level;
  let path;
  try {
    level = await db('comments').select('level').where('comment_id', parentID);
    level = parseInt(level[0].level, 10);
    level += 1;
    path = await db('comments').select('path').where('comment_id', parentID);
    path = path[0].path;
  } catch (err) {
    level = 1;
    path = '';
  }
  await db.transaction(async () => {
    await db('comments').insert({
      article_id: articleID,
      user_id: userID,
      text,
      parent_id: parentID,
      level,
      commented_at: date,
    });
    let id = await db.select(db.raw("currval('comments_comment_id_seq')"));
    id = id[0].currval;
    if (path === '') {
      path = id;
    } else {
      path = `${path}.${id}`;
    }
    await db('comments')
      .update({
        path,
      })
      .where('comment_id', id);
  });
  res.send('Comment was added successfully.');
});

router.put('/:id', async (req, res) => {
  const { text } = req.body;
  const id = parseInt(req.params.id, 10);
  await db('comments')
    .update({
      text,
    })
    .where('comment_id', id);
  res.send('Comment was updated successfully.');
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db('comments').delete().where('comment_id', id);
  res.send('Comment was deleted successfully.');
});

router.get('/:id/likes', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(await db.select().from('comment_likes').where('comment_id', id));
});

module.exports = router;
