import React from 'react';
import {
    FormTitle,
    LabeledInputField,
    LabelCountField,
    DateSelectField,
    FormFooter,
} from '@/shared/ui';
import { useMasterExperienceForm } from '../model/useMasterExperienceForm';
import type { ExperienceFormData } from '../model/experienceFormTypes';

type MasterExperienceFormProps = {
    onClose: () => void;
    onSubmit?: (data: ExperienceFormData) => void;
    initialData?: Partial<ExperienceFormData>;
};

const MasterExperienceForm: React.FC<MasterExperienceFormProps> = ({
    onClose,
    onSubmit,
    initialData,
}) => {
    const { formData, handleInputChange, handleTextAreaChange, handleSelectChange } =
        useMasterExperienceForm(initialData);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="modal-overlay">
            <form className="form-container" onSubmit={handleFormSubmit}>
                <FormTitle title="Редактировать поле   Опыт работы" onClose={onClose} />
                <div className="flex-col-16">
                    <LabeledInputField
                        label="Название компании"
                        placeholder="Введите название компании"
                        value={formData.companyName}
                        onChange={handleInputChange('companyName')}
                    />
                    <LabeledInputField
                        label="Должность"
                        placeholder="Введите название должности"
                        value={formData.position}
                        onChange={handleInputChange('position')}
                    />
                    <LabelCountField
                        label="Опыт работы"
                        placeholder="Напишите основные обязанности вашей  работы. "
                        value={formData.description}
                        onChange={handleTextAreaChange('description')}
                    />
                    <DateSelectField
                        label="Дата начала работы"
                        yearValue={formData.startYear}
                        monthValue={formData.startMonth}
                        onYearChange={handleSelectChange('startYear')}
                        onMonthChange={handleSelectChange('startMonth')}
                    />
                    <DateSelectField
                        label="Дата окончания работы"
                        yearValue={formData.endYear}
                        monthValue={formData.endMonth}
                        onYearChange={handleSelectChange('endYear')}
                        onMonthChange={handleSelectChange('endMonth')}
                    />
                    <FormFooter onCancel={handleCancel} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterExperienceForm };
