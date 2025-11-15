import React from 'react';
import { Button, ServiceCardSlider, SvgIcon } from '@/components';
import Edit from '@/assets/icons/Edit.svg?react';
import styles from './index.module.scss';

const MasterPortfolio: React.FC = () => {
    return (
        <section className={styles.portfolio}>
            <div className={styles.headerPortfolioWrappp}>
                <h2 className={styles.title}>Портфолио</h2>
                <Button classNames={{ buttonClass: 'editButton' }}>
                    <SvgIcon Icon={Edit} />
                </Button>
            </div>
            <ServiceCardSlider />
        </section>
    );
};

export { MasterPortfolio };
