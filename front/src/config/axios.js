import axios from 'axios';
import env from "./envConfig";

export const apiClient = axios.create(
    {
        baseURL: env.apiUrl,
        responseType: 'json'
    }
);
