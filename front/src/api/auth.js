import apiClient from '../config/axios';

export const googleAuth = async (data) => {
    return apiClient.post('/auth/google', data);
}

export const facebookAuth = async (data) => {
    return apiClient.post('/auth/facebook', data);
}

export const auth = async (data) => {
    return apiClient.post('/auth', data);
}

export const apiLogout = async (data) => {
    return apiClient.post('/auth/logout', data);
}

