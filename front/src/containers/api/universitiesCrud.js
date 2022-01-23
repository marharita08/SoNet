import { apiClient } from '../../config/axios';

export const getUniversities = async () => {
    return apiClient.get('/universities');
}
