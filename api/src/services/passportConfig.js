const GoogleTokenStrategy = require("passport-google-token").Strategy;
const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const storage = require("../db/users/storage");
const settingsStorage = require("../db/settings/storage");
const config = require("./config");

const {facebookEnv, googleEnv} = config;

module.exports = () => {
    passport.use(
        "facebookToken",
        new FacebookTokenStrategy(
            {
                clientID: facebookEnv.clientID,
                clientSecret: facebookEnv.clientSecret,
            },
            async (accessToken, refreshToken, profile, done) => {
                const fbId = profile.id;
                let user = await storage.getByFbId(fbId);
                if (!user) {
                    let [{value: email}] = profile.emails;
                    const [{value: avatar}] = profile.photos;
                    if (email === "") {
                        email = null;
                    }
                    const name = profile.displayName;
                    user = {
                        name,
                        email,
                        fb_id: fbId,
                        avatar,
                        role: "user",
                    };
                    const id = await storage.create(user);
                    await settingsStorage.create({user_id: id[0]});
                    user = await storage.getByFbId(fbId);
                }
                return done(null, user);
            }
        )
    );

    passport.use(
        "googleToken",
        new GoogleTokenStrategy(
            {
                clientID: googleEnv.clientID,
                clientSecret: googleEnv.clientSecret,
            },
            async (accessToken, refreshToken, profile, done) => {
                const [{value: email}] = profile.emails;
                let user = await storage.getByEmail(email);
                if (!user) {
                    const name = profile.displayName;
                    const avatar = profile._json.picture;
                    user = {
                        name,
                        email,
                        avatar,
                        role: "user",
                    };
                    const id = await storage.create(user);
                    await settingsStorage.create({user_id: id[0]});
                    user = await storage.getByEmail(email);
                }
                return done(null, user);
            }
        )
    );
};
