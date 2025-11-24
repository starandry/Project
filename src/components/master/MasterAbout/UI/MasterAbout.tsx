import React from 'react';
import Edit from '@/assets/icons/Edit.svg?react';
import styles from './index.module.scss';
import { MasterAboutForm, SvgIcon, Button } from '@/components';

export const MasterAbout: React.FC = () => {
    return (
        <div className={styles.aboutCard}>
            <div className={styles.header}>
                <h2 className={styles.title}>О себе</h2>
                <Button classNames={{ buttonClass: 'editButton' }}>
                    <SvgIcon Icon={Edit} />
                </Button>
            </div>
            <MasterAboutForm />
        </div>
    );
};
