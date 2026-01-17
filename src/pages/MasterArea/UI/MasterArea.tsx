import React from 'react';
import {
    MasterSidebar,
    MasterProfileContainer,
    ScheduleContainer,
    MasterAboutContainer,
    MasterEducationContainer,
    MasterAddressesContainer,
    MasterServicesContainer,
    MasterExperienceContainer,
    Diplomas,
    MasterPortfolio,
} from '@/components';
import { Main, AppLayout } from '@/layouts';
import styles from './index.module.scss';
import type { MasterAreaProps } from '@/pages/MasterArea/index.model.ts';

const MasterArea: React.FC<MasterAreaProps> = () => {
    return (
        <AppLayout>
            <Main>
                <div className="bg-white">
                    <div className="container">
                        <div className={styles.masterProfileSection}>
                            <MasterSidebar />

                            <div className={styles.wrappMainPanel}>
                                <div className={`flex-between ${styles.mainPanel}`}>
                                    <MasterProfileContainer />
                                    <ScheduleContainer />
                                </div>

                                <div className={`flex-col-24 ${styles.wrappAboutCard}`}>
                                    <MasterAboutContainer />
                                    <MasterEducationContainer />
                                    <MasterExperienceContainer />
                                    <Diplomas />
                                    <MasterAddressesContainer />
                                    <MasterServicesContainer />
                                    <MasterPortfolio />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        </AppLayout>
    );
};

export { MasterArea };
