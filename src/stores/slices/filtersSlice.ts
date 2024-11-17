import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    movieName: string;
    genres: string[];
    yearFrom: string;
    yearTo: string;
    ratingFrom: string;
    ratingTo: string;
    country: string;
    sortBy: 'Rating' | 'Year' | null;
}

const initialState: FiltersState = {
    movieName: '',
    genres: ['Adventure', 'Drama', 'Documental', 'Thriller'], // начальные жанры
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
    country: '',
    sortBy: 'Rating',
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
        },
    },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
