import React, { FC } from 'react';
import styles from './button.module.scss';
import {useLocation} from "react-router-dom";

type ButtonProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
    onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children, onClick }) => {
    const location = useLocation();
    let computedClassName = `${styles.button} ${className}`;

    if (location.pathname === '/trends') {
        computedClassName = `${styles.btnNone}`
    }

    return (
        <button type={type} className={computedClassName} onClick={onClick}>
            {children}
        </button>
    );
};

export { Button };



