import React from 'react';
import { cn } from '@/shared/lib';
import styles from './index.module.scss';
import type { ExternalLinkProps } from '@/shared/ui/navigation/ExternalLink/index.model.ts';

export const ExternalLink: React.FC<ExternalLinkProps> = ({
    href,
    children,
    classNames = {},
    target = '_blank',
    rel = 'noopener noreferrer',
}) => {
    return (
        <a
            href={href}
            className={cn(styles, 'link', classNames.linkClass)}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    );
};
