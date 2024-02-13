const handlebars = require("express-handlebars");

module.exports = handlebars.create({
  extname: ".handlebars",
  layoutsDir: "views/",
  defaultLayout: false,
});
