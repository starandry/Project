import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PROFILE_STORAGE_KEY, SERVICES_STORAGE_KEY } from '@/constants/storageKeys';

export type ServiceItem = {
    title: string;
    description: string;
    price: string;
};

export type UserProfile = {
    name: string;
    email: string;
    phone: string;
};

export type UserState = UserProfile & {
    services: ServiceItem[];
};

const defaultServices: ServiceItem[] = [
    {
        title: 'тип услуги',
        description: 'описание услуги',
        price: '100',
    },
];

const getInitialServices = (): ServiceItem[] => {
    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(defaultServices));
        return defaultServices;
    }

    try {
        const parsed = JSON.parse(stored);
        if (
            Array.isArray(parsed) &&
            parsed.every(
                (item) =>
                    typeof item === 'object' &&
                    item !== null &&
                    'title' in item &&
                    'description' in item &&
                    'price' in item
            )
        ) {
            return parsed.map((item) => ({
                title: item.title ?? '',
                description: item.description ?? '',
                price: item.price ?? '',
            }));
        }
        return [];
    } catch (error) {
        console.error('Invalid services JSON in localStorage:', error);
        return [];
    }
};

const savedUser = localStorage.getItem(PROFILE_STORAGE_KEY);
const parsedUser = savedUser ? JSON.parse(savedUser) : {};

const initialState: UserState = {
    name: parsedUser.name || 'Маргарита Чернышова',
    email: parsedUser.email || 'margarita.chernushova@gmail.com',
    phone: parsedUser.phone || '89-990-078',
    services: getInitialServices(),
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

        updateServices(state, action: PayloadAction<ServiceItem[]>) {
            state.services = action.payload;
            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(action.payload));
        },
    },
});

export const { updateProfile, updateServices } = masterSlice.actions;

export default masterSlice.reducer;
