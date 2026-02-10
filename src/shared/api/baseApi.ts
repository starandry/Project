import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { API_BASE_URL } from '@/shared/config/env';

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: 15000,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('auth_token');
        console.log(token);
        if (token) headers.set('Authorization', 'Token ' + token);
        headers.set('Content-Type', 'application/json');
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers.set('Authorization', `Token ${token}`);
        }
        return headers;
    },
});

const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Auth', 'MasterProfile'],
    endpoints: () => ({}),
});
