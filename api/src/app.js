const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config');
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');
const likesRoutes = require('./routes/likes');
const commentsRoutes = require('./routes/comments');
const universitiesRoutes = require('./routes/universities');
const visibilitiesRoutes = require('./routes/visibilities');
const authRoutes = require('./routes/auth');
const friendsRoutes = require('./routes/friends');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(`public`));
app.use(logger('logger'));

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/likes', likesRoutes);
app.use('/comments', commentsRoutes);
app.use('/universities', universitiesRoutes);
app.use('/visibilities', visibilitiesRoutes);
app.use('/auth', authRoutes);
app.use('/friends', friendsRoutes);

app.use(errorHandler('logger'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
