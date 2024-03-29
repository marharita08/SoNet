module.exports = {
  appHostPort: process.env.APP_HOST_PORT,
  appContainerPort: process.env.APP_CONTAINER_PORT,
  appUrl: process.env.APP_URL,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  dbHostPort: process.env.DB_HOST_PORT,
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
  smtpService: process.env.SMTP_SERVICE,
  smtpAuth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
  mailFrom: process.env.MAIL_FROM,
  frontUrl: process.env.FRONT_URL,
  recommendationSystemUrl: process.env.RECOMMENDATION_SYSTEM_URL
};
