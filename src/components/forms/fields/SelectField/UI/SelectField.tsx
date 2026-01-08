import React from 'react';
import styles from './index.module.scss';
import { SelectInput } from '@/components';

type Option = {
    label: string;
    value: string;
};

type SelectFieldProps = {
    label: string;
    options: Option[];
    value?: Option | null;
    onChange?: (option: Option | null) => void;
    placeholder?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className={styles.selectFieldWrapper}>
            <label className={styles.selectFieldLabel}>{label}</label>
            <SelectInput
                value={value}
                onChange={onChange || (() => {})}
                options={options}
                placeholder={placeholder}
            />
        </div>
    );
};

export { SelectField };