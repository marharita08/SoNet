const updateArticle = (articles, updatedArticle) => {
    const newArticles = [...articles];
    const index = newArticles.findIndex((obj => obj.article_id === updatedArticle.article_id));
    newArticles[index] = updatedArticle;
    return newArticles;
}

const addArticle = (articles, newArticle) => {
    return [newArticle, ...articles];
}

const deleteArticle = (articles, id) => {
    return articles.filter((obj => obj.article_id !== id));
}

export default {
    updateArticle,
    addArticle,
    deleteArticle
}
