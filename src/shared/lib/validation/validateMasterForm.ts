const _validateLogin = (value: string): string => {
    const basicError = validateRequiredNoSpaces(value, 'Логин');
    if (basicError) return basicError;

    if (value.length < 5) {
        return 'Логин должен содержать не менее 5 символов.';
    } else if (value.length > 20) {
        return 'Логин не может содержать более 20 символов.';
    }

    const latinAlnum = /^[A-Za-z0-9]+$/;
    if (!latinAlnum.test(value)) {
        return (
            'Введены недопустимые символы. ' +
            'Допустимо использовать буквенно-числовые значения (латиница).'
        );
    }

    return '';
};

const _validatePassword = (value: string): string => {
    const basicError = validateRequiredNoSpaces(value, 'Пароль');
    if (basicError) return basicError;

    if (value.length < 6) {
        return 'Пароль должен содержать не менее 6 символов.';
    } else if (value.length > 15) {
        return 'Пароль не может содержать более 15 символов.';
    }

    const passwordRegex = /^[A-Za-z0-9!?@#$%^&*_\-+()\[\]{}><\/\\|"'.,:]+$/;

    if (!passwordRegex.test(value)) {
        return (
            'Введены недопустимые символы. ' +
            'Допустимо использовать буквенно-числовые значения ' +
            '(латиница) и спец. символы: ' +
            '! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \\ | " \' . , :'
        );
    }

    const hasLetter = /[A-Za-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecial = /[!?@#$%^&*_\-+()\[\]{}><\/\\|"'.,:]/.test(value);

    if (!hasLetter || !hasDigit || !hasSpecial) {
        return (
            'Недостаточно надежный пароль. Пароль должен содержать. ' +
            'минимум 1 букву, 1 цифру и 1 спец. символ.'
        );
    }

    return '';
};

const _validateEmail = (value: string): string => {
    const basicError = validateRequiredNoSpaces(value, 'Адрес электронной почты');
    if (basicError) return basicError;

    if (value.length < 6) {
        return 'Адрес электронной почты должен содержать не менее 6 символов.';
    } else if (value.length > 30) {
        return 'Адрес электронной почты не может содержать более 30 символов.';
    }

    const allowedCharsRegex = /^[A-Za-z0-9@._-]+$/;
    if (!allowedCharsRegex.test(value)) {
        return (
            'Введены недопустимые символы. Допустимо использовать ' +
            'буквенно-числовые значения (латиница) и спец. символы:  - _ . @'
        );
    }

    const emailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(value)) {
        return 'Адрес электронной почты введен некорректно.';
    }

    return '';
};

const _validatePasswordConfirmation = (value: string, originalPassword: string): string => {
    const basicError = validateRequiredNoSpaces(value, 'Пароль');
    if (basicError) return basicError;

    if (value !== originalPassword) {
        return 'Пароли не совпадают.';
    }

    return '';
};

const validateRequiredNoSpaces = (value: string, fieldName = 'Поле'): string => {
    if (!value) {
        return `Обязательно для заполнения.`;
    }

    if (/\s/.test(value)) {
        return `${fieldName} не должен содержать пробелы.`;
    }

    return '';
};

const withTrim =
    (validator: (value: string, ...args: string[]) => string) =>
    (value: string, ...args: string[]): string => {
        const trimmed = value.trim();
        return validator(trimmed, ...args);
    };

export const validateLogin = withTrim(_validateLogin);
export const passwordValidator = withTrim(_validatePassword);
export const validateEmail = withTrim(_validateEmail);
export const validatePasswordConfirmation = withTrim(_validatePasswordConfirmation);
