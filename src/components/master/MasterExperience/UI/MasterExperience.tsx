import React, { useState } from 'react';
import BadgePlus from '@/assets/icons/BadgePlus.svg?react';
import Check from '@/assets/icons/Check.svg?react';
import { SvgIcon, Button, MasterExperienceForm } from '@/components';
import styles from './index.module.scss';

export const MasterExperience: React.FC = () => {
    const [isFormShown, setIsFormShown] = useState(false);

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Опыт</h2>
                <Button
                    classNames={{ buttonClass: 'editButton' }}
                    onClick={() => setIsFormShown(true)}
                >
                    <SvgIcon Icon={BadgePlus} />
                </Button>
            </div>
            <div className="flex-between">
                <SvgIcon Icon={Check} className="check" />
                <p className={styles.text}>Заполните опыт работы</p>
                <div className={`flex-col-6 ${styles.experienceYearBlock}`}>
                    <span className={styles.label}>период работы</span>
                    <p className={`flex ${styles.years}`}>
                        <span className={styles.year}>ГГГГ</span>
                        <span className={styles.year}>ГГГГ</span>
                    </p>
                </div>
            </div>
            {isFormShown && <MasterExperienceForm onClose={() => setIsFormShown(false)} />}
        </div>
    );
};
