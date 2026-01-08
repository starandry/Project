import React from 'react';
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
        <div className="modal-overlay">
            <form className="form-container">
                <FormTitle title="Редактировать поле   Опыт работы" onClose={onClose} />
                <div className="flex-col-16">
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
