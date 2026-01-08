import React from 'react';
import styles from './index.module.scss';
import {
    FormTitle,
    LabeledInputField,
    LabelCountField,
    DateSelectField,
    FormFooter,
} from '@/components';

type MasterExperienceFormProps = {
    onClose: () => void;
};

const MasterExperienceForm: React.FC<MasterExperienceFormProps> = ({ onClose }) => {
    return (
        <div className={styles.experienceOverlay}>
            <form className={styles.experienceForm}>
                <FormTitle title="Редактировать поле   Опыт работы" onClose={onClose} />
                <div className={styles.experienceFieldWrapper}>
                    <LabeledInputField
                        label="Название компании"
                        placeholder="Введите название компании"
                        onChange={() => {}}
                    />
                    <LabeledInputField
                        label="Должность"
                        placeholder="Введите название должности"
                        onChange={() => {}}
                    />
                    <LabelCountField
                        label="Опыт работы"
                        placeholder="Напишите основные обязанности вашей  работы. "
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
                    <FormFooter onCancel={onClose} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterExperienceForm };
