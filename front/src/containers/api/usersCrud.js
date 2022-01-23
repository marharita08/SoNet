import { apiClient } from '../../config/axios';

export const getUser = async (id) => {
    return apiClient.get(`/users/${id}`);
}

export const getUsers = async () => {
    return apiClient.get('/users');
}
