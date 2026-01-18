import React from 'react';
import styles from './index.module.scss';
import type { FooterProps } from '../index.model';
import { cn } from '@/shared/lib';

const Footer: React.FC<FooterProps> = ({ children, className }) => {
    return <footer className={cn(styles, 'footer', className)}>{children}</footer>;
};

export { Footer };
