import React, { useState } from 'react';
import Edit from '@/assets/icons/Edit.svg?react';
import Home from '@/assets/icons/Home.svg?react';
import Car from '@/assets/icons/Car.svg?react';
import { SvgIcon, Button, MasterAdressesForm } from '@/components';
import styles from './index.module.scss';

export const MasterAddresses: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleOpenForm = () => {
        setIsEditing(true);
    };

    return (
        <div className={styles.addressCard}>
            <h2 className={styles.title}>Адреса и районы проведения услуг</h2>

            {isEditing ? (
                // ПУСТАЯ ФОРМА, без логики адресов
                <MasterAdressesForm />
            ) : (
                // КАРТИНКА/ПРЕВЬЮ ДО ОТКРЫТИЯ ФОРМЫ
                <ul>
                    <li className={styles.addressItem}>
                        <div className={styles.addressLabelWrapper}>
                            <h3 className={styles.addressLabel}>Адрес</h3>
                            <Button
                                onClick={handleOpenForm}
                                classNames={{ buttonClass: 'editButton' }}
                            >
                                <SvgIcon Icon={Edit} />
                            </Button>
                        </div>
                        <div className={styles.addressRow}>
                            <SvgIcon Icon={Home} />
                            <p className={styles.addressText}>Добавьте адрес проведения услуг</p>
                        </div>

                        <div className={styles.regionLabelWrapper}>
                            <h3 className={styles.regionLabel}>Выезд к клиенту</h3>
                            <Button
                                onClick={handleOpenForm}
                                classNames={{ buttonClass: 'editButton' }}
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
            )}
        </div>
    );
};
