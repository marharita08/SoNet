import { apiClient } from '../../../config/axios';

export const getArticle = async (id) => {
    return apiClient.get('/articles/' + id);
}

export const getComments = async (id) => {
    return apiClient.get('/articles/' + id + '/comments');
}

