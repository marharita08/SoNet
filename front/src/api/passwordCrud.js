import apiClient from "../config/axios";

export const resetPassword = async (data) => {
    return apiClient.post('/password/reset', data);
}

export const savePassword = async (data) => {
    return apiClient.post('/password/save', data);
}
