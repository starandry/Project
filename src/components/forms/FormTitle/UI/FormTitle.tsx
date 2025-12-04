import React from 'react';
import { SvgIcon } from '@/components';
import BadgeChip from '@/assets/icons/BadgeChip.svg?react';
import styles from './index.module.scss';

type FormTitleProps = {
    title: string;
    className?: string;
};

const FormTitle: React.FC<FormTitleProps> = ({ title, className }) => {
    return (
        <div className={`${styles.formTitle} ${className || ''}`}>
            <h2 className={styles.formTitleText}>{title}</h2>
            <SvgIcon Icon={BadgeChip} />
        </div>
    );
};

export { FormTitle };
