import React from 'react';
import type { MainProps } from '../index.model';
import styles from './index.module.scss';
import { cn } from '@/shared/lib';

const Main: React.FC<MainProps> = ({ children, className }) => {
    return <main className={cn(styles, className)}>{children}</main>;
};

export { Main };
