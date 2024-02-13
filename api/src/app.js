const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const config = require("./configs/config");
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const likesRoutes = require("./routes/likes");
const commentsRoutes = require("./routes/comments");
const universitiesRoutes = require("./routes/universities");
const visibilitiesRoutes = require("./routes/visibilities");
const authRoutes = require("./routes/auth");
const friendsRoutes = require("./routes/friends");
const passwordRoutes = require("./routes/password");
const generatorRoutes = require("./routes/testDataGenerator");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const hostPort = config.appHostPort;
const containerPort = config.appContainerPort;

const app = express();

require("./configs/passportConfig")(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(`public`));
app.use(logger);
app.use(passport.initialize());

app.use("/users", usersRoutes);
app.use("/articles", articlesRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", commentsRoutes);
app.use("/universities", universitiesRoutes);
app.use("/visibilities", visibilitiesRoutes);
app.use("/auth", authRoutes);
app.use("/friends", friendsRoutes);
app.use("/password", passwordRoutes);
app.use("/generate", generatorRoutes);

app.use(errorHandler);

app.listen(containerPort, () => {
    console.log(`Example app listening at http://localhost:${hostPort}`);
});
