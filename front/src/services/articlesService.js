const updateArticle = (articles, updatedArticle) => {
    const newArticles = [...articles];
    const index = newArticles.findIndex((obj => obj.article_id === updatedArticle.article_id));
    newArticles[index] = updatedArticle;
    return newArticles;
}

const addArticle = (articles, newArticle) => {
    let newArticles = [...articles, newArticle];
    newArticles.sort((a, b) => {
        const aid = a.article_id, bid = b.article_id;
        if (aid > bid) {
            return -1;
        }
        if (aid < bid) {
            return 1;
        }
        return 0;
    });
    return newArticles;
}

const deleteArticle = (articles, id) => {
    return articles.filter((obj => obj.article_id !== id));
}

export default {
    updateArticle,
    addArticle,
    deleteArticle
}
