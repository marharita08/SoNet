import apiClient from '../config/axios';

export const insertLike = async (like) => {
    return apiClient.post(`/likes`, like);
}

export const deleteLike = async (like) => {
    return apiClient.delete(`/likes/${like.article_id}/${like.user_id}`);
}

export const getIsLiked = async (articleId) => {
    return apiClient.get(`/likes/${articleId}/is-liked`);
}
