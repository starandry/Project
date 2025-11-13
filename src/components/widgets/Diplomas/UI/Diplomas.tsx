import React from 'react';
import { ImageUploaderContainer, SvgIcon } from '@/components';
import Edit from '@/assets/icons/Edit.svg?react';
import styles from './index.module.scss';

const Diplomas: React.FC = () => {
    return (
        <section className={styles.diplomasWrapper}>
            <p className={styles.titleRowDiplomas}>
                <h2 className={styles.title}>Сертификаты и дипломы</h2>
                <SvgIcon Icon={Edit} />
            </p>
            <div className={styles.grid}>
                <ImageUploaderContainer />
            </div>
        </section>
    );
};

export { Diplomas };
