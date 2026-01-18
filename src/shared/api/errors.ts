import { isAxiosError } from 'axios';

type ApiErrorPayload = Record<string, unknown> | string | null;

type ApiErrorFields = {
    message?: string;
    detail?: string;
    error?: string;
};

export const getApiErrorData = <T = ApiErrorPayload>(error: unknown): T | null => {
    if (isAxiosError(error)) {
        return (error.response?.data as T) ?? null;
    }
    return null;
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === 'string' && data.trim()) {
            return data;
        }
        if (data && typeof data === 'object') {
            const fields = data as ApiErrorFields;
            if (fields.message) return fields.message;
            if (fields.detail) return fields.detail;
            if (fields.error) return fields.error;
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
};
