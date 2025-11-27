import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    EXPERIENCE_STORAGE_KEY,
    PROFILE_STORAGE_KEY,
    ADDRESS_STORAGE_KEY,
    SERVICES_STORAGE_KEY,
} from '@/constants/storageKeys';

export type ExperienceItem = {
    title: string;
    yearStart: string;
    yearEnd: string;
};

export type AddressState = {
    address: string;
    region: string;
};

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
    experience: ExperienceItem[][];
    addressData: AddressState[];
    services: ServiceItem[];
};

const defaultExperience: ExperienceItem[][] = [
    [
        {
            title: 'Заполните опыт работы',
            yearStart: 'ГГГГ',
            yearEnd: 'ГГГГ',
        },
    ],
    [
        {
            title: 'Пэрис нэйл, курс «Комбинированный + аппаратный маникюр. Уровень 1»',
            yearStart: '2022',
            yearEnd: '2023',
        },
    ],
];

export const defaultAddressState: AddressState[] = [
    {
        address: 'Введите адрес проведения услуги',
        region: 'Центральный район',
    },
];

const defaultServices: ServiceItem[] = [
    {
        title: 'тип услуги',
        description: 'описание услуги',
        price: '100',
    },
];

const getInitialExperience = (): ExperienceItem[][] => {
    const stored = localStorage.getItem(EXPERIENCE_STORAGE_KEY);

    if (!stored) {
        localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(defaultExperience));
        return defaultExperience;
    }

    try {
        const parsed = JSON.parse(stored);

        if (
            Array.isArray(parsed) &&
            parsed.every(
                (inner: unknown) =>
                    Array.isArray(inner) &&
                    inner.every(
                        (item: unknown) =>
                            typeof item === 'object' &&
                            item !== null &&
                            'title' in item &&
                            'yearStart' in item &&
                            'yearEnd' in item
                    )
            )
        ) {
            return (parsed as ExperienceItem[][]).map((subArray) =>
                subArray.map((item) => ({
                    title: item.title ?? '',
                    yearStart: item.yearStart ?? '',
                    yearEnd: item.yearEnd ?? '',
                }))
            );
        }

        return [[], []];
    } catch (e) {
        console.error('Failed to parse experience:', e);
        return [[], []];
    }
};

const getInitialAddress = (): AddressState[] => {
    const stored = localStorage.getItem(ADDRESS_STORAGE_KEY);

    if (!stored) {
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(defaultAddressState));
        return defaultAddressState;
    }

    try {
        const parsed = JSON.parse(stored);
        if (
            Array.isArray(parsed) &&
            parsed.every(
                (item) =>
                    typeof item === 'object' &&
                    item !== null &&
                    'address' in item &&
                    'region' in item
            )
        ) {
            return parsed.map((item) => ({
                address: item.address ?? '',
                region: item.region ?? '',
            }));
        }

        return [];
    } catch (error) {
        console.error('Invalid address JSON in localStorage:', error);
        return [];
    }
};

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
    experience: getInitialExperience(),
    addressData: getInitialAddress(),
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

        updateExperience(state, action: PayloadAction<ExperienceItem[][]>) {
            state.experience = action.payload;
            localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(action.payload));
        },

        updateAddress(state, action: PayloadAction<AddressState[]>) {
            state.addressData = action.payload;
            localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(action.payload));
        },

        updateServices(state, action: PayloadAction<ServiceItem[]>) {
            state.services = action.payload;
            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(action.payload));
        },
    },
});

export const { updateProfile, updateExperience, updateAddress, updateServices } =
    masterSlice.actions;

export default masterSlice.reducer;
