module.exports = {
  appPort: process.env.APP_PORT,
  appUrl: process.env.APP_URL,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
  googleEnv: {
    clientID: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
  },
  facebookEnv: {
    clientID: process.env.FACEBOOK_API_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_API_CLIENT_SECRET,
  },
  appKey: process.env.APP_KEY,
  salt: process.env.HASH_SALT,
};
