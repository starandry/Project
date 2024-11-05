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
};

const Input: FC<InputProps> = ({ type, id, label, value, onChange, placeholder, required = false, className }) => {
    const inputClassName = `${styles.input} ${className ? styles[className] : ''}`;

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>{label}</label>
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

