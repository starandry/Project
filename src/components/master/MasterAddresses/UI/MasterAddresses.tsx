import React from 'react';
import Edit from '@/assets/icons/Edit.svg?react';
import Home from '@/assets/icons/Home.svg?react';
import Car from '@/assets/icons/Car.svg?react';
import { SvgIcon, Button, MasterAdressesForm } from '@/components';
import styles from './index.module.scss';
import { MasterAddressesProps } from '../model/masterAddressesTypes';

export const MasterAddresses: React.FC<MasterAddressesProps> = ({
    addresses,
    isEditing,
    onEdit,
    onChange,
    onAdd,
    onRemove,
    onSave,
    onCancel,
}) => {
    const hasVisibleData = addresses.some((item) => item.address.trim() || item.region.trim());

    return (
        <div className={styles.addressCard}>
            <h2 className={styles.title}>Адреса и районы проведения услуг</h2>

            {isEditing ? (
                <MasterAdressesForm
                    addresses={addresses}
                    onChange={onChange}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : (
                hasVisibleData && (
                    <ul>
                        {addresses.map((item, index) => {
                            const hasAddress = item.address.trim();
                            const hasRegion = item.region.trim();

                            if (!hasAddress && !hasRegion) return null;

                            return (
                                <li key={index} className={styles.addressItem}>
                                    {hasAddress && (
                                        <>
                                            <div className={styles.addressLabelWrapper}>
                                                <h3 className={styles.addressLabel}>Адрес</h3>
                                                <Button
                                                    onClick={onEdit}
                                                    classNames={{ buttonClass: 'editButton' }}
                                                >
                                                    <SvgIcon Icon={Edit} />
                                                </Button>
                                            </div>
                                            <div className={styles.addressRow}>
                                                <SvgIcon Icon={Home} />
                                                <p className={styles.addressText}>{item.address}</p>
                                            </div>
                                        </>
                                    )}
                                    {hasRegion && (
                                        <>
                                            <div className={styles.regionLabelWrapper}>
                                                <h3 className={styles.regionLabel}>
                                                    Выезд к клиенту
                                                </h3>
                                                <Button
                                                    onClick={onEdit}
                                                    classNames={{ buttonClass: 'editButton' }}
                                                >
                                                    <SvgIcon Icon={Edit} />
                                                </Button>
                                            </div>
                                            <div className={styles.addressRow}>
                                                <SvgIcon Icon={Car} />
                                                <p className={styles.regionText}>{item.region}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )
            )}
        </div>
    );
};
