import { apiClient } from '../../config/axios';

export const getUser = async (id) => {
    return apiClient.get(`/users/${id}`);
}

export const getUsers = async () => {
    return apiClient.get('/users');
}

export const updateUser = async (user) => {
    return apiClient.put(`/users/${user.user_id}`, user, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
