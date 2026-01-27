import { LoginCredentials, RegisterCredentials, User } from '@/features/auth';
import { PUBLIC_BASE_URL } from '@/shared/config/env';
import { apiClient } from '@/shared/api/httpClient';
import { getApiErrorData, getApiErrorMessage } from '@/shared/api/errors';

type AuthResponse = { user: User };
type RegisterResponse = { detail: string };

// --- Авторизация ---
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'Ошибка входа'));
    }
};

// --- Регистрация ---
export const registerUser = async (credentials: RegisterCredentials): Promise<void> => {
    try {
        await apiClient.post<RegisterResponse>('/registration/', credentials);
    } catch (error) {
        const data = getApiErrorData<Record<string, unknown>>(error);
        let message = 'Ошибка регистрации. Попробуйте позже.';

        if (data && typeof data === 'object') {
            const fields = data as {
                email?: unknown;
                username?: unknown;
                detail?: unknown;
                message?: unknown;
            };

            if (fields.email) {
                message = 'Данная почта уже используется.';
            } else if (fields.username) {
                message = 'Данный логин уже существует.';
            } else if (typeof fields.detail === 'string') {
                message = `Ошибка: ${fields.detail}`;
            } else if (typeof fields.message === 'string') {
                message = fields.message;
            }
        } else {
            message = getApiErrorMessage(error, message);
        }

        throw new Error(message);
    }
};

export const activateLastUser = async (): Promise<{ user: User; redirectUrl: string } | null> => {
    try {
        const key = await getActivationKey();
        return await confirmEmailByKey(key);
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'Не удалось активировать пользователя'));
    }
};

const getActivationKey = async (): Promise<string> => {
    const response = await apiClient.get<string>('/activation_link/', {
        responseType: 'text',
    });
    const html = response.data;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const link = doc.querySelector('a')?.href;

    if (!link) {
        throw new Error('Не удалось найти ссылку активации');
    }

    const url = new URL(link);
    const key = url.searchParams.get('key');

    if (!key) {
        throw new Error('Не удалось получить ключ активации');
    }

    return key;
};

const confirmEmailByKey = async (
    key: string
): Promise<{ user: User; redirectUrl: string } | null> => {
    try {
        const response = await apiClient.post<{ redirect?: string; user?: User }>(
            '/registration/account-confirm-email/',
            { key }
        );
        let redirectUrl = response.data?.redirect;

        if (redirectUrl) {
            try {
                const incomingUrl = new URL(redirectUrl);
                const base = new URL(PUBLIC_BASE_URL);

                incomingUrl.protocol = base.protocol;
                incomingUrl.host = base.host;

                redirectUrl = incomingUrl.toString();
            } catch {
                if (!redirectUrl.startsWith('http')) {
                    redirectUrl = `${PUBLIC_BASE_URL}${
                        redirectUrl.startsWith('/') ? '' : '/'
                    }${redirectUrl}`;
                } else {
                    redirectUrl = PUBLIC_BASE_URL;
                }
            }
        } else {
            redirectUrl = PUBLIC_BASE_URL;
        }

        if (!response.data?.user) {
            return null;
        }

        return {
            user: response.data.user,
            redirectUrl,
        };
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'Не удалось подтвердить email'));
    }
};
