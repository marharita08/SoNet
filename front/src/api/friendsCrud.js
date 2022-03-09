import apiClient from '../config/axios';

export const insertRequest = async (friends) => {
    return apiClient.post('/friends', friends);
}

export const acceptRequest = async (friends) => {
    return apiClient.put('/friends/accept', friends);
}

export const declineRequest = async (friends) => {
    return apiClient.put('/friends/decline', friends);
}

export const deleteRequest = async (friends) => {
    return apiClient.delete(`/friends/${friends.current_user_id}/${friends.user_id}`);
}

export const getStatus = async (friends) => {
    return apiClient.get(`/friends/status/${friends.current_user_id}/${friends.user_id}`);
}
