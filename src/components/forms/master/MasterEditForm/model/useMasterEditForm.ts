import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type {
    MasterEditFormData,
    MasterEditFormErrors,
    UseMasterEditFormProps,
    UseMasterEditFormReturn,
} from './masterEditFormTypes';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const NAME_REGEX = /^[A-Za-zА-Яа-яЁё\s\-]+$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+()]+$/;
const MAX_PHOTO_SIZE = 500 * 1024; // 500KB

const validateName = (value: string): string | null => {
    if (!value.trim()) {
        return 'Обязательно для заполнения';
    }

    if (value.length < NAME_MIN_LENGTH) {
        return `Имя должно содержать минимум ${NAME_MIN_LENGTH} символа`;
    }

    if (value.length > NAME_MAX_LENGTH) {
        return `Имя не может содержать более ${NAME_MAX_LENGTH} символов`;
    }

    if (!NAME_REGEX.test(value)) {
        return 'Имя может содержать только буквы, пробелы и дефисы';
    }

    return null;
};

const validateEmail = (value: string): string | null => {
    if (!value.trim()) {
        return 'Обязательно для заполнения';
    }

    if (!EMAIL_REGEX.test(value)) {
        return 'Введите корректный адрес электронной почты';
    }

    return null;
};

const validatePhone = (value: string): string | null => {
    if (!value.trim()) {
        return 'Обязательно для заполнения';
    }

    if (!PHONE_REGEX.test(value)) {
        return 'Введите корректный номер телефона';
    }

    if (value.replace(/\D/g, '').length < 10) {
        return 'Номер телефона слишком короткий';
    }

    return null;
};

const validatePhoto = (file: File | null): string | null => {
    if (!file) {
        return null;
    }

    if (file.size > MAX_PHOTO_SIZE) {
        return 'Допустимо использовать файлы не более 500KB';
    }

    if (!file.type.startsWith('image/')) {
        return 'Допустимы только изображения';
    }

    return null;
};

const initialFormData: MasterEditFormData = {
    name: '',
    email: '',
    phone: '',
    photo: null,
    photoPreview: null,
};

const initialErrors: MasterEditFormErrors = {
    name: null,
    email: null,
    phone: null,
    photo: null,
};

export const useMasterEditForm = (
    props: UseMasterEditFormProps = {}
): UseMasterEditFormReturn => {
    const { onSaved, onCancel, initialData } = props;

    const [formData, setFormData] = useState<MasterEditFormData>({
        ...initialFormData,
        ...initialData,
    });

    const [errors, setErrors] = useState<MasterEditFormErrors>(initialErrors);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, name: value }));
        if (errors.name) {
            setErrors((prev) => ({ ...prev, name: null }));
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, email: value }));
        if (errors.email) {
            setErrors((prev) => ({ ...prev, email: null }));
        }
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, phone: value }));
        if (errors.phone) {
            setErrors((prev) => ({ ...prev, phone: null }));
        }
    };

    const handlePhotoChange = (file: File | null) => {
        const photoError = validatePhoto(file);

        if (photoError) {
            setErrors((prev) => ({ ...prev, photo: photoError }));
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    photo: file,
                    photoPreview: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }

        setErrors((prev) => ({ ...prev, photo: null }));
    };

    const handlePhotoDelete = () => {
        setFormData((prev) => ({
            ...prev,
            photo: null,
            photoPreview: null,
        }));
        setErrors((prev) => ({ ...prev, photo: null }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);
        const photoError = validatePhoto(formData.photo);

        const newErrors: MasterEditFormErrors = {
            name: nameError,
            email: emailError,
            phone: phoneError,
            photo: photoError,
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== null);

        if (hasErrors) {
            return;
        }

        // Здесь логика отправки на сервер / в Redux (позже можно добавить)
        // ...

        if (onSaved) {
            onSaved();
        }
    };

    const handleCancel = () => {
        setFormData({ ...initialFormData, ...initialData });
        setErrors(initialErrors);

        if (onCancel) {
            onCancel();
        }
    };

    return {
        formData,
        errors,
        handleNameChange,
        handleEmailChange,
        handlePhoneChange,
        handlePhotoChange,
        handlePhotoDelete,
        handleSubmit,
        handleCancel,
    };
};
