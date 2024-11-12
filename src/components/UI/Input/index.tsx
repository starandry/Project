import React, { FC } from 'react';
import styles from './input.module.scss';

type InputProps = {
    type: string;
    id?: string;
    label?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
};

const Input: FC<InputProps> = ({ type, id, label, value, onChange, placeholder, required = false, className,
                                   containerClassName, labelClassName }) => {
    const inputClassName = `${styles.input} ${className || ''}`;
    const containerClass = `${styles.inputContainer} ${containerClassName || ''}`;
    const labelClass = `${styles.label} ${labelClassName || ''}`;

    return (
        <div className={containerClass}>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={inputClassName}
            />
        </div>
    );
};

export { Input };

