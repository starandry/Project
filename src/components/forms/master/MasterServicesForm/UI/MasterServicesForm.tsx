import React, { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { FormTitle, FormFooter, SelectField, LabeledInputField } from '@/components';

type Option = {
    label: string;
    value: string;
};

type ServiceFormData = {
    service: Option | null;
    serviceType: Option | null;
    duration: string;
    price: string;
    description: string;
};

type MasterServicesFormProps = {
    onClose: () => void;
    onSubmit?: (data: ServiceFormData) => void;
    initialData?: Partial<ServiceFormData>;
};

const SERVICE_OPTIONS: Option[] = [
    { label: 'Маникюр', value: 'manicure' },
    { label: 'Педикюр', value: 'pedicure' },
    { label: 'Маска для рук', value: 'hand_mask' },
];

const SERVICE_TYPE_OPTIONS: Option[] = [
    { label: 'Комплексный', value: 'complex' },
    { label: 'Базовый', value: 'basic' },
    { label: 'Премиум', value: 'premium' },
];

const MasterServicesForm: React.FC<MasterServicesFormProps> = ({
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<ServiceFormData>({
        service: initialData?.service || null,
        serviceType: initialData?.serviceType || null,
        duration: initialData?.duration || '',
        price: initialData?.price || '',
        description: initialData?.description || '',
    });

    const handleServiceChange = useCallback((option: Option | null) => {
        setFormData((prev) => ({ ...prev, service: option }));
    }, []);

    const handleServiceTypeChange = useCallback((option: Option | null) => {
        setFormData((prev) => ({ ...prev, serviceType: option }));
    }, []);

    const handleInputChange = useCallback(
        (field: keyof ServiceFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <div className={styles.servicesOverlay}>
            <form className={styles.servicesForm} onSubmit={handleFormSubmit}>
                <FormTitle title="Редактировать поле Услуги и цены" onClose={onClose} />

                <div className={styles.servicesWrapper}>
                    <div className={styles.serviceBlock}>
                        <SelectField
                            label="Услуга"
                            options={SERVICE_OPTIONS}
                            value={formData.service}
                            onChange={handleServiceChange}
                            placeholder="Выберите услугу"
                        />
                    </div>

                    <div className={styles.serviceDetailsBlock}>
                        <SelectField
                            label="Тип услуги"
                            options={SERVICE_TYPE_OPTIONS}
                            value={formData.serviceType}
                            onChange={handleServiceTypeChange}
                            placeholder="Выберите тип услуги"
                        />

                        <LabeledInputField
                            label="Длительность"
                            placeholder="ЧЧ:ММ"
                            value={formData.duration}
                            onChange={handleInputChange('duration')}
                            hint="введите в формате ЧЧ:ММ"
                        />

                        <LabeledInputField
                            label="Цена"
                            placeholder="Введите цену"
                            value={formData.price}
                            onChange={handleInputChange('price')}
                            hint="Цена не может содержать более 7 символов"
                            maxLength={7}
                        />

                        <LabeledInputField
                            label="Описание услуги"
                            placeholder="введите описание услуги"
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            maxLength={250}
                        />
                    </div>

                    <FormFooter onCancel={onClose} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterServicesForm };
