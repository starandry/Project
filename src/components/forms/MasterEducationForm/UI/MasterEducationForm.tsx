import React from 'react';
import BadgeChip from '@/assets/icons/BadgeChip.svg?react';
import { LabeledInputField, DateSelectField, SvgIcon, FormFooter } from '@/components';
import styles from './index.module.scss';

const MasterEducationForm: React.FC = () => {
    return (
        <div className={styles.educationOverlay}>
            <form className={styles.educationForm}>
                <div className={styles.formTitle}>
                    <h2 className={styles.educationFormTitle}>Редактировать поле Образование</h2>
                    <SvgIcon Icon={BadgeChip} />
                </div>
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
                    <FormFooter
                        onCancel={() => {}}
                        onSubmit={() => {}}
                    />
                </div>
            </form>
        </div>
    );
};

export { MasterEducationForm };
