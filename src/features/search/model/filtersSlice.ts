import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FiltersState = {
    district: string | null;
    specialty: string | null;
    searchTriggered: boolean;
};

const initialState: FiltersState = {
    district: null,
    specialty: null,
    searchTriggered: false,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDistrict: (state, action: PayloadAction<string | null>) => {
            state.district = action.payload;
        },
        setSpecialty: (state, action: PayloadAction<string | null>) => {
            state.specialty = action.payload;
        },
        setSearchTriggered: (state, action: PayloadAction<boolean>) => {
            state.searchTriggered = action.payload;
        },
    },
});

export const { setDistrict, setSpecialty, setSearchTriggered } = filtersSlice.actions;
export default filtersSlice.reducer;
