import React from 'react';
import {
    DateSelectField,
    FormTitle,
    LabeledInputField,
    ImageUploadField,
    FormFooter,
} from '@/components';

type MasterDiplomasFormProps = {
    onClose: () => void;
};

const MasterDiplomasForm: React.FC<MasterDiplomasFormProps> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="form-container">
                <FormTitle title="Загрузите ваши сертификаты " onClose={onClose} />
                <div className="flex-col-16">
                    <LabeledInputField
                        label="Название Сертификата"
                        placeholder="Введите название Сертификата"
                        onChange={() => {}}
                    />
                    <LabeledInputField
                        label="Организация выдавшая Сертификат"
                        placeholder="Введите название организации выдавшей Сертификат"
                        onChange={() => {}}
                    />
                    <DateSelectField
                        onYearChange={() => {}}
                        onMonthChange={() => {}}
                        label="Дата  сертификата"
                    />
                    <ImageUploadField label="Загрузите изображение Сертификата" />
                    <FormFooter onCancel={onClose} onSubmit={() => {}} />
                </div>
            </div>
        </div>
    );
};

export { MasterDiplomasForm };
