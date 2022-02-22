const router = require('express').Router();
const fs = require('fs');
const db = require('../services/db');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.send(await db.select().from('users').orderBy('user_id'));
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const dbResponse = await db
      .select(
        'u.*',
        'us.*',
        'un.name as university_label',
        'ev.visibility as ev_label',
        'nv.visibility as nv_label',
        'pv.visibility as pv_label',
        'uv.visibility as uv_label'
      )
      .from({ u: 'users' })
      .join({ us: 'user_settings' }, 'u.user_id', 'us.user_id')
      .join(
        { ev: 'field_visibilities' },
        'email_visibility_id',
        'ev.visibility_id'
      )
      .join(
        { nv: 'field_visibilities' },
        'name_visibility_id',
        'nv.visibility_id'
      )
      .join(
        { pv: 'field_visibilities' },
        'phone_visibility_id',
        'pv.visibility_id'
      )
      .join(
        { uv: 'field_visibilities' },
        'university_visibility_id',
        'uv.visibility_id'
      )
      .leftOuterJoin(
        { un: 'universities' },
        'u.university_id',
        'un.university_id'
      )
      .where('u.user_id', id);
    const result = [
      {
        ...dbResponse[0],
        name_visibility: {
          value: dbResponse[0].name_visibility_id,
          label: dbResponse[0].nv_label,
        },
        email_visibility: {
          value: dbResponse[0].email_visibility_id,
          label: dbResponse[0].ev_label,
        },
        phone_visibility: {
          value: dbResponse[0].phone_visibility_id,
          label: dbResponse[0].pv_label,
        },
        university: {
          value: dbResponse[0].university_id,
          label: dbResponse[0].university_label,
        },
        university_visibility: {
          value: dbResponse[0].university_visibility_id,
          label: dbResponse[0].uv_label,
        },
      },
    ];
    if (result[0].university.value == null) {
      result[0].university = null;
    }
    res.send(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      university_id: universityID,
      avatar,
    } = req.body;
    await db('users').insert({
      name,
      email,
      phone,
      university_id: universityID,
      avatar,
    });
    res.send('User was created successfully.');
  })
);

router.put(
  '/:id',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      name_visibility: { value: nameVisibilityID },
      email_visibility: { value: emailVisibilityID },
      phone_visibility: { value: phoneVisibilityID },
      university_visibility: { value: universityVisibilityID },
    } = req.body;
    let {
      university: { value: universityID },
    } = req.body;
    const fileData = req.file;
    const id = parseInt(req.params.id, 10);
    if (universityID === undefined) {
      universityID = null;
    }
    await db('users')
      .update({
        name,
        email,
        phone,
        university_id: universityID,
      })
      .where('user_id', id);
    await db('user_settings')
      .update({
        name_visibility_id: nameVisibilityID,
        email_visibility_id: emailVisibilityID,
        phone_visibility_id: phoneVisibilityID,
        university_visibility_id: universityVisibilityID,
      })
      .where('user_id', id);
    if (fileData) {
      const oldFile = await db('users').select('avatar').where('user_id', id);
      const filePath = fileData.path;
      const path = filePath.substr(filePath.indexOf('/'), filePath.length);
      await db('users').update({ avatar: path }).where('user_id', id);
      if (oldFile[0].avatar != null) {
        fs.unlink(`public${oldFile[0].avatar}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }
    res.send('User was updated successfully.');
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await db('users').delete().where('user_id', id);
    res.send('User was deleted successfully.');
  })
);

router.get(
  '/:id/friends',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(
      await db
        .select('user_id', 'name', 'avatar')
        .from('users')
        .join({ f: 'friends' }, function () {
          this.on(db.raw('(user_id=from_user_id or user_id=to_user_id)')).andOn(
            db.raw(`(from_user_id=${id} or to_user_id=${id})`)
          );
        })
        .join({ s: 'status' }, function () {
          this.on('s.status_id', 'f.status_id').andOnVal(
            's.status',
            'Accepted'
          );
        })
        .where('user_id', '!=', id)
    );
  })
);

router.get(
  '/:id/incoming-requests',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(
      await db
        .select('user_id', 'name', 'avatar')
        .from('users')
        .join({ f: 'friends' }, function () {
          this.on('user_id', 'from_user_id').andOnVal('to_user_id', id);
        })
        .join({ s: 'status' }, function () {
          this.on('s.status_id', 'f.status_id').andOnVal(
            's.status',
            'Under consideration'
          );
        })
    );
  })
);

router.get(
  '/:id/outgoing-requests',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(
      await db
        .select('user_id', 'name', 'avatar')
        .from('users')
        .join({ f: 'friends' }, function () {
          this.on('user_id', 'to_user_id').andOnVal('from_user_id', id);
        })
        .join({ s: 'status' }, function () {
          this.on('s.status_id', 'f.status_id').andOnVal(
            's.status',
            'Under consideration'
          );
        })
    );
  })
);

module.exports = router;
