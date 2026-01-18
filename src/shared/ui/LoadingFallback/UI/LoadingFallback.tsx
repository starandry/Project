import React from 'react';
import { cn } from '@/shared/lib';
import styles from './index.module.scss';
import type { LoadingFallbackProps } from '../index.model';

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ variant = 'page', message }) => {
    const label = message ?? (variant === 'page' ? 'Загрузка страницы...' : 'Загрузка...');

    return (
        <div
            className={cn(
                styles,
                'fallback',
                variant === 'page' ? 'page' : 'section',
                'flex-center'
            )}
            role="status"
            aria-live="polite"
        >
            <div className={styles.content}>
                <span className={styles.spinner} aria-hidden="true" />
                <span className={styles.message}>{label}</span>
            </div>
        </div>
    );
};
