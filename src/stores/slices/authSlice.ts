import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export  type AuthState = {
    isAuthenticated: boolean; // Переменная для хранения статуса аутентификации
    successMessage: string;
}

const initialState: AuthState = {
    isAuthenticated: false, // Изначальное состояние: пользователь не аутентифицирован
    successMessage: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Экшен для установки isAuthenticated = true (вход в систему)
        login: (state) => {
            state.isAuthenticated = true;
        },
        // Экшен для установки isAuthenticated = false (выход из системы)
        logout: (state) => {
            state.isAuthenticated = false;
        },
        // Экшен для произвольного изменения состояния
        setAuthenticated: (state, action: { payload: boolean }) => {
            state.isAuthenticated = action.payload;
        },
        // Экшен для установки сообщения об успешной смене пароля
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        // Экшен для очистки сообщения
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
    },
});

export const { login, logout, setAuthenticated, setSuccessMessage, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
