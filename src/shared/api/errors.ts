import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type ApiErrorPayload = Record<string, unknown> | string | null;

type ApiErrorFields = {
    message?: string;
    detail?: string;
    error?: string;
    email?: unknown;
    username?: unknown;
};

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === 'object' && error != null && 'status' in error;
};

export const isSerializedError = (error: unknown): error is SerializedError => {
    return typeof error === 'object' && error != null && 'message' in error;
};

export const getApiErrorData = <T = ApiErrorPayload>(error: unknown): T | null => {
    if (isFetchBaseQueryError(error) && 'data' in error) {
        return error.data as T;
    }
    return null;
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
    if (isFetchBaseQueryError(error)) {
        const data = error.data;

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

    if (isSerializedError(error) && error.message) {
        return error.message;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
};

export const getRegistrationErrorMessage = (error: unknown): string => {
    const data = getApiErrorData<ApiErrorFields>(error);

    if (data && typeof data === 'object') {
        if (data.email) return 'Данная почта уже используется.';
        if (data.username) return 'Данный логин уже существует.';
        if (typeof data.detail === 'string') return `Ошибка: ${data.detail}`;
        if (typeof data.message === 'string') return data.message;
    }

    return getApiErrorMessage(error, 'Ошибка регистрации. Попробуйте позже.');
};
