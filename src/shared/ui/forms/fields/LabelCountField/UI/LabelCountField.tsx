import React, { useState } from 'react';
import styles from './index.module.scss';

type LabeledInputFieldProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    maxLength?: number;
    value?: string;
};

const LabelCountField: React.FC<LabeledInputFieldProps> = ({
    label,
    placeholder,
    onChange,
    maxLength = 1000,
    value = '',
}) => {
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange(e);
    };

    return (
        <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>{label}</label>
            <textarea
                className={styles.duties}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                maxLength={maxLength}
                rows={2}
            />
            <span className={styles.counter}>{charCount}/{maxLength}</span>
        </div>
    );
};

export { LabelCountField };
