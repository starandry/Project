import React from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib';
import type { PictureProps } from '../index.model';

export const Picture: React.FC<PictureProps> = ({ src, alt, className }) => {
    const appliedClass = className ? cn(styles, className) : '';
    return <img src={src} alt={alt} className={appliedClass} />;
};
