import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { getApiErrorMessage } from '@/shared/api/errors';
import type { LoginCredentials } from '@/features/auth';
import styles from './index.module.scss';
import EyeEmpty from '@/shared/assets/icons/EyeEmpty.svg?react';
import NavArrowDown from '@/shared/assets/icons/NavArrowDown.svg?react';
import NavArrowUp from '@/shared/assets/icons/NavArrowUp.svg?react';
import masterReg from '@/shared/assets/images/master-reg.png';
import { validateLogin, passwordValidator, useDropdown } from '@/shared/lib';
import { Button, LinkButton, Picture, SvgIcon, Input } from '@/shared/ui';

interface Errors {
    role: string;
    login: string;
    password: string;
    agreeToPersonalData?: string;
}

type LoginFormState = LoginCredentials & {
    role: 'master' | 'client' | '';
};

const roleOptions: Array<{ value: 'master' | 'client'; label: string }> = [
    { value: 'master', label: 'Мастер' },
    { value: 'client', label: 'Клиент' },
];

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginFormState>({
        role: '',
        login: '',
        password: '',
    });

    const [errors, setErrors] = useState<Errors>({
        role: '',
        login: '',
        password: '',
        agreeToPersonalData: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [agreeToPersonalData, setAgreeToPersonalData] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [blurredField, setBlurredField] = useState<string | null>(null);
    const [validFields, setValidFields] = useState<string[]>([]);
    const [invalidFields, setInvalidFields] = useState<string[]>([]);

    const [iconClass, setIconClass] = useState({
        password: '',
    });

    const {
        open: isRoleMenuOpen,
        toggle: toggleRoleMenu,
        close: closeRoleMenu,
        ref: roleMenuRef,
    } = useDropdown<HTMLDivElement>();

    const [loginMutation, { isLoading }] = useLoginMutation();

    useEffect(() => {
        if (blurredField === 'password') {
            setIconClass({
                password: errors.password ? 'passwordErr' : 'passwordValid',
            });
        }
    }, [blurredField, errors.password]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const setRoleValue = (value: 'master' | 'client') => {
        setCredentials((prev) => ({ ...prev, role: value }));

        if (value) {
            setErrors((prev) => ({ ...prev, role: '' }));
        }
    };

    const handleRoleSelect = (value: 'master' | 'client') => {
        setRoleValue(value);
        closeRoleMenu();
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

        setLoginError(errors.role || errors.login || errors.password || errors.agreeToPersonalData);

        try {
            const submitCredentials: LoginCredentials = {
                login: credentials.login,
                password: credentials.password,
            };
            await loginMutation(submitCredentials).unwrap();
        } catch (error) {
            setLoginError(getApiErrorMessage(error, 'Произошла неизвестная ошибка'));
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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMessage = '';

        switch (name) {
            case 'login':
                errorMessage = validateLogin(value);
                break;
            case 'password':
                errorMessage = passwordValidator(value);
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
                    <div className={`${styles.leftSIdeText} flex-col`}>
                        <h3 className={styles.leftSideTitle}>Маникюр как искусство</h3>
                        <p className={styles.leftSideDesc}>
                            Мастер ты или Клиент, наш сайт поможет тебе легко и красиво предоставить
                            или получить качественную услугу маникюра.
                        </p>
                        <p className={styles.leftSideDesc}>
                            Лучшие мастера и Клиенты у нас на сайте!
                        </p>
                    </div>
                </div>
                <div className={`${styles.rightSide} flex-center`}>
                    <div className={`${styles.loginFormContainer} flex-col`}>
                        <h2 className={styles.loginTitle}>Войти на сайт</h2>

                        <div className="flex-center">
                            <span className={styles.noAccount}>Ещё нет профиля?</span>
                            <LinkButton to="/register/master" className="linkEnter">
                                Зарегистрироваться
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
                                <label htmlFor="login" className={styles.formLabel}>
                                    Логин
                                </label>
                                <Input
                                    type="text"
                                    name="login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="логин"
                                    className={styles.formInput}
                                    style={getInputStyle('login')}
                                />
                                {errors.login ? (
                                    <span className={`${styles.errorMessage} ${styles.inputHint}`}>
                                        {errors.login}
                                    </span>
                                ) : (
                                    <span className={getHintClass('login')}>
                                        {getHintText('login', 'логин', 'введите логин')}
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
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="пароль"
                                        className={styles.formInput + ' ' + styles.passwordInput}
                                        style={getInputStyle('password')}
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggleButton}
                                        onClick={togglePasswordVisibility}
                                    >
                                        <SvgIcon Icon={EyeEmpty} className={iconClass.password} />
                                    </button>
                                </div>
                                {errors.password ? (
                                    <span className={`${styles.errorMessage} ${styles.inputHint}`}>
                                        {errors.password}
                                    </span>
                                ) : (
                                    <span className={getHintClass('password')}>
                                        {getHintText('password', 'пароль', 'введите пароль')}
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

                                <div className={styles.forgotPasswordWrapper}>
                                    <LinkButton
                                        to="/forgot-password"
                                        className={styles.forgotPasswordLink}
                                    >
                                        Забыли пароль?
                                    </LinkButton>
                                </div>
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

export { Login };
