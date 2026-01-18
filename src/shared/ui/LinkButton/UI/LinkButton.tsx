import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib';
import styles from './index.module.scss';
import type { LinkButtonProps } from '@/shared/ui/LinkButton/index.model.ts';

export const LinkButton: React.FC<LinkButtonProps> = ({ to, children, className }) => {
    return (
        <Link to={to} className={cn(styles, 'linkButton', className)}>
            {children}
        </Link>
    );
};
