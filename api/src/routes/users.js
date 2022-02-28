const router = require('express').Router();
const fs = require('fs');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/users/storage');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.send(await storage.getAll());
  })
);

router.get(
  '/:id',
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
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      university_id: universityID,
      avatar,
    } = req.body;
    await storage.create({
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
    let path;
    if (fileData) {
      const oldFile = await storage.getAvatar(id);
      const filePath = fileData.path;
      path = filePath.substr(filePath.indexOf('/'), filePath.length);
      if (oldFile[0].avatar != null) {
        fs.unlink(`public${oldFile[0].avatar}`, (err) => {
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
      path,
    };
    await storage.update(id, user);
    const settings = {
      name_visibility_id: nameVisibilityID,
      email_visibility_id: emailVisibilityID,
      phone_visibility_id: phoneVisibilityID,
      university_visibility_id: universityVisibilityID,
    };
    await storage.updateSettings(id, settings);
    res.send('User was updated successfully.');
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await storage.delete(id);
    res.send('User was deleted successfully.');
  })
);

router.get(
  '/:id/friends',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getFriends(id));
  })
);

router.get(
  '/:id/incoming-requests',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getIncomingRequests(id));
  })
);

router.get(
  '/:id/outgoing-requests',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getOutgoingRequests(id));
  })
);

module.exports = router;
