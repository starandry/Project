import React from 'react';
import { cn } from '@/shared/lib';
import styles from './index.module.scss';
import type { ButtonProps } from '@/shared/ui/Button/index.model.ts';

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    classNames = {},
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(styles, 'btn', classNames.buttonClass)}
        >
            {children}
        </button>
    );
};
