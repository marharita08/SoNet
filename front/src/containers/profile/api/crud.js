import { apiClient } from '../../../config/axios';

export const getUser = async (id) => {
    return apiClient.get('/users/' + id);
}

export const getUsers = async () => {
    return apiClient.get('/users');
}

export const getUniversities = async () => {
    return apiClient.get('/universities');
}

export const getVisibilities = async () => {
    return apiClient.get('/visibilities/field');
}
