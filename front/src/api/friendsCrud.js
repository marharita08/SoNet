import apiClient from '../config/axios';

export const insertRequest = async (friends) => {
    return apiClient.post('/friends', friends);
}

export const updateRequest = async (friends) => {
    return apiClient.put(`/friends/${friends.request_id}`, friends);
}

export const deleteRequest = async (id) => {
    return apiClient.delete(`/friends/${id}`);
}

export const getRequest = async (user_id) => {
    return apiClient.get(`/friends/request/${user_id}`);
}
