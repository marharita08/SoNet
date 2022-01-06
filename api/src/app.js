const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config');
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');
const articleLikesRoutes = require('./routes/articleLikes');
const commentsRoutes = require('./routes/comments');
const commentLikesRoutes = require('./routes/commentLikes');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/articleLikes', articleLikesRoutes);
app.use('/comments', commentsRoutes);
app.use('/commentLikes', commentLikesRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
