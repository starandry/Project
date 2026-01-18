import React from 'react';
import { cn } from '@/shared/lib';
import styles from './index.module.scss';
import type { ErrorFallbackProps } from '../index.model';

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
    title = 'Что-то пошло не так',
    message = 'Попробуйте обновить страницу.',
    actionLabel = 'Обновить страницу',
    onAction,
}) => {
    const handleAction = () => {
        if (onAction) {
            onAction();
            return;
        }
        window.location.reload();
    };

    return (
        <div className={cn(styles, 'fallback', 'flex-center')} role="alert">
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <button className={styles.action} type="button" onClick={handleAction}>
                    {actionLabel}
                </button>
            </div>
        </div>
    );
};
