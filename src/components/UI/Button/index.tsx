import React, { FC } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children }) => {
    const computedClassName = className ? styles[className] : className;

    return (
        <button type={type} className={computedClassName}>
            {children}
        </button>
    );
};

export { Button };

