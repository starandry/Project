import React, { useState, useCallback } from 'react';
import { FormTitle, FormFooter, LabeledInputField, ImageUploadField } from '@/components';
import styles from './index.module.scss';

type PortfolioFormData = {
    title: string;
    description: string;
};

type MasterPortfolioFormProps = {
    onClose: () => void;
    onSubmit?: (data: PortfolioFormData) => void;
    initialData?: Partial<PortfolioFormData>;
};

const MasterPortfolioForm: React.FC<MasterPortfolioFormProps> = ({
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<PortfolioFormData>({
        title: initialData?.title || '',
        description: initialData?.description || '',
    });

    const handleInputChange = useCallback(
        (field: keyof PortfolioFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <div className="modal-overlay">
            <form className="form-container" onSubmit={handleFormSubmit}>
                <FormTitle title="Загрузите ваше портфолио" onClose={onClose} />

                <div className={styles.portfolioWrapper}>
                    <LabeledInputField
                        label="Название работы"
                        placeholder="Введите название работы"
                        value={formData.title}
                        onChange={handleInputChange('title')}
                    />

                    <LabeledInputField
                        label="Описание работы"
                        placeholder="Введите описание работы"
                        value={formData.description}
                        onChange={handleInputChange('description')}
                    />

                    <ImageUploadField label="Загрузите изображение" />

                    <FormFooter onCancel={onClose} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterPortfolioForm };
