import React from 'react';
import Edit from '@/shared/assets/icons/Edit.svg?react';
import styles from './index.module.scss';
import { SvgIcon, Button } from '@/shared/ui';
import { MasterAboutForm } from '@/features/master-forms';

export const MasterAbout: React.FC = () => {
    const defaultAboutText = 'Введите данные о себе.';
    const [isEditing, setIsEditing] = React.useState(false);

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
            {!isEditing && <p className={styles.text}>{defaultAboutText}</p>}
            {isEditing && (
                <MasterAboutForm onCancel={() => setIsEditing(false)} onSaved={() => {}} />
            )}
        </div>
    );
};
