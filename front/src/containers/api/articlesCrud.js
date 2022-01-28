import { apiClient } from '../../config/axios';

export const getArticles = async () => {
    return apiClient.get('/articles');
}

export const getArticle = async (id) => {
    return apiClient.get(`/articles/${id}`);
}

export const getComments = async (id) => {
    return apiClient.get(`/articles/${id}/comments`);
}

export const insertArticle = async (article) => {
    return apiClient.post('/articles', article);
}

export const updateArticle = async (article) => {
    return apiClient.put(`/articles/${article.article_id}`, article);
}
