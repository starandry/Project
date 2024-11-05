import React, { FC } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children }) => {
    // Просто передаем className без использования styles[className]
    const computedClassName = `${styles.button} ${className}`;

    return (
        <button type={type} className={computedClassName}>
            {children}
        </button>
    );
};

export { Button };


