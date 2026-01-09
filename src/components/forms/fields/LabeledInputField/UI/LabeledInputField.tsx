import React from 'react';
import { Input } from '@/components';
import styles from './index.module.scss';

type LabeledInputFieldProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    value?: string;
    hint?: string;
    maxLength?: number;
};

const LabeledInputField: React.FC<LabeledInputFieldProps> = ({
    label,
    placeholder,
    type,
    onChange,
    value,
    hint,
    maxLength,
}) => {
    const currentLength = value?.length || 0;

    return (
        <div className={`flex-col-12 card-18 ${styles.fieldWrapper}`}>
            <label className={styles.fieldLabel}>{label}</label>

            <Input
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="formInput"
                value={value}
                maxLength={maxLength}
            />

            {(hint || maxLength) && (
                <div className={`flex-between ${styles.fieldHintRow}`}>
                    {hint && <span className={styles.fieldHint}>{hint}</span>}
                    {maxLength && (
                        <span className={styles.fieldCounter}>
                            {currentLength}/{maxLength}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export { LabeledInputField };
