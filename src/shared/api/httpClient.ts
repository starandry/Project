import axios, { AxiosHeaders } from 'axios';
import { API_BASE_URL } from '@/shared/config/env';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new AxiosHeaders(config.headers);
        headers.set('Authorization', `Bearer ${token}`);
        config.headers = headers;
    }
    return config;
});
