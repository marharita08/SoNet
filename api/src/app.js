const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config');
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');
const articleLikesRoutes = require('./routes/articleLikes');
const commentsRoutes = require('./routes/comments');
const commentLikesRoutes = require('./routes/commentLikes');
const universitiesRoutes = require('./routes/universities');
const visibilitiesRoutes = require('./routes/visibilities');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(`public`));

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/articleLikes', articleLikesRoutes);
app.use('/comments', commentsRoutes);
app.use('/commentLikes', commentLikesRoutes);
app.use('/universities', universitiesRoutes);
app.use('/visibilities', visibilitiesRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
