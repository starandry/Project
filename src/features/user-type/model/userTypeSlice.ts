import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = 'master' | 'client';

type UserTypeState = {
    userType: UserType;
};

const initialState: UserTypeState = {
    userType: (localStorage.getItem('userType') as UserType) || 'master',
};

const userTypeSlice = createSlice({
    name: 'userType',
    initialState,
    reducers: {
        setUserType(state, action: PayloadAction<UserType>) {
            state.userType = action.payload;
            localStorage.setItem('userType', action.payload);
        },
    },
});

export const { setUserType } = userTypeSlice.actions;
export default userTypeSlice.reducer;
