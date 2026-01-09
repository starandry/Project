import React from 'react';
import type { MainProps } from '@/layouts/Main/index.model.ts';
import styles from './index.module.scss';
import { cn } from '@/utils/UI/cn.ts';

const Main: React.FC<MainProps> = ({ children, className }) => {
    return <main className={cn(styles, className)}>{children}</main>;
};

export { Main };
