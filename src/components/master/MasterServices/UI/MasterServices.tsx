import React from 'react';
/*import Edit from '@/assets/icons/Edit.svg?react';*/
import Check from '@/assets/icons/Check.svg?react';
import { SvgIcon, MasterServicesForm } from '@/components';
import styles from './index.module.scss';
import { MasterServicesProps } from '../model/masterServicesTypes';

export const MasterServices: React.FC<MasterServicesProps> = ({
    services,
    isEditing,
    onChange,
    onAdd,
    onRemove,
    onSave,
    onCancel,
}) => {
    return (
        <div className={styles.servicesCard}>
            <h2 className={styles.title}>Услуги и цены</h2>
                {/*<Button onClick={onEdit} classNames={{ buttonClass: 'editButton' }}>
                    <SvgIcon Icon={Edit} />
                </Button>*/}
            {isEditing ? (
                <MasterServicesForm
                    services={services}
                    onChange={onChange}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : (
                <ul className={styles.servicesList}>
                    {services.map((item, index) => (
                        <li key={index} className={styles.servicesItem}>
                            <div className={styles.itemContent}>
                                <SvgIcon Icon={Check} className="check" />
                                <div className={styles.serviceInfo}>
                                    <h3 className={styles.serviceTitle}>Услуга</h3>
                                    <p className={styles.serviceText}>{item.title}</p>
                                    <p className={styles.serviceDesc}>{item.description}</p>
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
                    ))}
                </ul>
            )}
        </div>
    );
};
