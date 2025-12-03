import React from 'react';
import styles from './index.module.scss';
import { LabeledInputField, DateSelectField } from '@/components';

const MasterEducationForm: React.FC = () => {
    return (
        <div className={styles.educationOverlay}>
            <form className={styles.educationForm}>
                <h2 className={styles.educationFormTitle}>Редактировать поле Образование</h2>
                <div className={styles.educationFieldWrapper}>
                    <LabeledInputField
                        label="Название учебного заведения"
                        placeholder="Введите название учебного заведения"
                        onChange={() => {}}
                    />
                    <LabeledInputField
                        label="Специальность"
                        placeholder="Введите название специальности"
                        onChange={() => {}}
                    />
                    <DateSelectField
                        onYearChange={() => {}}
                        onMonthChange={() => {}}
                        label="Дата начала обучения"
                    />
                    <DateSelectField
                        onYearChange={() => {}}
                        onMonthChange={() => {}}
                        label="Дата окончания обучения"
                    />
                </div>
            </form>
        </div>
    );
};

export { MasterEducationForm };
