import React, { useState } from 'react';
import BadgePlus from '@/shared/assets/icons/BadgePlus.svg?react';
import Check from '@/shared/assets/icons/Check.svg?react';
import { SvgIcon, Button } from '@/shared/ui';
import { MasterEducationForm } from '@/features/master-forms';
import styles from './index.module.scss';

export const MasterEducation: React.FC = () => {
    const [isFormShown, setIsFormShown] = useState(false);

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Образование</h2>
                <Button
                    classNames={{ buttonClass: 'editButton' }}
                    onClick={() => setIsFormShown(true)}
                >
                    <SvgIcon Icon={BadgePlus} />
                </Button>
            </div>

            <div className="flex-between">
                <SvgIcon Icon={Check} className="check" />
                <p className={styles.text}>Введите данные вашего образования</p>
                <div className={`flex-col-6 ${styles.educationYearBlock}`}>
                    <span className={styles.label}>период обучения</span>
                    <p className={`flex ${styles.years}`}>
                        <span className={styles.year}>ГГГГ</span>
                        <span className={styles.year}>ГГГГ</span>
                    </p>
                </div>
            </div>

            {isFormShown && <MasterEducationForm onClose={() => setIsFormShown(false)} />}
        </div>
    );
};
