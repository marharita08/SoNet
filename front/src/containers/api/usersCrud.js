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

export const getFriends = async (id) => {
    return apiClient.get(`/users/${id}/friends`);
}

export const getIncomingRequests = async (id) => {
    return apiClient.get(`/users/${id}/incoming-requests`);
}

export const getOutgoingRequests = async (id) => {
    return apiClient.get(`/users/${id}/outgoing-requests`);
}
