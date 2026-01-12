import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/stores/slices/authSlice.ts';
import { LoginCredentials } from '@/stores/types/authTypes';
import { AppDispatch } from '@/stores/store.ts';
import styles from './index.module.scss';
import EyeEmpty from '@/assets/icons/EyeEmpty.svg?react';
import { validateLogin, passwordValidator } from '@/utils';
import { Button, LinkButton, Picture, SvgIcon } from '@/components';
import { Input } from '@/components';

interface Errors {
    login: string;
    password: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        login: '',
        password: '',
    });

    const [errors, setErrors] = useState<Errors>({
        login: '',
        password: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [blurredField, setBlurredField] = useState<string | null>(null);
    const [validFields, setValidFields] = useState<string[]>([]);
    const [invalidFields, setInvalidFields] = useState<string[]>([]);

    const [iconClass, setIconClass] = useState({
        password: '',
    });

    const dispatch: AppDispatch = useDispatch();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoginError(errors.login || errors.password);

        try {
            await dispatch(login(credentials)).unwrap();
        } catch (error) {
            if (error instanceof Error) {
                setLoginError(error.message);
            } else if (typeof error === 'string') {
                setLoginError(error);
            } else {
                setLoginError('Произошла неизвестная ошибка');
            }
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
                    <Picture
                        src={'/images/master-reg.png'}
                        alt={'маникюр мастера'}
                        className="manicureProcess"
                    />
                    <div className={`${styles.leftSIdeText} flex-col`}>
                        <h3 className={styles.leftSideTitle}>Профиль мастеров</h3>
                        <p className={styles.leftSideDesc}>
                            Войдите в свой профиль специалиста
                            <br />и управляйте своими услугами. 3 миллиона человек ищут услуги и
                            специалистов каждый месяц.
                        </p>
                    </div>
                </div>
                <div className={`${styles.rightSide} flex-center`}>
                    <div className={`${styles.loginFormContainer} flex-col`}>
                        <h2 className={styles.loginTitle}>Вход</h2>

                        <div className="flex-center">
                            <span className={styles.noAccount}>Нет Личного Профиля?</span>
                            <LinkButton to="/register/master" className="linkEnter">
                                Зарегистрироваться
                            </LinkButton>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
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

                            <div className={styles.formBtnGroup}>
                                {loginError && (
                                    <div className={styles.errorServer}>{loginError}</div>
                                )}
                                <Button
                                    children="Войти"
                                    type="submit"
                                    classNames={{ buttonClass: 'registerButton' }}
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
