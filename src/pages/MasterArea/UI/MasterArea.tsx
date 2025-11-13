import React from 'react';
/*import { useParams } from 'react-router-dom';*/
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
import { useAppSelector } from '@/hooks/reduxHooks';
import styles from './index.module.scss';
import type { MasterAreaProps } from '@/pages/MasterArea/index.model.ts';

const MasterArea: React.FC<MasterAreaProps> = () => {
    // Это вызов, чтобы подписаться на часть состояния (опыт мастера)
    useAppSelector((state) => state.master.experience);
    /*const { id } = useParams();*/ // будет "4", если адрес /master-profiles/4/

    return (
        <AppLayout>
            <Main>
                <div className="bg-white">
                    <div className="container">
                        <div className={styles.masterProfileSection}>
                            <MasterSidebar />

                            <div className={styles.wrappMainPanel}>
                                <div className={styles.mainPanel}>
                                    <MasterProfileContainer />
                                    <ScheduleContainer />
                                </div>

                                <div className={styles.wrappAboutCard}>
                                    <MasterAboutContainer />
                                    <MasterEducationContainer />
                                    <MasterExperienceContainer index={0} />
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
