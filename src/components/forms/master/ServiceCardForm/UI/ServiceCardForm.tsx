import React from 'react';
import { Input, Button } from '@/components';
import styles from './inedx.module.scss';
import type { ServiceFormData } from '../index.model';

type Props = {
    data: ServiceFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
};

const ServiceCardForm: React.FC<Props> = ({
    data,
    onChange,
    onImageUpload,
    onSubmit,
    onCancel,
}) => {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <Input type="file" accept="image/*" onChange={onImageUpload} />

            <Input
                type="text"
                name="name"
                placeholder="Наименование"
                value={data.name}
                onChange={onChange}
            />
            <Input
                type="text"
                name="coating"
                placeholder="Покрытие"
                value={data.coating}
                onChange={onChange}
            />
            <Input
                type="text"
                name="design"
                placeholder="Дизайн"
                value={data.design}
                onChange={onChange}
            />
            <Input
                type="text"
                name="address"
                placeholder="Адрес"
                value={data.address}
                onChange={onChange}
            />
            <Input
                type="text"
                name="price"
                placeholder="Цена"
                value={data.price}
                onChange={onChange}
            />

            <div className={styles.buttonGroup}>
                <Button type="button" onClick={onSubmit}>
                    Сохранить
                </Button>
                <Button type="button" onClick={onCancel}>
                    Отмена
                </Button>
            </div>
        </form>
    );
};

export { ServiceCardForm };
