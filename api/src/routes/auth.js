const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/users/storage');
const sessionStorage = require('../db/sessions/storage');
const { appKey } = require('../services/config');
const config = require('../services/config');
const settingsStorage = require('../db/settings/storage');
const passwordHasher = require('../services/passwordHasher');
const UnauthorizedException = require('../errors/UnauthorizedException');
const validationMiddleware = require('../middleware/validationMiddleware');

const createAccessToken = (user) =>
  jwt.sign({ user_id: user.user_id, name: user.name }, appKey, {
    expiresIn: '30m',
  });

const createTokens = async (user, res, next) => {
  let accessToken;
  let refreshToken;
  if (user) {
    accessToken = createAccessToken(user);
    refreshToken = uuidv4();
    await sessionStorage.create({
      user_id: user.user_id,
      token: refreshToken,
    });
  }

  if (accessToken) {
    return res.send({
      user,
      accessToken,
      refreshToken,
      success: true,
    });
  }
  return next(new UnauthorizedException());
};

router.post(
  '/facebook',
  validationMiddleware({
    access_token: [
      {
        name: 'required',
      },
    ],
  }),
  passport.authenticate('facebookToken', {
    session: false,
  }),
  asyncHandler(async (req, res) => {
    const { user } = req;
    return createTokens(user, res);
  })
);

router.post(
  '/google',
  validationMiddleware({
    access_token: [
      {
        name: 'required',
      },
    ],
  }),
  passport.authenticate('googleToken', {
    session: false,
  }),
  asyncHandler(async (req, res) => {
    const { user } = req;
    return createTokens(user, res);
  })
);

router.post(
  '/',
  validationMiddleware({
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
    ],
    password: [
      {
        name: 'required',
      },
      {
        name: 'min',
        value: 8,
      },
    ],
  }),
  asyncHandler(async (req, res, next) => {
    let { password } = req.body;
    const { email } = req.body;

    let user = await storage.getByEmail(email);
    password = passwordHasher(password, config.salt);

    if (!user) {
      const name = email.split('@')[0];
      user = {
        name,
        email,
        password,
        role: 'user',
      };
      const id = await storage.create(user);
      await settingsStorage.create({ user_id: id[0] });
      user = await storage.getByEmail(email);
    } else if (user.password !== password) {
      return next(new UnauthorizedException('Wrong password'));
    }
    return createTokens(user, res, next);
  })
);

router.post(
  '/refresh',
  validationMiddleware({
    refreshToken: [
      {
        name: 'required',
      },
    ],
  }),
  asyncHandler(async (req, res, next) => {
    const session = await sessionStorage.getByToken(req.body.refreshToken);
    if (session) {
      const user = await storage.getById(session.user_id);
      const accessToken = createAccessToken(user);

      if (accessToken) {
        return res.send({
          accessToken,
          refreshToken: session.token,
          success: true,
        });
      }
    }
    return next(new UnauthorizedException());
  })
);

router.post(
  '/logout',
  validationMiddleware({
    refreshToken: [
      {
        name: 'required',
      },
    ],
  }),
  asyncHandler(async (req, res) => {
    await sessionStorage.deleteByToken(req.body.refreshToken);
    res.sendStatus(204);
  })
);

module.exports = router;
