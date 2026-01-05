import styles from './index.module.scss';
import HeartBenefits from '@/assets/icons/HeartBenefits.svg?react';
import { SvgIcon } from '@/components';
import React from 'react';
import { clientIntroContent } from '@/components/master/MasterClientIntro/model/masterClientIntroContent.tsx';
import { MasterClientIntro } from '@/components/master/MasterClientIntro';

const ClientPromoSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.promoCircle}>
                <SvgIcon Icon={HeartBenefits} className="heartPromoClient" />
                <p className={styles.textPromoClient}>
                    Найди своего лучшего мастрера по ногтевому сервису на портале “Твой мастер
                    маникюра”
                </p>
            </div>
            <MasterClientIntro {...clientIntroContent} />
        </section>
    );
};

export { ClientPromoSection };
