const parseArticle = (article) => {
  const {visibility, visibility_id: visibilityId, ...rest} = article;
  return {
    ...rest,
    visibility: {
      value: visibilityId,
      label: visibility,
    }
  };
};

const parseArticles = (articles) => {
  const result = [];
  Object.keys(articles).forEach((key) => {
    result.push(parseArticle(articles[key]));
  });
  return result;
};

module.exports = {parseArticles, parseArticle};
