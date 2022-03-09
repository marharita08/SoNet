const router = require('express').Router();
const fs = require('fs');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/users/storage');
const settingsStorage = require('../db/settings/storage');
const articleStorage = require('../db/articles/storage');
const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await storage.getAll());
  })
);

router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const dbResponse = await storage.getById(id);
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
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      university_id: universityID,
      avatar,
    } = req.body;
    const id = await storage.create({
      name,
      email,
      phone,
      university_id: universityID,
      avatar,
    });
    await settingsStorage.create({ user_id: id[0] });
    res.send({ message: 'Account was created successfully.' });
  })
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      email_visibility: { value: emailVisibilityID },
      phone_visibility: { value: phoneVisibilityID },
      university_visibility: { value: universityVisibilityID },
    } = req.body;
    let {
      university: { value: universityID },
      phone,
    } = req.body;
    const fileData = req.file;
    const id = parseInt(req.params.id, 10);
    if (universityID === undefined) {
      universityID = null;
    }
    if (phone === '') {
      phone = null;
    }
    let path;
    if (fileData) {
      const oldFile = await storage.getAvatar(id);
      const { avatar } = oldFile[0];
      const filePath = fileData.path;
      path = filePath.substr(filePath.indexOf('/'), filePath.length);
      if (avatar != null) {
        fs.unlink(`public${avatar}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }
    const user = {
      name,
      email,
      phone,
      university_id: universityID,
      avatar: path,
    };
    await storage.update(id, user);
    const settings = {
      email_visibility_id: emailVisibilityID,
      phone_visibility_id: phoneVisibilityID,
      university_visibility_id: universityVisibilityID,
    };
    await settingsStorage.update(id, settings);
    res.send({ message: 'Profile was updated successfully.' });
  })
);

router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await storage.delete(id);
    res.send({ message: 'Account was deleted successfully.' });
  })
);

router.get(
  '/:id/friends',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getFriends(id));
  })
);

router.get(
  '/:id/incoming-requests',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getIncomingRequests(id));
  })
);

router.get(
  '/:id/outgoing-requests',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getOutgoingRequests(id));
  })
);

router.get(
  '/:id/news',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const dbResponse = await articleStorage.getNews(id);
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

module.exports = router;
