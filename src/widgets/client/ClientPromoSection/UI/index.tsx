import styles from './index.module.scss';
import HeartBenefits from '@/shared/assets/icons/HeartBenefits.svg?react';
import { SvgIcon } from '@/shared/ui';
import React from 'react';
import { clientIntroContent } from '@/widgets/master/MasterClientIntro/model/masterClientIntroContent';
import { MasterClientIntro } from '@/widgets/master/MasterClientIntro';

const ClientPromoSection = () => {
    return (
        <section className={`flex-between ${styles.section}`}>
            <div className={`flex-center ${styles.promoCircle}`}>
                <SvgIcon Icon={HeartBenefits} className="heartPromoClient" />
                <p className={styles.textPromoClient}>
                    Найди своего лучшего мастрера по ногтевому сервису на портале "Твой мастер
                    маникюра"
                </p>
            </div>
            <MasterClientIntro {...clientIntroContent} />
        </section>
    );
};

export { ClientPromoSection };
