import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, SvgIcon, SuccessModal } from '@/shared/ui';
import { MasterEditForm } from '@/features/master-forms';
import Avatar from '@/shared/assets/icons/Avatar.svg?react';
import Edit from '@/shared/assets/icons/Edit.svg?react';
import { useGetMasterProfileQuery } from '@/features/master/api/masterProfileApi';
import styles from './index.module.scss';

export const MasterProfileCard: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { id } = useParams<{ id: string }>();
    const profileId = id ? Number(id) : null;
    const temp = false;

    const {
        data: profile,
        isLoading,
        error,
    } = useGetMasterProfileQuery(profileId!, {
        skip: !profileId,
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSaved = () => {
        setIsEditing(false);
        setShowSuccess(true);
    };

    if (isLoading) {
        return <div className={`card ${styles.masterProfileCard}`}>Загрузка...</div>;
    }

    if (error) {
        console.error('Failed to fetch master profile', error);
    }

    return (
        <>
            <div className={`card ${styles.masterProfileCard}`}>
                <div className="card-header">
                    {temp ? (
                        <img alt="Фото мастера" className={styles.profilePhoto} />
                    ) : (
                        <div className={styles.avatarWrapper}>
                            <SvgIcon Icon={Avatar} />
                        </div>
                    )}
                    <h2 className="card-title">Мой профиль</h2>
                    <div className={styles.editButtonWrapper}>
                        <Button
                            classNames={{ buttonClass: 'editButton' }}
                            onClick={handleEditClick}
                        >
                            <SvgIcon Icon={Edit} />
                        </Button>
                    </div>
                </div>

                <div className={styles.infoGroup}>
                    <div className={`flex-between ${styles.infoItem}`}>
                        <p className={styles.masterName}>{profile?.user?.username}</p>
                    </div>
                    <div className={`flex-between ${styles.infoItem}`}>
                        <p className={styles.masterEmail}>{profile?.user?.email}</p>
                    </div>
                    <div className={`flex-between ${styles.infoItem}`}>
                        <p
                            className={
                                profile?.phone ? styles.masterPhone : styles.phonePlaceholder
                            }
                        >
                            {profile?.phone || 'Укажите номер телефона'}
                        </p>
                    </div>
                </div>
            </div>

            {isEditing && profileId && (
                <MasterEditForm
                    profileId={profileId}
                    onCancel={handleCancel}
                    onSaved={handleSaved}
                />
            )}

            {showSuccess && (
                <SuccessModal
                    message="Изменения успешно сохранены"
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </>
    );
};
