import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { API_BASE_URL } from '@/shared/config/env';
import type { RootState } from '@/app/providers';

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: 15000,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Content-Type', 'application/json');

        const token = (getState() as RootState).auth.token;
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
