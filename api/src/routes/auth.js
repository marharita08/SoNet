const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { google } = require('googleapis');
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/users/storage');
const { appKey } = require('../services/config');
const config = require('../services/config');

const { clientID, clientSecret, callbackURL } = config;

const oAuth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  callbackURL
);

router.post(
  '/google',
  asyncHandler(async (req, res) => {
    const { token } = req.body;
    oAuth2Client.credentials = token;
    const oauth2 = google.oauth2('v2');

    const {
      data: { email, name },
    } = await oauth2.userinfo.v2.me.get({
      auth: oAuth2Client,
    });

    let user = await storage.getByEmail(email);

    if (!user) {
      user = {
        name,
        email,
      };
      await storage.create(user);
      user = await storage.getByEmail(email);
    }

    let accessToken;
    let refreshToken;
    if (user) {
      accessToken = jwt.sign(
        { user_id: user.user_id, name: user.name },
        appKey,
        {
          expiresIn: '30m',
        }
      );
      refreshToken = uuidv4();
      await storage.createSession({
        user_id: user.user_id,
        token: refreshToken,
      });
    }

    if (accessToken) {
      return res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    }
    return res.sendStatus(401);
  })
);

module.exports = router;
