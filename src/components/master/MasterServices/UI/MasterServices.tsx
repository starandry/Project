import React from 'react';
import Edit from '@/assets/icons/Edit.svg?react';
import Check from '@/assets/icons/Check.svg?react';
import { SvgIcon, Button } from '@/components';
import styles from './index.module.scss';

export const MasterServices: React.FC = () => {
    return (
        <div className={styles.servicesCard}>
            <h2 className={styles.title}>Услуги и цены</h2>
            <ul className={styles.servicesList}>
                <li className={styles.servicesItem}>
                    <div className={styles.itemContent}>
                        <Button
                            classNames={{ buttonClass: 'editButton masterPrice' }}
                        >
                            <SvgIcon Icon={Edit} />
                        </Button>
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
        </div>
    );
};
