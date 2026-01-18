import React, { useRef, useState } from 'react';
import { LabeledInputField, FormTitle, FormFooter, SvgIcon } from '@/shared/ui';
import { useMasterEditForm } from '../model/useMasterEditForm';
import { PhotoEditModal } from './PhotoEditModal';
import Upload from '@/shared/assets/icons/Upload.svg?react';
import styles from './index.module.scss';

type MasterEditFormProps = {
    onCancel?: () => void;
    onSaved?: () => void;
};

export const MasterEditForm: React.FC<MasterEditFormProps> = ({ onCancel, onSaved }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    const {
        formData,
        errors,
        handleNameChange,
        handleEmailChange,
        handlePhoneChange,
        handlePhotoChange,
        handlePhotoDelete,
        handleSubmit,
        handleCancel,
    } = useMasterEditForm({ onSaved, onCancel });

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handlePhotoChange(file);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoClick = () => {
        setIsPhotoModalOpen(true);
    };

    const handlePhotoModalClose = () => {
        setIsPhotoModalOpen(false);
    };

    const handlePhotoSave = (file: File | null) => {
        handlePhotoChange(file);
    };

    const handlePhotoDeleteFromModal = () => {
        handlePhotoDelete();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <form className="form-container" onSubmit={handleSubmit}>
                <FormTitle title="Заполните информацию Мой профиль" onClose={handleCancel} />

                <div className="flex-col-16">
                    <LabeledInputField
                        label="Имя"
                        placeholder="Введите ваше Имя"
                        value={formData.name}
                        onChange={handleNameChange}
                    />
                    {errors.name && <p className={styles.errorText}>{errors.name}</p>}

                    <LabeledInputField
                        label="Адрес электронной почты"
                        placeholder="Введите адрес электронной почты"
                        type="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email}</p>}

                    <LabeledInputField
                        label="Номер телефона"
                        placeholder="Введите номер телефона"
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                    />
                    {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}

                    <div className={styles.photoSection}>
                        <span className={styles.photoLabel}>Загрузите фотографию</span>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className={styles.hiddenInput}
                        />

                        {formData.photoPreview ? (
                            <div
                                className={styles.photoPreviewWrapper}
                                onClick={handlePhotoClick}
                            >
                                <img
                                    src={formData.photoPreview}
                                    alt="Фото профиля"
                                    className={styles.photoPreview}
                                />
                                <p className={styles.photoHint}>
                                    Допустимо использовать файлы не более 500KB
                                </p>
                            </div>
                        ) : (
                            <div className={styles.uploadArea} onClick={handleUploadClick}>
                                <div className={styles.uploadIcon}>
                                    <SvgIcon Icon={Upload} />
                                </div>
                            </div>
                        )}

                        {errors.photo && <p className={styles.errorText}>{errors.photo}</p>}
                    </div>

                    <FormFooter
                        onCancel={handleCancel}
                        onSubmit={() => {}}
                        cancelText="Отменить"
                        submitText="Сохранить"
                    />
                </div>
            </form>

            {isPhotoModalOpen && (
                <PhotoEditModal
                    photoPreview={formData.photoPreview}
                    onClose={handlePhotoModalClose}
                    onSave={handlePhotoSave}
                    onDelete={handlePhotoDeleteFromModal}
                />
            )}
        </div>
    );
};
