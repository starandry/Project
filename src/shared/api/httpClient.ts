import axios from 'axios';
import { API_BASE_URL } from '@/shared/config/env';

const AUTH_HEADER = 'Authorization';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

export const setAuthHeader = (token: string): void => {
    apiClient.defaults.headers.common[AUTH_HEADER] = `Token ${token}`;
};

export const clearAuthHeader = (): void => {
    delete apiClient.defaults.headers.common[AUTH_HEADER];
};
