import React, { useState } from 'react';
import { Button, ServiceCardSlider, SvgIcon, MasterPortfolioForm } from '@/components';
import Edit from '@/assets/icons/Edit.svg?react';
import styles from './index.module.scss';

const MasterPortfolio: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmit = (data: { title: string; description: string }) => {
        console.log('Portfolio data:', data);
        setIsFormOpen(false);
    };

    return (
        <>
            <section className={styles.portfolio}>
                <div className={styles.headerPortfolioWrappp}>
                    <h2 className={styles.title}>Портфолио</h2>
                    <Button classNames={{ buttonClass: 'editButton' }} onClick={handleOpenForm}>
                        <SvgIcon Icon={Edit} />
                    </Button>
                </div>
                <ServiceCardSlider />
            </section>

            {isFormOpen && (
                <MasterPortfolioForm
                    onClose={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export { MasterPortfolio };
