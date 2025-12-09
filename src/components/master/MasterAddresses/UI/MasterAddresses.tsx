import React, { useState } from 'react';
import Edit from '@/assets/icons/Edit.svg?react';
import Home from '@/assets/icons/Home.svg?react';
import Car from '@/assets/icons/Car.svg?react';
import { SvgIcon, Button, MasterServiceAddressForm, MasterVisitAddressForm } from '@/components';
import styles from './index.module.scss';

export const MasterAddresses: React.FC = () => {
    const [isServiceAddressShown, setServiceAddressShown] = useState(false);
    const [isVisitAddressShown, setVisitAddressShown] = useState(false);

    return (
        <div className={styles.addressCard}>
            <h2 className={styles.title}>Адреса и районы проведения услуг</h2>
            <div className={styles.addressItem}>
                <ul>
                    <li>
                        <div className={styles.addressLabelWrapper}>
                            <h3 className={styles.addressLabel}>Адрес</h3>
                            <Button
                                classNames={{ buttonClass: 'editButton' }}
                                onClick={() => setServiceAddressShown(true)}
                            >
                                <SvgIcon Icon={Edit} />
                            </Button>
                        </div>
                        <div className={styles.addressRow}>
                            <SvgIcon Icon={Home} />
                            <p className={styles.addressText}>Добавьте адрес проведения услуг</p>
                        </div>
                    </li>
                </ul>

                <ul>
                    <li>
                        <div className={styles.regionLabelWrapper}>
                            <h3 className={styles.regionLabel}>Выезд к клиенту</h3>
                            <Button
                                classNames={{ buttonClass: 'editButton' }}
                                onClick={() => setVisitAddressShown(true)}
                            >
                                <SvgIcon Icon={Edit} />
                            </Button>
                        </div>
                        <div className={styles.addressRow}>
                            <SvgIcon Icon={Car} />
                            <p className={styles.regionText}>Добавьте район/город для выезда</p>
                        </div>
                    </li>
                </ul>
            </div>
            {isServiceAddressShown && (
                <MasterServiceAddressForm onClose={() => setServiceAddressShown(false)} />
            )}
            {isVisitAddressShown && (
                <MasterVisitAddressForm onClose={() => setVisitAddressShown(false)} />
            )}
        </div>
    );
};
