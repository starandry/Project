import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PathsState {
    value: string;
}

const initialState: PathsState = {
    value: '/',
}

const pathsSlice = createSlice({
    name: 'paths',
    initialState,
    reducers: {
        addPoints: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { addPoints } = pathsSlice.actions;
export default pathsSlice.reducer;