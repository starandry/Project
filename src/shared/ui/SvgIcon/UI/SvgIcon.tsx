import React from 'react';
import styles from './index.module.scss';
import type { SvgIconProps } from '@/shared/ui/SvgIcon/index.model.ts';
import { cn } from '@/shared/lib';

export const SvgIcon: React.FC<SvgIconProps> = ({ Icon, className }) => {
    const appliedClass = cn(styles, 'icon', className);
    return <Icon className={appliedClass} />;
};
