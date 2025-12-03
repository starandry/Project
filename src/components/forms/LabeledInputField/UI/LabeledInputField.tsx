import React from 'react';
import { Input } from '@/components';
import styles from './index.module.scss';

type LabeledInputFieldProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
};

const LabeledInputField: React.FC<LabeledInputFieldProps> = ({
                                                                 label,
                                                                 placeholder,
                                                                 type,
                                                                 onChange,
                                                             }) => {
    return (
        <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>
                {label}
            </label>

            <Input
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="formInput"
            />
        </div>
    );
};

export { LabeledInputField };
