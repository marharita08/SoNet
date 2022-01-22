import { apiClient } from '../../../config/axios';

export const getArticles = async () => {
    return apiClient.get('/articles');
}

