import styles from '@/components/master/MasterClientIntro/UI/index.module.scss';
import { LinkButton } from '@/components';
import React from 'react';

type MasterClientIntroProps = {
    title: string;
    desc: React.ReactNode;
    textLink: string;
    textDomen: string;
};

const MasterClientIntro: React.FC<MasterClientIntroProps> = ({
    title,
    desc,
    textLink,
    textDomen,
}) => {
    return (
        <div className={`flex-col ${styles.promoContent}`}>
            <h2 className={`flex ${styles.title}`}>{title}</h2>
            {desc}
            <LinkButton to={textDomen} className="linkMasterClientPromo">
                {textLink}
            </LinkButton>
        </div>
    );
};

export { MasterClientIntro };
