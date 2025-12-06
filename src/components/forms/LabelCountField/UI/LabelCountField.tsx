import React from 'react';
import styles from './index.module.scss';

type LabeledInputFieldProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
};

const LabelCountField: React.FC<LabeledInputFieldProps> = ({ label, placeholder, onChange }) => {
    return (
        <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>{label}</label>
            <textarea
                className={styles.duties}
                placeholder={placeholder}
                onChange={onChange}
                rows={2}
            />
            <span className={styles.counter}>10/1000</span>
        </div>
    );
};

export { LabelCountField };
