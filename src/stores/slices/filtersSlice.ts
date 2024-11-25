import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../../types';

const initialState: FiltersState = {
    movieName: '',
    genres: ['Adventure', 'Drama', 'Documental', 'Thriller'], // начальные жанры
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
    country: '',
    sortBy: 'Rating',
    showButtons: false,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<FiltersState>) {
            state.movieName = action.payload.movieName;
            state.genres = action.payload.genres;
            state.yearFrom = action.payload.yearFrom;
            state.yearTo = action.payload.yearTo;
            state.ratingFrom = action.payload.ratingFrom;
            state.ratingTo = action.payload.ratingTo;
            state.country = action.payload.country;
            state.sortBy = action.payload.sortBy;
            state.showButtons = action.payload.showButtons;
        },
        clearFilters(state) {
            // сброс фильтров до начальных значений
            state.movieName = '';
            state.genres = initialState.genres;
            state.yearFrom = '';
            state.yearTo = '';
            state.ratingFrom = '';
            state.ratingTo = '';
            state.country = '';
            state.sortBy = 'Rating';
            state.showButtons = false;
        },
    },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
