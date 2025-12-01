import React from 'react';
import styles from './index.module.scss';
import { Input } from '@/components';

const MasterEducationForm: React.FC = () => {
    return (
        <div className={styles.educationOverlay}>
            <form className={styles.educationForm}>
                <h2 className={styles.educationFormTitle}>Редактировать поле Образование</h2>
                <div className={styles.educationFieldWrapper}>
                    <div className={styles.institutionGroup}>
                        <label className={styles.institutionLabel}>
                            Название учебного заведения
                        </label>

                        <Input
                            type='text'
                            placeholder='Введите название учебного заведения'
                            className='institutionInput'
                            onChange={() => {}}
                        />
                    </div>
                    <div className={styles.institutionGroup}>
                        <label className={styles.institutionLabel}>
                            Название учебного заведения
                        </label>

                        <Input
                            type='text'
                            placeholder='Введите название учебного заведения'
                            className='institutionInput'
                            onChange={() => {}}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export { MasterEducationForm };
