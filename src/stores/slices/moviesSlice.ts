import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, Movie, fetchHighRatedMovies } from '../../services/movieService.ts';

export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetchMovies',
    async (page: number) => {
        return await fetchMovies(page);
    }
);

export const loadMoreMoviesAsync = createAsyncThunk(
    'movies/loadMoreMovies',
    async (page: number) => {
        return await fetchMovies(page);
    }
);

export const fetchHighRatedMoviesAsync = createAsyncThunk(
    'movies/fetchHighRatedMovies',
    async ({ page, minRating }: { page: number; minRating: number }) => {
        return await fetchHighRatedMovies(page, minRating);
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [] as Movie[],
        loading: false,
        error: null as string | null,
        page: 1,
    },
    reducers: {
        incrementPage(state) {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.page = 1;
                state.movies = [...action.payload];
            })
            .addCase(fetchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы';
            })
            .addCase(loadMoreMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMoreMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = [...state.movies, ...action.payload];
            })
            .addCase(loadMoreMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы';
            })
            .addCase(fetchHighRatedMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHighRatedMoviesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.page = 1;
                state.movies = [...action.payload];
            })
            .addCase(fetchHighRatedMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы с высоким рейтингом';
            });
    },
});

export const { incrementPage } = moviesSlice.actions;
export default moviesSlice.reducer;
