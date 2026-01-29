import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import type { AuthState, User } from './authTypes';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    profileId: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setProfileId: (state, action: PayloadAction<number | null>) => {
            state.profileId = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.profileId = null;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload.user;
            state.error = null;
        });

        builder.addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message || 'Ошибка входа';
            state.isAuthenticated = false;
        });

        builder.addMatcher(authApi.endpoints.confirmEmail.matchFulfilled, (state, { payload }) => {
            if (payload) {
                state.isAuthenticated = true;
                state.user = payload.user;
                state.profileId = payload.profileId;
            }
            state.loading = false;
        });
    },
});

export const { setUser, setProfileId, logout, setError } = authSlice.actions;
export default authSlice.reducer;
