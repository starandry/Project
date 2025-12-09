import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PROFILE_STORAGE_KEY } from '@/constants/storageKeys';

export type UserProfile = {
    name: string;
    email: string;
    phone: string;
};

export type UserState = UserProfile & {};

const savedUser = localStorage.getItem(PROFILE_STORAGE_KEY);
const parsedUser = savedUser ? JSON.parse(savedUser) : {};

const initialState: UserState = {
    name: parsedUser.name || 'Маргарита Чернышова',
    email: parsedUser.email || 'margarita.chernushova@gmail.com',
    phone: parsedUser.phone || '89-990-078',
};

const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        updateProfile(state, action: PayloadAction<UserProfile>) {
            const { name, email, phone } = action.payload;

            state.name = name;
            state.email = email;
            state.phone = phone;

            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ name, email, phone }));
        },
    },
});

export const { updateProfile } = masterSlice.actions;

export default masterSlice.reducer;
