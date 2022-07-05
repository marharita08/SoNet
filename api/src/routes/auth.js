const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/users/storage');
const sessionStorage = require('../db/sessions/storage');
const { appKey } = require('../services/config');
const config = require('../services/config');
const settingsStorage = require('../db/settings/storage');
const passwordHasher = require('../services/passwordHasher');

const { facebookEnv, googleEnv } = config;

const createAccessToken = (user) =>
  jwt.sign({ user_id: user.user_id, name: user.name }, appKey, {
    expiresIn: '30m',
  });

const createTokens = async (user, res) => {
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
  return res.sendStatus(401);
};

passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: facebookEnv.clientID,
      clientSecret: facebookEnv.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      const fbId = profile.id;
      let user = await storage.getByFbId(fbId);
      if (!user) {
        const [{ value: email }] = profile.emails;
        const name = profile.displayName;
        user = {
          name,
          email,
          fb_id: fbId,
        };
        const id = await storage.create(user);
        await settingsStorage.create({ user_id: id[0] });
        user = await storage.getByFbId(fbId);
      }
      return done(null, user);
    }
  )
);

passport.use(
  'googleToken',
  new GoogleTokenStrategy(
    {
      clientID: googleEnv.clientID,
      clientSecret: googleEnv.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      const [{ value: email }] = profile.emails;
      let user = await storage.getByEmail(email);
      if (!user) {
        const name = profile.displayName;
        user = {
          name,
          email,
        };
        const id = await storage.create(user);
        await settingsStorage.create({ user_id: id[0] });
        user = await storage.getByEmail(email);
      }
      return done(null, user);
    }
  )
);

router.post(
  '/facebook',
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
  asyncHandler(async (req, res) => {
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
      };
      const id = await storage.create(user);
      await settingsStorage.create({ user_id: id[0] });
      user = await storage.getByEmail(email);
    } else if (user.password !== password) {
      return res.status(401).send({ message: 'Wrong password' });
    }

    return createTokens(user, res);
  })
);

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const session = await sessionStorage.getByToken(req.body.refreshToken);
    if (session) {
      const user = (await storage.getById(session.user_id))[0];
      const accessToken = createAccessToken(user);
      const refreshToken = uuidv4();
      await sessionStorage.deleteByToken(session.token);
      await sessionStorage.create({
        user_id: session.user_id,
        token: refreshToken,
      });

      if (accessToken) {
        return res.send({
          accessToken,
          refreshToken,
          success: true,
        });
      }
    }
    return res.sendStatus(401);
  })
);

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    await sessionStorage.deleteByToken(req.body.refreshToken);
    return res.send({ message: 'Logged out' });
  })
);

module.exports = router;
