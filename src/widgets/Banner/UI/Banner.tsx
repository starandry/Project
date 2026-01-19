import React from 'react';
import { Button } from '@/shared/ui';
import styles from './index.module.scss';
import { UserType } from '../model/bannerTypes';

type BannerProps = {
    title: string;
    subtitle: string;
    description: string;
    activeUserType: UserType;
    onUserTypeChange: (type: UserType) => void;
};

export const Banner: React.FC<BannerProps> = ({
    title,
    subtitle,
    description,
    activeUserType,
    onUserTypeChange,
}) => {
    return (
        <div className={`flex-col ${styles.banner}`}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={`flex-col ${styles.descBlock}`}>
                <p className={styles.description}>{description}</p>
                <div className={styles.bannerActions}>
                    <Button
                        classNames={{
                            buttonClass:
                                activeUserType === 'master' ? 'activeButton' : 'inactiveButton',
                        }}
                        onClick={() => onUserTypeChange('master')}
                    >
                        <span>Мастерам</span>
                    </Button>
                    <Button
                        classNames={{
                            buttonClass:
                                activeUserType === 'client' ? 'activeButton' : 'inactiveButton',
                        }}
                        onClick={() => onUserTypeChange('client')}
                    >
                        <span>Клиентам</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
