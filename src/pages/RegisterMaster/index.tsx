import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useRegisterMutation,
    useGetActivationLinkMutation,
    useConfirmEmailMutation,
    parseActivationKeyFromHtml,
} from '@/features/auth/api/authApi';
import { setToken } from '@/features/auth/model/authSlice';
import { getRegistrationErrorMessage } from '@/shared/api/errors';
import { getCookieValue } from '@/shared/lib';
import type { RegisterCredentials } from '@/features/auth';
import type { AppDispatch } from '@/app/providers';
import styles from './index.module.scss';
import EyeEmpty from '@/shared/assets/icons/EyeEmpty.svg?react';
import NavArrowDown from '@/shared/assets/icons/NavArrowDown.svg?react';
import NavArrowUp from '@/shared/assets/icons/NavArrowUp.svg?react';
import masterReg from '@/shared/assets/images/master-reg.png';
import {
    validateLogin,
    passwordValidator,
    validatePasswordConfirmation,
    validateEmail,
    useDropdown,
} from '@/shared/lib';
import { Button, Input, LinkButton, Picture, SvgIcon } from '@/shared/ui';

interface Errors {
    role: string;
    username: string;
    email: string;
    password1: string;
    password2: string;
    agreeToPersonalData?: string;
}

type RegisterFormState = Omit<RegisterCredentials, 'role'> & {
    role: RegisterCredentials['role'] | '';
};

const roleOptions: Array<{ value: RegisterCredentials['role']; label: string }> = [
    { value: 'master', label: 'Мастер' },
    { value: 'client', label: 'Клиент' },
];

