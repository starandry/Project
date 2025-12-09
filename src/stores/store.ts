import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './slices/userTypeSlice';
import filtersReducer from './slices/filtersSlice.ts';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        userType: userTypeReducer,
        filters: filtersReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
