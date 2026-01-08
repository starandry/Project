import React from 'react';
import { LabeledInputField, DateSelectField, FormFooter, FormTitle } from '@/components';
import { useMasterEducationForm } from '@/components';
import type { EducationFormData } from '@/components';
import styles from './index.module.scss';

type MasterEducationFormProps = {
    onClose: () => void;
    onSubmit?: (data: EducationFormData) => void;
    initialData?: Partial<EducationFormData>;
};

const MasterEducationForm: React.FC<MasterEducationFormProps> = ({
    onClose,
    onSubmit,
    initialData,
}) => {
    const { formData, handleInputChange, handleSelectChange } =
        useMasterEducationForm(initialData);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className={styles.educationOverlay}>
            <form className={styles.educationForm} onSubmit={handleFormSubmit}>
                <FormTitle title="Редактировать поле Образование" onClose={onClose} />
                <div className={styles.educationFieldWrapper}>
                    <LabeledInputField
                        label="Название учебного заведения"
                        placeholder="Введите название учебного заведения"
                        value={formData.institutionName}
                        onChange={handleInputChange('institutionName')}
                    />
                    <LabeledInputField
                        label="Специальность"
                        placeholder="Введите название специальности"
                        value={formData.specialty}
                        onChange={handleInputChange('specialty')}
                    />
                    <DateSelectField
                        label="Дата начала обучения"
                        yearValue={formData.startYear}
                        monthValue={formData.startMonth}
                        onYearChange={handleSelectChange('startYear')}
                        onMonthChange={handleSelectChange('startMonth')}
                    />
                    <DateSelectField
                        label="Дата окончания обучения"
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

export { MasterEducationForm };
