import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, SvgIcon } from '@/shared/ui';
import { MasterEditForm } from '@/features/master-forms';
import Avatar from '@/shared/assets/icons/Avatar.svg?react';
import Edit from '@/shared/assets/icons/Edit.svg?react';
import { useGetMasterProfileQuery } from '@/features/master/api/masterProfileApi';
import { RootState } from '@/app/providers';
import styles from './index.module.scss';

export const MasterProfileCard: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const profileId = useSelector((state: RootState) => state.auth.profileId);
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
                        <p className={styles.masterName}>
                            {profile?.name || 'Маргарита Чернышова'}
                        </p>
                    </div>
                    <div className={`flex-between ${styles.infoItem}`}>
                        <p className={styles.masterEmail}>
                            {profile?.user?.email || 'margarita.chernushova@gmail.com'}
                        </p>
                    </div>
                    <div className={`flex-between ${styles.infoItem}`}>
                        <p className={styles.masterPhone}>{profile?.phone || '89-99--078'}</p>
                    </div>
                </div>
            </div>

            {isEditing && <MasterEditForm onCancel={handleCancel} onSaved={handleSaved} />}
        </>
    );
};
