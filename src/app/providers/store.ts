import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import authReducer from '@/features/auth/model/authSlice';
import filtersReducer from '@/features/search/model/filtersSlice';
import userTypeReducer from '@/features/user-type/model/userTypeSlice';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        userType: userTypeReducer,
        filters: filtersReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
