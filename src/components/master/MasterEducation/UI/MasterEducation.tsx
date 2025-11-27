import React from 'react';
import BadgeChip from '@/assets/icons/BadgeChip.svg?react';
import { SvgIcon, Button, MasterEducationForm } from '@/components';
import styles from './index.module.scss';

export const MasterEducation: React.FC = () => {
    return (
        <div className={styles.educationCard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Образование</h2>
                <Button classNames={{ buttonClass: 'editButton' }}>
                    <SvgIcon Icon={BadgeChip} />
                </Button>
            </div>
            <MasterEducationForm />
        </div>
    );
};
