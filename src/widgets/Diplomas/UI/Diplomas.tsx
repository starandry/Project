import React, { useState } from 'react';
import { Button, ImageUploaderContainer, SvgIcon } from '@/shared/ui';
import { MasterDiplomasForm } from '@/features/master-forms';
import Edit from '@/shared/assets/icons/Edit.svg?react';
import Check from '@/shared/assets/icons/Check.svg?react';
import styles from './index.module.scss';

const Diplomas: React.FC = () => {
    const [isFormShown, setIsFormShown] = useState(false);

    return (
        <section className="card-18">
            <div className="card-header">
                <h2 className="card-title">Сертификаты и дипломы</h2>
                <Button
                    classNames={{ buttonClass: 'editButton' }}
                    onClick={() => setIsFormShown(true)}
                >
                    <SvgIcon Icon={Edit} />
                </Button>
            </div>
            <ul>
                <li className={`flex-between ${styles.grid}`}>
                    <SvgIcon Icon={Check} className="check" />
                    <ImageUploaderContainer />
                    <div className={styles.diplomaInfo}>
                        <p className={styles.textDiplomas}>
                            Здесь будет информация о ваших сертификатах
                        </p>
                        <p className={styles.descDiplomas}>данные сертификата</p>
                    </div>
                    <div className={`flex-col-6 ${styles.diplomasYearBlock}`}>
                        <p className={styles.labelDiplomas}>дата выдачи</p>
                        <p className={styles.years}>
                            <span className={styles.year}>месяц</span>
                            <span className={styles.year}>ГГГГ</span>
                        </p>
                    </div>
                </li>
            </ul>
            {isFormShown && <MasterDiplomasForm onClose={() => setIsFormShown(false)} />}
        </section>
    );
};

export { Diplomas };
