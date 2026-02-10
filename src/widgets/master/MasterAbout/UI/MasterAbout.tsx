import React from 'react';
import { useParams } from 'react-router-dom';
import Edit from '@/shared/assets/icons/Edit.svg?react';
import styles from './index.module.scss';
import { SvgIcon, Button, SuccessModal } from '@/shared/ui';
import { MasterAboutForm } from '@/features/master-forms';
import { useGetMasterProfileQuery } from '@/features/master/api/masterProfileApi';

export const MasterAbout: React.FC = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const { id } = useParams<{ id: string }>();
    const profileId = id ? Number(id) : null;

    const { data: profile } = useGetMasterProfileQuery(profileId!, {
        skip: !profileId,
    });

    const aboutText = profile?.about_master || 'Введите данные о себе.';

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">О себе</h2>
                <Button
                    classNames={{ buttonClass: 'editButton' }}
                    onClick={() => setIsEditing(true)}
                >
                    <SvgIcon Icon={Edit} />
                </Button>
            </div>
            {!isEditing && <p className={styles.text}>{aboutText}</p>}
            {isEditing && (
                <MasterAboutForm
                    profileId={profileId!}
                    onCancel={() => setIsEditing(false)}
                    onSaved={() => {
                        setIsEditing(false);
                        setShowSuccess(true);
                    }}
                />
            )}

            {showSuccess && (
                <SuccessModal
                    message="Изменения успешно сохранены"
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </div>
    );
};
