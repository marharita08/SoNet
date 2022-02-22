const router = require('express').Router();
const db = require('../services/db');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const dbResponse = await db
      .select(
        'articles.*',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.name',
        'users.avatar',
        'v.visibility'
      )
      .countDistinct('article_likes.user_id', { as: 'likes' })
      .countDistinct('comments.comment_id', { as: 'comments' })
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .leftJoin(
        'article_likes',
        'article_likes.article_id',
        'articles.article_id'
      )
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .groupBy('users.user_id')
      .groupBy('v.visibility');
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

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const dbResponse = await db
      .select(
        'articles.*',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.name',
        'users.avatar',
        'v.visibility'
      )
      .countDistinct('article_likes.user_id', { as: 'likes' })
      .countDistinct('comments.comment_id', { as: 'comments' })
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .leftJoin(
        'article_likes',
        'article_likes.article_id',
        'articles.article_id'
      )
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .groupBy('users.user_id')
      .groupBy('v.visibility')
      .where('articles.article_id', id);
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

router.post(
  '/',
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
    await db('articles').insert({
      user_id: userID,
      text,
      visibility_id: visibilityID,
      created_at: date,
      image: path,
    });
    res.send('Article was created successfully.');
  })
);

router.put(
  '/:id',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const {
      text,
      visibility: { value: visibilityID },
    } = req.body;
    const id = parseInt(req.params.id, 10);
    const fileData = req.file;
    let path = null;
    if (fileData) {
      const filePath = fileData.path;
      path = filePath.substr(filePath.indexOf('/'), filePath.length);
    }
    await db('articles')
      .update({
        text,
        visibility_id: visibilityID,
        image: path,
      })
      .where('article_id', id);
    res.send('Article was updated successfully.');
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await db('articles').delete().where('article_id', id);
    res.send('Article was deleted successfully.');
  })
);

router.get(
  '/:id/likes',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(
      await db.select().from('article_likes').where('article_id', '=', id)
    );
  })
);

router.get(
  '/:id/comments',
  asyncHandler(async (req, res) => {
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
  })
);

module.exports = router;
