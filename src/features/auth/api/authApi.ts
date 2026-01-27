import { ActivationResult, LoginCredentials, RegisterCredentials, User } from '@/features/auth';
import { PUBLIC_BASE_URL } from '@/shared/config/env';
import { apiClient, setAuthHeader } from '@/shared/api/httpClient';
import { getApiErrorData, getApiErrorMessage } from '@/shared/api/errors';

type AuthTokenResponse = { user?: User; token?: string; key?: string; auth_token?: string };
type RegisterResponse = { detail: string };

const buildActivationResult = (user: User, redirectUrl: string, token: string | null) => ({
    user,
    redirectUrl,
    profileId: getProfileIdFromRedirect(redirectUrl),
    token,
});

// --- Авторизация ---
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User }> => {
    try {
        const response = await apiClient.post<AuthTokenResponse>('/login', credentials);
        if (!response.data.user) {
            throw new Error('Не удалось получить данные пользователя.');
        }
        return { user: response.data.user };
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

export const activateLastUser = async (): Promise<ActivationResult | null> => {
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

const confirmEmailByKey = async (key: string): Promise<ActivationResult | null> => {
    try {
        const response = await apiClient.post<AuthTokenResponse & { redirect?: string }>(
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

        const token = response.data.token ?? response.data.key ?? response.data.auth_token ?? null;

        if (token && typeof token === 'string') {
            setAuthHeader(token);
        }

        return buildActivationResult(
            response.data.user,
            redirectUrl,
            typeof token === 'string' ? token : null
        );
    } catch (error) {
        throw new Error(getApiErrorMessage(error, 'Не удалось подтвердить email'));
    }
};

const extractProfileId = (value: string): number | null => {
    if (!value) {
        return null;
    }

    const normalized = value.startsWith('/') ? value : `/${value}`;
    const regex = /\/(\d+)(?=\/|$)/g;
    let match: RegExpExecArray | null = null;
    let lastId: number | null = null;

    while ((match = regex.exec(normalized)) !== null) {
        lastId = Number(match[1]);
    }

    return Number.isFinite(lastId) ? lastId : null;
};

const getProfileIdFromRedirect = (redirectUrl: string): number | null => {
    if (!redirectUrl) {
        return null;
    }

    const normalizedUrl = redirectUrl.startsWith('http')
        ? redirectUrl
        : `${PUBLIC_BASE_URL}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;

    try {
        const url = new URL(normalizedUrl);
        const fromPath = extractProfileId(url.pathname);
        if (fromPath) {
            return fromPath;
        }

        const hashValue = url.hash.replace(/^#/, '');
        const fromHash = extractProfileId(hashValue);
        if (fromHash) {
            return fromHash;
        }

        const fromQuery = url.searchParams.get('profileId') || url.searchParams.get('id');
        if (fromQuery && /^\d+$/.test(fromQuery)) {
            return Number(fromQuery);
        }

        return null;
    } catch {
        return null;
    }
};
