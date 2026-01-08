import React from 'react';
import Edit from '@/assets/icons/Edit.svg?react';
import styles from './index.module.scss';
import { MasterAboutForm, SvgIcon, Button } from '@/components';

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
