import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { message } from 'antd';
import { useUpdateMasterProfileMutation } from '@/features/master/api/masterProfileApi';
import type { UseMasterAboutFormProps, UseMasterAboutFormReturn } from './masterAboutFormTypes';

const ABOUT_MIN_LENGTH = 150;
const ABOUT_MAX_LENGTH = 1000;
const ABOUT_REGEX = /^[A-Za-zА-Яа-яЁё0-9\s.,:;!?()\-'"\/\\]+$/u;

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

export const useMasterAboutForm = (props: UseMasterAboutFormProps): UseMasterAboutFormReturn => {
    const { profileId, onSaved } = props;
    const [updateProfile] = useUpdateMasterProfileMutation();

    const [about, setAbout] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAbout(value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationError = validateAbout(about);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);

        try {
            await updateProfile({
                id: profileId,
                body: {
                    about_master: about,
                },
            }).unwrap();

            if (onSaved) {
                onSaved();
            }
        } catch {
            message.error('Не удалось сохранить данные. Попробуйте ещё раз.');
        }
    };

    return {
        about,
        error,
        handleChange,
        handleSubmit,
    };
};
