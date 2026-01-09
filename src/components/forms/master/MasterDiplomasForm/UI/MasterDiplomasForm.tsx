import React from 'react';
import {
    DateSelectField,
    FormTitle,
    LabeledInputField,
    ImageUploadField,
    FormFooter,
} from '@/components';
import { useMasterDiplomasForm } from '../model/useMasterDiplomasForm';
import type { DiplomasFormData } from '../model/diplomasFormTypes';

type MasterDiplomasFormProps = {
    onClose: () => void;
    onSubmit?: (data: DiplomasFormData) => void;
    initialData?: Partial<DiplomasFormData>;
};

const MasterDiplomasForm: React.FC<MasterDiplomasFormProps> = ({
    onClose,
    onSubmit,
    initialData,
}) => {
    const { formData, handleInputChange, handleSelectChange } =
        useMasterDiplomasForm(initialData);

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
                <FormTitle title="Загрузите ваши сертификаты " onClose={onClose} />
                <div className="flex-col-16">
                    <LabeledInputField
                        label="Название Сертификата"
                        placeholder="Введите название Сертификата"
                        value={formData.certificateName}
                        onChange={handleInputChange('certificateName')}
                    />
                    <LabeledInputField
                        label="Организация выдавшая Сертификат"
                        placeholder="Введите название организации выдавшей Сертификат"
                        value={formData.organization}
                        onChange={handleInputChange('organization')}
                    />
                    <DateSelectField
                        label="Дата сертификата"
                        yearValue={formData.year}
                        monthValue={formData.month}
                        onYearChange={handleSelectChange('year')}
                        onMonthChange={handleSelectChange('month')}
                    />
                    <ImageUploadField label="Загрузите изображение Сертификата" />
                    <FormFooter onCancel={handleCancel} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterDiplomasForm };
