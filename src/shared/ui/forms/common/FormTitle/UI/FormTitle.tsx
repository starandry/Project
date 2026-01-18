import React from 'react';
import { SvgIcon, Button } from '@/shared/ui';
import BadgeChip from '@/shared/assets/icons/BadgeChip.svg?react';
import styles from './index.module.scss';

type FormTitleProps = {
    title: string;
    className?: string;
    onClose?: () => void;
};

const FormTitle: React.FC<FormTitleProps> = ({ title, className, onClose }) => {
    return (
        <div className={`flex-between ${className || ''}`}>
            <h2 className={styles.formTitleText}>{title}</h2>
            <Button classNames={{ buttonClass: 'closeFormBtn' }} onClick={onClose}>
                <SvgIcon Icon={BadgeChip} />
            </Button>
        </div>
    );
};

export { FormTitle };
