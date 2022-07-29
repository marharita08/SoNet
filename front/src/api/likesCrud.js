import apiClient from '../config/axios';

export const insertLike = async (like) => {
    return apiClient.post(`/likes`, like);
}

export const deleteLike = async (article_id) => {
    return apiClient.delete(`/likes/article/${article_id}`);
}

export const getIsLiked = async (articleId) => {
    return apiClient.get(`/likes/${articleId}/is-liked`);
}
