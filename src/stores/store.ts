import { configureStore } from '@reduxjs/toolkit';
import pathsReducer from './slices/pathSlice.ts';

export const store = configureStore({
    reducer: {
        paths: pathsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;