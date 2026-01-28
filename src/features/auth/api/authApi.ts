import { baseApi } from '@/shared/api/baseApi';
import { PUBLIC_BASE_URL } from '@/shared/config/env';
import type {
    User,
    LoginCredentials,
    RegisterCredentials,
    ActivationResult,
} from '@/features/auth';

type AuthTokenResponse = {
    user?: User;
    token?: string;
    key?: string;
    auth_token?: string;
};

type RegisterResponse = {
    detail: string;
};

type ConfirmEmailResponse = AuthTokenResponse & {
    redirect?: string;
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

const normalizeRedirectUrl = (redirectUrl: string | undefined): string => {
    if (!redirectUrl) return PUBLIC_BASE_URL;

    try {
        const incomingUrl = new URL(redirectUrl);
        const base = new URL(PUBLIC_BASE_URL);
        incomingUrl.protocol = base.protocol;
        incomingUrl.host = base.host;
        return incomingUrl.toString();
    } catch {
        if (!redirectUrl.startsWith('http')) {
            return `${PUBLIC_BASE_URL}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;
        }
        return PUBLIC_BASE_URL;
    }
};

export const parseActivationKeyFromHtml = (html: string): string => {
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

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ user: User }, LoginCredentials>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: AuthTokenResponse) => {
                if (!response.user) {
                    throw new Error('Не удалось получить данные пользователя.');
                }
                return { user: response.user };
            },
            invalidatesTags: ['Auth'],
        }),

        register: builder.mutation<RegisterResponse, RegisterCredentials>({
            query: (credentials) => ({
                url: '/registration/',
                method: 'POST',
                body: credentials,
            }),
        }),

        getActivationLink: builder.mutation<string, void>({
            query: () => ({
                url: '/activation_link/',
                method: 'GET',
                responseHandler: 'text',
            }),
        }),

        confirmEmail: builder.mutation<ActivationResult | null, { key: string }>({
            query: ({ key }) => ({
                url: '/registration/account-confirm-email/',
                method: 'POST',
                body: { key },
            }),
            transformResponse: (response: ConfirmEmailResponse): ActivationResult | null => {
                if (!response.user) return null;

                const redirectUrl = normalizeRedirectUrl(response.redirect);
                const token = response.token ?? response.key ?? response.auth_token ?? null;

                return {
                    user: response.user,
                    redirectUrl,
                    profileId: getProfileIdFromRedirect(redirectUrl),
                    token: typeof token === 'string' ? token : null,
                };
            },
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetActivationLinkMutation,
    useConfirmEmailMutation,
} = authApi;
