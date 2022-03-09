import apiClient from '../config/axios';

export const getArticleVisibilities = async () => {
    return apiClient.get('/visibilities/article');
}

export const getFieldVisibilities = async () => {
    return apiClient.get('/visibilities/field');
}
