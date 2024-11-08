import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, Movie } from '../../services/movieService.ts';

export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetchMovies',
    async (page: number) => {
        return await fetchMovies(page);
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
                state.movies = [...state.movies, ...action.payload]; //  новые фильмы к уже загруженным
            })
            .addCase(fetchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить фильмы';
            });
    },
});

export const { incrementPage } = moviesSlice.actions;
export default moviesSlice.reducer;
