import React, { useRef } from 'react';
import { FormTitle, FormFooter, SvgIcon } from '@/components';
import Edit from '@/assets/icons/Edit.svg?react';
import Delete from '@/assets/icons/Delete.svg?react';
import styles from './PhotoEditModal.module.scss';

type PhotoEditModalProps = {
    photoPreview: string | null;
    onClose: () => void;
    onSave: (file: File | null) => void;
    onDelete: () => void;
};

export const PhotoEditModal: React.FC<PhotoEditModalProps> = ({
    photoPreview,
    onClose,
    onSave,
    onDelete,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(photoPreview);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleDeleteClick = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleSave = () => {
        if (previewUrl === null) {
            onDelete();
        } else if (selectedFile) {
            onSave(selectedFile);
        }
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <FormTitle title="Фото профайла" onClose={onClose} />

                <div className={styles.photoContainer}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.hiddenInput}
                    />

                    <div className={styles.actionsRow}>
                        <button
                            type="button"
                            className={styles.actionButton}
                            onClick={handleEditClick}
                        >
                            <SvgIcon Icon={Edit} />
                            <span>редактировать</span>
                        </button>

                        <button
                            type="button"
                            className={styles.actionButton}
                            onClick={handleDeleteClick}
                        >
                            <SvgIcon Icon={Delete} />
                            <span>удалить</span>
                        </button>
                    </div>

                    <div className={styles.photoWrapper}>
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Фото профиля"
                                className={styles.photoPreview}
                            />
                        ) : (
                            <div className={styles.noPhoto}>Нет фото</div>
                        )}
                    </div>

                    <p className={styles.photoHint}>
                        Допустимо использовать файлы не более 500KB
                    </p>
                </div>

                <FormFooter
                    onCancel={onClose}
                    onSubmit={handleSave}
                    cancelText="Отменить"
                    submitText="Сохранить"
                />
            </div>
        </div>
    );
};
