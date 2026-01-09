import React from 'react';
import { SvgIcon, ExternalLink } from '@/components';
import Viber from '../../../../assets/icons/Viber.svg?react';
import WhatsApp from '../../../../assets/icons/WhatsApp.svg?react';
import styles from './inedx.module.scss';

const HelpSection: React.FC = () => {
    return (
        <div className={`flex-col flex-center ${styles.wrappHelpSection}`}>
            <h2 className={styles.titleHelp}>Возникли вопросы?</h2>
            <p className={styles.subtitleHelp}>Свяжитесь с нами в мессенджерах:</p>
            <div className={styles.iconsHelp}>
                <ExternalLink
                    href="viber://chat?number=%2B1234567890"
                    classNames={{ linkClass: 'viberLink' }}
                >
                    <SvgIcon Icon={Viber} />
                </ExternalLink>
                <ExternalLink
                    href="https://wa.me/1234567890"
                    classNames={{ linkClass: 'whatsAppLink' }}
                >
                    <SvgIcon Icon={WhatsApp} />
                </ExternalLink>
            </div>
        </div>
    );
};

export { HelpSection };
