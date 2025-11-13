import React from 'react';
import { ImageUploaderContainer, SvgIcon } from '@/components';
import Edit from '@/assets/icons/Edit.svg?react';
import Check from '@/assets/icons/Check.svg?react';
import styles from './index.module.scss';

const Diplomas: React.FC = () => {
    return (
        <section className={styles.diplomasWrapper}>
            <div className={styles.titleRowDiplomas}>
                <h2 className={styles.title}>Сертификаты и дипломы</h2>
                <SvgIcon Icon={Edit} />
            </div>
            <ul>
                <li className={styles.grid}>
                    <SvgIcon Icon={Check} className="check" />
                    <ImageUploaderContainer />
                    <div className={styles.diplomaInfo}>
                        <p className={styles.textDiplomas}>
                            Здесь будет информация о ваших сертификатах
                        </p>
                        <p className={styles.descDiplomas}>данные сертификата</p>
                    </div>
                    <div className={styles.diplomasYearBlock}>
                        <p className={styles.labelDiplomas}>дата выдачи</p>
                        <p className={styles.years}>
                            <span className={styles.year}>месяц</span>
                            <span className={styles.year}>ГГГГ</span>
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    );
};

export { Diplomas };
