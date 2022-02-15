import { apiClient } from '../../config/axios';

export const getUser = async (id) => {
    return apiClient.get(`/users/${id}`);
}

export const getUsers = async () => {
    return apiClient.get('/users');
}

export const updateUser = async (formData) => {
    return apiClient.put(`/users/${formData.get('user_id')}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "File-Destination": "avatar",
        },
    });
}
