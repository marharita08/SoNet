import apiClient from '../config/axios';

export const getArticles = async () => {
    return apiClient.get('/articles');
}

export const getArticle = async (id) => {
    return apiClient.get(`/articles/${id}`);
}

export const insertArticle = async (article) => {
    return apiClient.post('/articles', article, {
        headers: {
            "Content-Type": "multipart/form-data",
            "File-Destination": "article",
        },
    });
}

export const updateArticle = async (article) => {
    return apiClient.put(`/articles/${article.get('article_id')}`, article, {
        headers: {
            "Content-Type": "multipart/form-data",
            "File-Destination": "article",
        },
    });
}

export const deleteArticle = async (id) => {
    return apiClient.delete(`/articles/${id}`);
}

export const getComments = async (id) => {
    return apiClient.get(`/articles/${id}/comments`);
}

export const getCommentsAmount = async (id) => {
    return apiClient.get(`/articles/${id}/comments-count`);
}

export const getLikes = async (id) => {
    return apiClient.get(`/articles/${id}/likes`);
}

export const getLikesAmount = async (id) => {
    return apiClient.get(`/articles/${id}/likes-count`);
}

export const getNews = async (page, limit) => {
    return apiClient.get(`/articles/news?page=${page}&limit=${limit}`);
}

export const getAllNews = async (page, limit) => {
    return apiClient.get(`/articles/all-news?page=${page}&limit=${limit}`);
}

export const getCountOfNews = async () => {
    return apiClient.get(`/articles/news/amount`);
}

export const getCountOfAllNews = async () => {
    return apiClient.get(`/articles/all-news/amount`);
}

