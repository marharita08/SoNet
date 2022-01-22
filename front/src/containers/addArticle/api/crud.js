import { apiClient } from '../../../config/axios';

export const getVisibilities = async () => {
    return apiClient.get('/visibilities/article');
}
