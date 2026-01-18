import React from 'react';
import styles from './index.module.scss';
import type { HeaderProps } from '../index.model';
import { cn } from '@/shared/lib';

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    return <header className={cn(styles, 'header', className)}>{children}</header>;
};

export { Header };
