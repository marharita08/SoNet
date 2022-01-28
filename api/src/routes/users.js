const router = require('express').Router();
const db = require('../services/db');
const upload = require('../services/multerConfig');

router.get('/', async (req, res) => {
  res.send(await db.select().from('users').orderBy('user_id'));
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(
    await db
      .select()
      .from({ u: 'users' })
      .join({ us: 'user_settings' }, 'u.user_id', 'us.user_id')
      .where('u.user_id', id)
  );
});

router.post('/', async (req, res) => {
  const { name, email, phone, university_id: universityID, avatar } = req.body;
  await db('users').insert({
    name,
    email,
    phone,
    university_id: universityID,
    avatar,
  });
  res.send('User was created successfully.');
});

router.put('/:id', upload.single('file'), async (req, res) => {
  const { name, email, phone, university_id: universityID } = req.body;
  const fileData = req.file;
  const id = parseInt(req.params.id, 10);
  await db('users')
    .update({
      name,
      email,
      phone,
      university_id: universityID,
    })
    .where('user_id', id);
  if (fileData) {
    const filePath = fileData.path;
    const path = filePath.substr(filePath.indexOf('/'), filePath.length);
    await db('users').update({ avatar: path }).where('user_id', id);
  }
  res.send('User was updated successfully.');
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await db('users').delete().where('user_id', id);
  res.send('User was deleted successfully.');
});

module.exports = router;
