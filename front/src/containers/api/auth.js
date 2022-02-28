import { apiClient } from '../../config/axios';

export const googleAuth = async (data) => {
    return apiClient.post('/auth/google', data);
}
