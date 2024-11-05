import React, { FC } from 'react';

type ButtonProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ className = '', type = 'submit', children }) => {
    const computedClassName = className ? className : '';

    return (
        <button type={type} className={computedClassName}>
            {children}
        </button>
    );
};

export { Button };

