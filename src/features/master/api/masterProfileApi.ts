import { baseApi } from '@/shared/api/baseApi';

export interface MasterProfile {
    id: number;
    user?: {
        id: number;
        username: string;
        email?: string;
    };
    name?: string;
    phone?: string;
    about?: string;
    education?: string;
    photo?: string;
}

export const masterProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMasterProfile: builder.query<MasterProfile, number>({
            query: (id) => `/master-profiles/${id}/`,
            providesTags: (result, error, id) => [{ type: 'MasterProfile', id }],
        }),
    }),
});

export const { useGetMasterProfileQuery } = masterProfileApi;
