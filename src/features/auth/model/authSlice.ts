import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { activateLastUser, loginUser, registerUser } from '@/features/auth/api/authApi';
import { AuthState, User, LoginCredentials, RegisterCredentials } from './authTypes';

// --- Асинхронные экшены ---

export const login = createAsyncThunk<{ user: User }, LoginCredentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { user } = await loginUser(credentials);
            return { user };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('Ошибка авторизации');
            }
        }
    }
);

export const register = createAsyncThunk<
    { user: User; redirectUrl: string },
    RegisterCredentials,
    { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue, dispatch }) => {
    try {
        await registerUser(credentials);
        const result = await activateLastUser();

        if (!result) {
            return rejectWithValue('Не удалось получить данные пользователя');
        }

        // Сохраняем пользователя в Redux state
        dispatch(setUser(result.user));

        return { user: result.user, redirectUrl: result.redirectUrl };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue('Ошибка регистрации');
        }
    }
});

export const logout = createAsyncThunk('auth/logout', async () => undefined);

// --- Начальное состояние ---

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

// --- Slice ---

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        // LOGIN
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Ошибка входа';
            state.isAuthenticated = false;
        });

        // REGISTER
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            register.fulfilled,
            (state, action: PayloadAction<{ user: User; redirectUrl: string }>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            }
        );
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Ошибка регистрации';
            state.isAuthenticated = false;
        });

        // LOGOUT
        builder.addCase(logout.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
        });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
