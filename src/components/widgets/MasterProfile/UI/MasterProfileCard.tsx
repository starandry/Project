import React from 'react';
import { Button, SvgIcon, MasterEditForm } from '@/components';
import Avatar from '@/assets/icons/Avatar.svg?react';
import Edit from '@/assets/icons/Edit.svg?react';
import styles from './index.module.scss';

export const MasterProfileCard: React.FC = () => {
    const temp =  false;

    return (
        <div className={styles.masterProfileCard}>
            <div className={styles.cardHeader}>
                {temp ? (
                    <img alt="Фото мастера" className={styles.profilePhoto} />
                ) : (
                    <div className={styles.avatarWrapper}>
                        <SvgIcon Icon={Avatar} />
                    </div>
                )}
                <h2 className={styles.title}>Мой профиль</h2>
                <Button classNames={{ buttonClass: 'editButton' }}>
                    <SvgIcon Icon={Edit} />
                </Button>
            </div>

            <div className={styles.infoGroup}>
                <div className={styles.infoItem}>
                    <p className={styles.masterName}>Маргарита Чернышова</p>
                    <Button  classNames={{ buttonClass: 'editButton' }}>
                        <SvgIcon Icon={Edit} />
                    </Button>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.masterEmail}>margarita.chernushova@gmail.com</p>
                    <Button classNames={{ buttonClass: 'editButton' }}>
                        <SvgIcon Icon={Edit} />
                    </Button>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.masterPhone}>89-99--078</p>
                    <Button classNames={{ buttonClass: 'editButton' }}>
                        <SvgIcon Icon={Edit} />
                    </Button>
                </div>
            </div>
            <MasterEditForm />
        </div>
    );
};
