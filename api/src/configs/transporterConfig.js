const nodemailer = require("nodemailer");
const config = require("./config");

const {smtpAuth, smtpService} = config;

module.exports = nodemailer.createTransport({
    service: smtpService,
    auth: {
        user: smtpAuth.user,
        pass: smtpAuth.pass,
    },
});
