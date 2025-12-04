import React from 'react';
import { LabeledInputField, DateSelectField, FormFooter, FormTitle } from '@/components';
import styles from './index.module.scss';

type MasterEducationFormProps = {
    onClose: () => void;
}

const MasterEducationForm: React.FC<MasterEducationFormProps> = ({ onClose }) => {
    return (
        <div className={styles.educationOverlay}>
            <form className={styles.educationForm}>
                <FormTitle title="Редактировать поле Образование" onClose={onClose}/>
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
                        onCancel={onClose}
                        onSubmit={() => {}}
                    />
                </div>
            </form>
        </div>
    );
};

export { MasterEducationForm };
