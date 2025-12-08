import React from 'react';
import {
    DateSelectField,
    FormTitle,
    LabeledInputField,
    ImageUploadField,
    FormFooter,
} from '@/components';
import styles from './index.module.scss';

type MasterDiplomasFormProps = {
    onClose: () => void;
};

const MasterDiplomasForm: React.FC<MasterDiplomasFormProps> = ({ onClose }) => {
    return (
        <div className={styles.diplomasOverlay}>
            <div className={styles.diplomasForm}>
                <FormTitle title="Загрузите ваши сертификаты " onClose={onClose} />
                <div className={styles.diplomasFieldWrapper}>
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
