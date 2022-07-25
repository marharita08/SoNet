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

export const getRequest = async (friends) => {
    return apiClient.get(`/friends/${friends.current_user_id}/${friends.user_id}`);
}
