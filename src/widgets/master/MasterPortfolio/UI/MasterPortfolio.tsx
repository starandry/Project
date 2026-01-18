import React, { useState } from 'react';
import { Button, SvgIcon } from '@/shared/ui';
import { ServiceCardSlider } from '@/widgets/media';
import { MasterPortfolioForm } from '@/features/master-forms';
import Edit from '@/shared/assets/icons/Edit.svg?react';
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
                <div className="flex-between">
                    <h2 className="card-title">Портфолио</h2>
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
