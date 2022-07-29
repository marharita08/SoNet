const router = require('express').Router();
const fs = require('fs');
const upload = require('../services/multerConfig');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/users/storage');
const settingsStorage = require('../db/settings/storage');
const authMiddleware = require('../middleware/authMiddleware');
const aclMiddleware = require('../middleware/aclMiddleware');
const NotFoundException = require('../errors/NotFoundException');
const validationMiddleware = require('../middleware/validationMiddleware');
const passwordHasher = require('../services/passwordHasher');
const config = require('../services/config');

const getProfile = async (id) => {
  const dbResponse = await storage.getProfileById(id);
  if (dbResponse[0]) {
    const result = {
      ...dbResponse[0],
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
    };
    if (result.university.value == null) {
      result.university = null;
    }
    return result;
  }
  return undefined;
};

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
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const profile = await getProfile(id);
    if (profile) {
      return res.send(profile);
    }
    return next(new NotFoundException('User not found'));
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
      role: 'user',
    });
    await settingsStorage.create({ user_id: id[0] });
    res.send({ message: 'Account was created successfully.' });
  })
);

router.put(
  '/:id',
  authMiddleware,
  aclMiddleware([
    {
      resource: 'user',
      action: 'update',
      possession: 'own',
      getResource: (req) => storage.getById(req.params.id),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  upload.single('file'),
  validationMiddleware(
    {
      email: [
        {
          name: 'required',
        },
        {
          name: 'email',
        },
        {
          name: 'max',
          value: 255,
        },
        {
          name: 'unique',
        },
      ],
      name: [
        {
          name: 'required',
        },
        {
          name: 'max',
          value: 255,
        },
      ],
      phone: [
        {
          name: 'regexp',
          value: /^\+380\d{9}$/,
        },
      ],
      password: [{ name: 'min', value: 8 }],
      email_visibility: [{ name: 'required' }],
      phone_visibility: [{ name: 'required' }],
      university_visibility: [{ name: 'required' }],
    },
    {
      email: {
        id: {
          name: 'user_id',
          value: (req) => req.params.id,
        },
        getResourceByField: (email) => storage.getByEmail(email),
      },
    }
  ),
  asyncHandler(async (req, res, next) => {
    const {
      name,
      email,
      email_visibility: { value: emailVisibilityID },
      phone_visibility: { value: phoneVisibilityID },
      university_visibility: { value: universityVisibilityID },
      university: { value: universityID },
    } = req.body;
    let { phone, password } = req.body;
    const fileData = req.file;
    const id = parseInt(req.params.id, 10);
    if (phone === '') {
      phone = null;
    }
    const { password: oldHashedPassword } = await storage.getPassword(id);
    if (password !== '' && password !== oldHashedPassword) {
      password = passwordHasher(password, config.salt);
    } else if (password === '') {
      password = null;
    }
    let avatarUrl;
    let avatarPath;
    if (fileData) {
      const { avatar_path: oldAvatarPath } = await storage.getAvatarPath(id);
      avatarPath = fileData.path;
      avatarUrl =
        config.appUrl +
        avatarPath.substr(avatarPath.indexOf('/'), avatarPath.length);
      if (oldAvatarPath != null) {
        fs.unlink(oldAvatarPath, (err) => {
          if (err) {
            next(err);
          }
        });
      }
    }
    const user = {
      name,
      email,
      password,
      phone,
      university_id: universityID,
      avatar: avatarUrl,
      avatar_path: avatarPath,
    };
    await storage.update(id, user);
    const settings = {
      email_visibility_id: emailVisibilityID,
      phone_visibility_id: phoneVisibilityID,
      university_visibility_id: universityVisibilityID,
    };
    await settingsStorage.update(id, settings);
    res.send(await getProfile(id));
  })
);

router.delete(
  '/:id',
  authMiddleware,
  aclMiddleware([
    {
      resource: 'user',
      action: 'delete',
      possession: 'own',
      getResource: (req) => storage.getById(req.params.id),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await storage.delete(id);
    res.sendStatus(204);
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
  '/:id/search',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.send(await storage.getAllForSearch(id));
  })
);

module.exports = router;
