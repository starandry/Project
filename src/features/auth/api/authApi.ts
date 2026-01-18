import { LoginCredentials, RegisterCredentials, User } from '../model/authTypes';
import { API_BASE_URL, PUBLIC_BASE_URL } from '@/shared/config/env';

// --- Авторизация ---
export const loginUser = async (
    credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка входа');
    }

    return await response.json(); // ожидаем { user, token }
};

// --- Регистрация ---
export const registerUser = async (
    credentials: RegisterCredentials
): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_BASE_URL}/registration/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        let message = 'Ошибка регистрации. Попробуйте позже.';

        if (data.email) {
            message = 'Данная почта уже используется.';
        } else if (data.username) {
            message = 'Данный логин уже существует.';
        } else if (data.detail) {
            message = 'Ошибка: ' + data.detail;
        }

        throw new Error(message);
    }

    return data;
};

export const activateLastUser = async () => {
    const key = await getActivationKey();
    await confirmEmailByKey(key);
};

const getActivationKey = async (): Promise<string> => {
    const res = await fetch(`${API_BASE_URL}/activation_link/`);
    const html = await res.text();

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

const confirmEmailByKey = async (key: string) => {
    const res = await fetch(`${API_BASE_URL}/registration/account-confirm-email/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    });

    if (!res.ok) {
        throw new Error('Не удалось подтвердить email');
    }

    const data = await res.json().catch(() => ({}));
    let redirectUrl = data.redirect;

    if (redirectUrl) {
        try {
            const incomingUrl = new URL(redirectUrl);
            const base = new URL(PUBLIC_BASE_URL);

            incomingUrl.protocol = base.protocol;
            incomingUrl.host = base.host;

            redirectUrl = incomingUrl.toString();
        } catch {
            if (!redirectUrl.startsWith('http')) {
                redirectUrl = `${PUBLIC_BASE_URL}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;
            } else {
                redirectUrl = PUBLIC_BASE_URL;
            }
        }
    } else {
        redirectUrl = PUBLIC_BASE_URL;
    }

    window.location.href = redirectUrl;
};
