import React from 'react';
import Upload from '@/shared/assets/icons/Upload.svg?react';
import { SvgIcon, Input } from '@/shared/ui';
import styles from './index.module.scss';
import { ImageUploaderProps } from '../model/imageUploaderTypes';

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    preview,
    onTriggerUpload,
    inputRef,
    onImageUpload,
}) => (
    <div className={`flex-center ${styles.wrapper}`} onClick={onTriggerUpload}>
        {preview ? (
            <img src={preview} alt="Preview" className={styles.thumbnail} />
        ) : (
            <div className={`flex-center ${styles.uploadArea}`}>
                <SvgIcon Icon={Upload} />
            </div>
        )}

        <Input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            ref={inputRef}
            style={{ display: 'none' }}
        />
    </div>
);
