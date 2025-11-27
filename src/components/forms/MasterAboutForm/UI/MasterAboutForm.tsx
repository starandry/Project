import React, { useState } from 'react';
import { Button } from '@/components';
import styles from './index.module.scss';

type MasterAboutFormProps = {
    onCancel?: () => void;
    onSaved?: () => void;
};

const ABOUT_MIN_LENGTH = 150;
const ABOUT_MAX_LENGTH = 1000;
const ABOUT_REGEX = /^[A-Za-zА-Яа-яЁё0-9\s.,:;!?()\-'"\/\\]+$/u;

const MasterAboutForm: React.FC<MasterAboutFormProps> = ({ onCancel, onSaved }) => {
    const [about, setAbout] = useState('');
    const [error, setError] = useState<string | null>(null);

    const validateAbout = (value: string): string | null => {
        if (!value.trim()) {
            return 'Обязательно для заполнения.';
        }

        if (value.length < ABOUT_MIN_LENGTH) {
            return 'Поле не может содержать менее 150 символов';
        }

        if (value.length > ABOUT_MAX_LENGTH) {
            return 'Поле не может содержать более 1000 символов';
        }

        if (!ABOUT_REGEX.test(value)) {
            return 'Введены недопустимые символы. Допустимо использовать буквенно-числовые значения (латиница, кириллица) и спец. символы: . , : ; ! ? ( ) - \' " / \\';
        }

        return null;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationError = validateAbout(about);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);

        // здесь логика отправки на сервер / в Redux
        // ...

        if (onSaved) {
            onSaved();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAbout(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <textarea
                    className={styles.masterAboutTextarea}
                    placeholder="Расскажите немного о себе..."
                    value={about}
                    onChange={handleChange}
                />
            </label>

            {error && (
                <p className={styles.masterAboutError}>
                    {error}
                </p>
            )}

            <div className={styles.formActions}>
                <Button classNames={{ buttonClass: 'cancelButton ' }} onClick={onCancel}>
                    Отменить
                </Button>
                <Button classNames={{ buttonClass: 'submitButton ' }} type="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    );
};

export { MasterAboutForm };
