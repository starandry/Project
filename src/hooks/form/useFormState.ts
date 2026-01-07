import { useState, useCallback } from 'react';

export type ValidationRule = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => string | null;
};

export type FormValidation<T> = Partial<Record<keyof T, ValidationRule>>;

export const useFormState = <T extends Record<string, unknown>>(
    initialData: T,
    validation?: FormValidation<T>
) => {
    const [data, setData] = useState<T>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const validateField = useCallback(
        (fieldName: keyof T, value: unknown): string | null => {
            const rules = validation?.[fieldName];
            if (!rules) return null;

            if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
                return 'Это поле обязательно';
            }

            if (rules.minLength && String(value).length < rules.minLength) {
                return `Минимум ${rules.minLength} символов`;
            }

            if (rules.maxLength && String(value).length > rules.maxLength) {
                return `Максимум ${rules.maxLength} символов`;
            }

            if (rules.pattern && !rules.pattern.test(String(value))) {
                return 'Некорректный формат';
            }

            if (rules.custom) {
                return rules.custom(value);
            }

            return null;
        },
        [validation]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            const fieldName = name as keyof T;

            setData((prev) => ({ ...prev, [fieldName]: value }));

            const error = validateField(fieldName, value);
            setErrors((prev) => ({
                ...prev,
                [fieldName]: error,
            }));
        },
        [validateField]
    );

    const validate = useCallback((): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};

        Object.keys(data).forEach((key) => {
            const fieldName = key as keyof T;
            const error = validateField(fieldName, data[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [data, validateField]);

    const reset = useCallback(() => {
        setData(initialData);
        setErrors({});
    }, [initialData]);

    return {
        data,
        setData,
        errors,
        setErrors,
        handleChange,
        validate,
        reset,
    };
};
