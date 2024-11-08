import { configureStore } from '@reduxjs/toolkit';
import pathsReducer from './slices/pathSlice.ts';
import moviesReducer from './slices/moviesSlice';

export const store = configureStore({
    reducer: {
        paths: pathsReducer,
        movies: moviesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;