import { baseApi } from '@/shared/api/baseApi';

export interface MasterProfile {
    id: number;
    user?: {
        id: number;
        username: string;
        email?: string;
        role?: string;
    };
    name?: string;
    phone?: string;
    about?: string;
    about_master?: string;
    education?: string;
    photo?: string;
}

export interface UpdateMasterProfileBody {
    user?: {
        username: string;
        email: string;
        role: string;
    };
    phone?: string;
    about?: string;
    about_master?: string;
    education?: string;
}

export const masterProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMasterProfile: builder.query<MasterProfile, number>({
            query: (id) => `/master-profiles/${id}/`,
            providesTags: (result, error, id) => [{ type: 'MasterProfile', id }],
        }),
        updateMasterProfile: builder.mutation<
            MasterProfile,
            { id: number; body: UpdateMasterProfileBody }
        >({
            query: ({ id, body }) => ({
                url: `/master-profiles/${id}/`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'MasterProfile', id }],
        }),
    }),
});

export const { useGetMasterProfileQuery, useUpdateMasterProfileMutation } = masterProfileApi;
