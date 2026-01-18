import React from 'react';
import Placeholder from '@/shared/assets/icons/PlaceholderPortfolio.svg?react';
import Edit from '@/shared/assets/icons/Edit.svg?react';
import { SvgIcon, Picture, Button } from '@/shared/ui';
import { ServiceCardForm } from '../../ServiceCardForm';
import styles from './index.module.scss';
import { ServiceCardProps } from '../model/serviceCardTypes';

export const ServiceCard: React.FC<ServiceCardProps> = ({
    formData,
    tempData,
    hovered,
    uploadMode,
    setHovered,
    setUploadMode,
    setTempData,
    onInputChange,
    onImageUpload,
    onSubmit,
    onClear,
}) => {
    const hasImage = formData.image !== '';

    return (
        <div
            className={styles.wrapServCard}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.imgSection}>
                {hasImage ? (
                    <div className={styles.wrappPicture}>
                        <Picture src={formData.image} alt="preview" className="picture" />
                        {hovered && (
                            <>
                                <Button
                                    onClick={onClear}
                                    classNames={{ buttonClass: 'actionIcon' }}
                                >
                                    <SvgIcon Icon={Edit} className="editUpload" />
                                </Button>
                                <Button
                                    classNames={{ buttonClass: 'textButton' }}
                                    onClick={() => {
                                        setUploadMode(true);
                                        setTempData(formData);
                                    }}
                                >
                                    редактировать
                                </Button>
                            </>
                        )}
                    </div>
                ) : (
                    <div
                        className={`flex-center ${styles.wrappIcon}`}
                        onClick={() => {
                            setUploadMode(true);
                            setTempData(formData);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <SvgIcon Icon={Placeholder} />
                    </div>
                )}
            </div>

            {!uploadMode && (
                <div className={styles.infoBlock}>
                    <h3 className={styles.title}>{formData.name || '—'}</h3>
                    <div className={`flex ${styles.wrapDescPortf}`}>
                        <p className={styles.text}>{formData.desc || '—'}</p>
                        <p className={styles.text2}>{formData.text || '—'}</p>
                    </div>
                </div>
            )}

            {uploadMode && (
                <ServiceCardForm
                    data={tempData}
                    onChange={onInputChange}
                    onImageUpload={onImageUpload}
                    onSubmit={onSubmit}
                    onCancel={() => setUploadMode(false)}
                />
            )}
        </div>
    );
};
