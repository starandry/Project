import React, { useState } from 'react';
import BadgePlus from '@/shared/assets/icons/BadgePlus.svg?react';
import Check from '@/shared/assets/icons/Check.svg?react';
import { SvgIcon, Button } from '@/shared/ui';
import { MasterServicesForm } from '@/features/master-forms';
import styles from './index.module.scss';

export const MasterServices: React.FC = () => {
    const [isServicesShown, setServicesShown] = useState(false);

    return (
        <div className="card">
            <div className={styles.headerContainer}>
                <h2 className={styles.title}>Услуги и цены</h2>
                <Button
                    classNames={{ buttonClass: 'editButton' }}
                    onClick={() => setServicesShown(true)}
                >
                    <SvgIcon Icon={BadgePlus} />
                </Button>
            </div>
            <ul className={styles.servicesList}>
                <li className={styles.servicesItem}>
                    <div className={`flex-between ${styles.itemContent}`}>
                        <SvgIcon Icon={Check} className="check" />
                        <div className={styles.serviceInfo}>
                            <h3 className={styles.serviceTitle}>Услуга</h3>
                            <p className={styles.serviceText}>тип услуги</p>
                            <p className={styles.serviceDesc}>описание услуги</p>
                        </div>
                        <div className={styles.servicePriceBlock}>
                            <span className={styles.labelPrice}>цена</span>
                            <p className={styles.servicePrice}>$$$$$$$ руб.</p>
                        </div>
                        <div className={styles.servicePriceBlock}>
                            <span className={styles.labelPrice}>длительность</span>
                            <p className={styles.servicePrice}>ЧЧ:ММ</p>
                        </div>
                        <div className={styles.servicePriceBlock}>
                            <span className={styles.labelPrice}>перерыв</span>
                            <p className={styles.servicePrice}>ЧЧ:ММ</p>
                        </div>
                    </div>
                </li>
            </ul>
            {isServicesShown && (
                <MasterServicesForm onClose={() => setServicesShown(false)} />
            )}
        </div>
    );
};
