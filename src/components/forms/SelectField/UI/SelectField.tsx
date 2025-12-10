import React from 'react';
import styles from './index.module.scss';
import { SelectInput } from '@/components';

type selectFieldProps = {
    label: string;
};

type Option = {
    label: string;
    value: string;
};

const serviceOptions: Option[] = [
    { label: "Маникюр", value: "manicure" },
    { label: "Педикюр", value: "pedicure" },
    { label: "Массаж рук", value: "hand_massage" }
];

const SelectField: React.FC<selectFieldProps> = ({ label }) => {
    return (
        <div className={styles.selectFieldWrapper}>
            <label className={styles.selectFieldLabel}>{label}</label>
            <SelectInput onChange={()=>{}} options={serviceOptions} />
        </div>
    );
};

export { SelectField };