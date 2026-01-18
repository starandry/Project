import React from 'react';
import { SvgIcon, ExternalLink } from '@/shared/ui';
import VK from '@/shared/assets/icons/VK.svg?react';
import Youtube from '@/shared/assets/icons/Youtube.svg?react';
import styles from './index.module.scss';
import type { SupportInfoProps } from '../index.model';

const SupportInfo: React.FC<SupportInfoProps> = ({
    email = 'support@dvesoroki.by',
    workHours = { weekdays: 'с 8 до 22', weekends: 'с 9 до 22' },
}) => {
    return (
        <div className={styles.supportInfo}>
            <p className={styles.itemSupport}>Служба поддержки:</p>

            <p className={styles.emailSupport}>
                <ExternalLink href={`mailto:${email}`} classNames={{ linkClass: 'supportEmail' }}>
                    {email}
                </ExternalLink>
            </p>

            <p className={styles.itemSupport}>Будни: {workHours.weekdays}</p>
            <p className={styles.itemSupport}>Выходные: {workHours.weekends}</p>

            <div className={styles.supportSocials}>
                <ExternalLink href="https://vk.com">
                    <SvgIcon Icon={VK} className="iconSupport" />
                </ExternalLink>
                <ExternalLink href="https://youtube.com">
                    <SvgIcon Icon={Youtube} className="iconSupport" />
                </ExternalLink>
            </div>
        </div>
    );
};

export { SupportInfo };
