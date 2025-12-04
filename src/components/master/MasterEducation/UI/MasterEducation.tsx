import React, { useState } from 'react';
import BadgePlus from '@/assets/icons/BadgePlus.svg?react';
import Check from '@/assets/icons/Check.svg?react';
import { SvgIcon, Button, MasterEducationForm } from '@/components';
import styles from './index.module.scss';

export const MasterEducation: React.FC = () => {
    const [isFormShown, setIsFormShown] = useState(false);

    return (
        <div className={styles.educationCard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Образование</h2>
                <Button
                    classNames={{ buttonClass: 'editButton' }}
                    onClick={() => setIsFormShown(true)}
                >
                    <SvgIcon Icon={BadgePlus} />
                </Button>
            </div>

            <div className={styles.educationItem}>
                <SvgIcon Icon={Check} className="check" />
                <p className={styles.text}>Введите данные вашего образования</p>
            </div>

            {isFormShown && (
                <MasterEducationForm onClose={() => setIsFormShown(false)} />
            )}
        </div>
    );
};