const RegisterMaster: React.FC = () => {
    const [credentials, setCredentials] = useState<RegisterFormState>({
        role: '',
        username: '',
        email: '',
        password1: '',
        password2: '',
    });

    const [errors, setErrors] = useState<Errors>({
        role: '',
        username: '',
        email: '',
        password1: '',
        password2: '',
        agreeToPersonalData: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmationVisible, setPasswordConfirmationVisibile] = useState(false);
    const [agreeToPersonalData, setAgreeToPersonalData] = useState(false);

    const [loginError, setLoginError] = useState<string | null>(null);
    const [blurredField, setBlurredField] = useState<string | null>(null);
    const [validFields, setValidFields] = useState<string[]>([]);
    const [invalidFields, setInvalidFields] = useState<string[]>([]);

    const [iconClass, setIconClass] = useState({
        password1: '',
        password2: '',
    });
    const {
        open: isRoleMenuOpen,
        toggle: toggleRoleMenu,
        close: closeRoleMenu,
        ref: roleMenuRef,
    } = useDropdown<HTMLDivElement>();

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [registerMutation, { isLoading: isRegistering }] = useRegisterMutation();
    const [getActivationLink] = useGetActivationLinkMutation();
    const [confirmEmail] = useConfirmEmailMutation();

    const isLoading = isRegistering;

    useEffect(() => {
        if (blurredField === 'password1') {
            setIconClass((prev) => ({
                ...prev,
                password1: errors.password1 ? 'passwordErr' : 'passwordValid',
            }));
        }

        if (blurredField === 'password2') {
            setIconClass((prev) => ({
                ...prev,
                password2: errors.password2 ? 'passwordConfirmErr' : 'passwordConfirmValid',
            }));
        }
    }, [blurredField, errors.password1, errors.password2]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordConfirmationVisibility = () => {
        setPasswordConfirmationVisibile(!passwordConfirmationVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const setRoleValue = (value: RegisterCredentials['role']) => {
        setCredentials((prev) => ({ ...prev, role: value }));

        if (value) {
            setErrors((prev) => ({ ...prev, role: '' }));
        }
    };

    const handleRoleSelect = (value: RegisterCredentials['role']) => {
        setRoleValue(value);
        closeRoleMenu();
    };

    const handleAgreeChange = () => {
        const newValue = !agreeToPersonalData;
        setAgreeToPersonalData(newValue);

        if (newValue) {
            setErrors((prev) => ({ ...prev, agreeToPersonalData: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!credentials.role) {
            setErrors((prev) => ({
                ...prev,
                role: 'Выберите тип профиля.',
            }));
            return;
        }

        if (!agreeToPersonalData) {
            setErrors((prev) => ({
                ...prev,
                agreeToPersonalData:
                    'Необходимо подтвердить согласие на обработку персональных данных.',
            }));
            return;
        }

        setLoginError(
            errors.role ||
                errors.email ||
                errors.username ||
                errors.password1 ||
                errors.password2 ||
                errors.agreeToPersonalData
        );

        try {
            const submitCredentials: RegisterCredentials = {
                ...credentials,
                role: credentials.role,
            };

            await registerMutation(submitCredentials).unwrap();

            const html = await getActivationLink().unwrap();
            const key = parseActivationKeyFromHtml(html);

            const result = await confirmEmail({ key }).unwrap();

            if (!result) {
                setLoginError('Не удалось получить данные пользователя');
                return;
            }

            let token = result.token;
            if (!token) {
                token = getCookieValue('auth_token');
            }
            if (token) {
                dispatch(setToken(token));
            }

            if (result.redirectUrl) {
                const url = new URL(result.redirectUrl);
                navigate(url.pathname);
            }
        } catch (error) {
            setLoginError(getRegistrationErrorMessage(error));
        }
    };

    const getInputStyle = (name: string) => {
        if (invalidFields.includes(name)) {
            return {
                border: '2px solid #EE443F',
            };
        }

        if (validFields.includes(name)) {
            return {
                border: '2px solid #C5E9CD',
            };
        }

        return {
            border: '1.5px solid #ccc',
        };
    };

    const handleRoleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Escape') {
            closeRoleMenu();
            return;
        }

        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return;
        }

        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const currentIndex = roleOptions.findIndex((option) => option.value === credentials.role);
        if (currentIndex === -1) {
            const fallbackIndex = direction === 1 ? 0 : roleOptions.length - 1;
            setRoleValue(roleOptions[fallbackIndex].value);
            return;
        }
        const nextIndex = (currentIndex + direction + roleOptions.length) % roleOptions.length;
        setRoleValue(roleOptions[nextIndex].value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMessage = '';

        switch (name) {
            case 'username':
                errorMessage = validateLogin(value);
                break;
            case 'password1':
                errorMessage = passwordValidator(value);
                break;
            case 'password2':
                errorMessage = validatePasswordConfirmation(value, credentials.password1);
                break;
            case 'email':
                errorMessage = validateEmail(value);
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
        setBlurredField(name);

        setValidFields((prev) => {
            if (!errorMessage && !prev.includes(name)) {
                return [...prev, name];
            }
            if (errorMessage && prev.includes(name)) {
                return prev.filter((f) => f !== name);
            }
            return prev;
        });

        setInvalidFields((prev) => {
            if (errorMessage && !prev.includes(name)) {
                return [...prev, name];
            }
            if (!errorMessage && prev.includes(name)) {
                return prev.filter((f) => f !== name);
            }
            return prev;
        });
    };

    const getHintText = (name: string, validText: string, defaultText: string) => {
        return validFields.includes(name) ? validText : defaultText;
    };

    const getHintClass = (name: string) => {
        if (validFields.includes(name)) {
            return `${styles.inputHint} ${styles.validHint}`;
        }
        if (invalidFields.includes(name)) {
            return `${styles.inputHint}`;
        }
        return styles.inputHint;
    };

    return (
        <div>
            <div className={styles.centred}>
                <div className={styles.leftSide}>
                    <Picture src={masterReg} alt={'маникюр мастера'} className="manicureProcess" />
                    <div className={styles.leftSIdeText}>
                        <h3 className={styles.leftSideTitle}>Профиль мастеров</h3>
                        <p className={styles.leftSideDesc}>
                            Создайте свою страницу специалиста
                            <br />и получайте дополнительный поток клиентов. 3 миллиона человек ищут
                            услуги и специалистов каждый месяц.
                        </p>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.loginFormContainer}>
                        <h2 className={styles.loginTitle}>Регистрация</h2>
                        <div className="flex-center">
                            <span className={styles.noAccount}>Уже есть Личный Профиль?</span>
                            <LinkButton to="/login" className="linkEnter">
                                Войти
                            </LinkButton>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={`${styles.formGroup} flex-col-8`}>
                                <label htmlFor="role" className={styles.formLabel}>
                                    Тип профиля
                                </label>
                                <div ref={roleMenuRef} className={styles.roleSelectWrapper}>
                                    <button
                                        id="role"
                                        type="button"
                                        onClick={toggleRoleMenu}
                                        onKeyDown={handleRoleKeyDown}
                                        aria-haspopup="listbox"
                                        aria-expanded={isRoleMenuOpen}
                                        className={`${styles.roleSelectButton} ${
                                            errors.role ? styles.roleSelectButtonError : ''
                                        }`}
                                    >
                                        <span
                                            className={
                                                credentials.role
                                                    ? styles.roleSelectValue
                                                    : styles.roleSelectPlaceholder
                                            }
                                        >
                                            {roleOptions.find(
                                                (option) => option.value === credentials.role
                                            )?.label || 'тип профиля'}
                                        </span>
                                        <SvgIcon
                                            Icon={isRoleMenuOpen ? NavArrowUp : NavArrowDown}
                                            className={styles.roleSelectIcon}
                                        />
                                    </button>
                                    {isRoleMenuOpen && (
                                        <ul
                                            className={styles.roleSelectList}
                                            role="listbox"
                                            aria-label="Тип профиля"
                                        >
                                            {roleOptions.map((option) => {
                                                const isSelected = credentials.role
                                                    ? credentials.role === option.value
                                                    : option.value === 'master';
                                                return (
                                                    <li key={option.value}>
                                                        <button
                                                            type="button"
                                                            className={`${styles.roleSelectOption} ${
                                                                isSelected
                                                                    ? styles.roleSelectOptionActive
                                                                    : ''
                                                            }`}
                                                            onClick={() =>
                                                                handleRoleSelect(option.value)
                                                            }
                                                            role="option"
                                                            aria-selected={isSelected}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                                {errors.role ? (
                                    <span className={`${styles.errorMessage} ${styles.inputHint}`}>
                                        {errors.role}
                                    </span>
                                ) : (
                                    <span className={styles.inputHint}>выберите тип профиля</span>
                                )}
                            </div>

                            <div className={`${styles.formGroup} flex-col-8`}>
                                <label htmlFor="username" className={styles.formLabel}>
                                    Логин
                                </label>
                                <Input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="логин"
                                    className={styles.formInput}
                                    style={getInputStyle('username')}
                                />
                                {errors.username ? (
                                    <span className={`${styles.errorMessage} ${styles.inputHint}`}>
                                        {errors.username}
                                    </span>
                                ) : (
                                    <span className={getHintClass('username')}>
                                        {getHintText('username', 'логин', 'введите логин')}
                                    </span>
                                )}
                            </div>

                            <div className={`${styles.formGroup} flex-col-8`}>
                                <label htmlFor="email" className={styles.formLabel}>
                                    Email
                                </label>
                                <Input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="email"
                                    className={styles.formInput}
                                    style={getInputStyle('email')}
                                />
                                {errors.email ? (
                                    <span className={styles.errorMessage + ' ' + styles.inputHint}>
                                        {errors.email}
                                    </span>
                                ) : (
                                    <span className={getHintClass('email')}>
                                        {getHintText('email', 'email', 'введите email')}
                                    </span>
                                )}
                            </div>

                            <div className={`${styles.formGroup} flex-col-8`}>
                                <label htmlFor="password" className={styles.formLabel}>
                                    Пароль
                                </label>
                                <div className={styles.passwordInputContainer}>
                                    <Input
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password1"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="пароль"
                                        className={styles.formInput + ' ' + styles.passwordInput}
                                        style={getInputStyle('password1')}
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggleButton}
                                        onClick={togglePasswordVisibility}
                                    >
                                        <SvgIcon Icon={EyeEmpty} className={iconClass.password1} />
                                    </button>
                                </div>
                                {errors.password1 ? (
                                    <span className={`${styles.errorMessage} ${styles.inputHint}`}>
                                        {errors.password1}
                                    </span>
                                ) : (
                                    <span className={getHintClass('password1')}>
                                        {getHintText('password1', 'пароль', 'придумайте пароль')}
                                    </span>
                                )}
                            </div>

                            <div className={`${styles.formGroup} flex-col-8`}>
                                <label htmlFor="passwordConfirmation" className={styles.formLabel}>
                                    Пароль
                                </label>
                                <div className={styles.passwordInputContainer}>
                                    <Input
                                        type={passwordConfirmationVisible ? 'text' : 'password'}
                                        name="password2"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="повторите пароль"
                                        className={styles.formInput + ' ' + styles.passwordInput}
                                        style={getInputStyle('password2')}
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggleButton}
                                        onClick={togglePasswordConfirmationVisibility}
                                    >
                                        <SvgIcon Icon={EyeEmpty} className={iconClass.password2} />
                                    </button>
                                </div>
                                {errors.password2 ? (
                                    <span className={`${styles.errorMessage} ${styles.inputHint}`}>
                                        {errors.password2}
                                    </span>
                                ) : (
                                    <span className={getHintClass('password2')}>
                                        {getHintText('password2', 'пароль', 'повторите пароль')}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formAgreeGroup}>
                                <label className={styles.checkboxLabel}>
                                    <span className={styles.checkboxText}>
                                        Согласие на обработку персональных данных
                                    </span>
                                    <Input
                                        type="checkbox"
                                        name="agree"
                                        checked={agreeToPersonalData}
                                        onChange={handleAgreeChange}
                                        className={`${styles.checkboxInput}
                                        ${errors.agreeToPersonalData ? styles.checkboxError : ''}`}
                                    />
                                </label>

                                {errors.agreeToPersonalData && (
                                    <span className={styles.errorAgree}>
                                        {errors.agreeToPersonalData}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formBtnGroup}>
                                {loginError && (
                                    <div className={styles.errorServer}>{loginError}</div>
                                )}
                                <Button
                                    children={isLoading ? 'Загрузка...' : 'Продолжить'}
                                    type="submit"
                                    classNames={{ buttonClass: 'registerButton' }}
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { RegisterMaster };
