module.exports = {
  appPort: process.env.APP_PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
  clientID: process.env.GOOGLE_API_CLIENT_ID,
  clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  appKey: process.env.APP_KEY,
  salt: process.env.HASH_SALT,
};
