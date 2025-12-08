import styles from './index.module.scss';
import React from 'react';
import { ImageUploaderContainer } from '@/components';

type LabeledInputFieldProps = {
    label: string;
};

const ImageUploadField: React.FC<LabeledInputFieldProps> = ({ label }) => {
    return (
        <div className={styles.wrapperImgUpload}>
            <label className={styles.fieldLabel}>{label}</label>
            <div className={styles.uploadField}>
                <ImageUploaderContainer />
            </div>
        </div>
    );
};

export { ImageUploadField };
