export { setUser, setProfileId, logout, setError } from './model/authSlice';
export { default as authReducer } from './model/authSlice';

export {
    useLoginMutation,
    useRegisterMutation,
    useGetActivationLinkMutation,
    useConfirmEmailMutation,
    parseActivationKeyFromHtml,
} from './api/authApi';

export type {
    ActivationResult,
    AuthState,
    LoginCredentials,
    RegisterCredentials,
    User,
} from './model/authTypes';
