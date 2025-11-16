import React from 'react';
import {
    SearchPanel,
    MastersToolbar,
    MasterList,
    Slider,
    JoinSection,
    HelpSection,
    BannerContainer,
} from '@/components';
import { Main, AppLayout } from '@/layouts';
import styles from './index.module.scss';
import type { HomeProps } from '@/pages/Home/index.model.ts';

const Home: React.FC<HomeProps> = () => {
    return (
        <AppLayout showAuthButtons={true}>
            <Main>
                <div className={styles.hero}>
                    <div className="container _h-100">
                        <BannerContainer />
                    </div>
                    <SearchPanel title="Найди своего мастера ногтевого сервиса максимально быстро и удобно." />
                </div>

                <div className="bg-white">
                    <div className="container">
                        <div className={styles.wrappToolbar}>
                            <MastersToolbar />
                        </div>
                    </div>
                    <div className="container">
                        <MasterList />
                    </div>
                </div>

                <div className="bg-light-pink">
                    <div className="container">
                        <Slider />
                    </div>
                </div>

                <div className="bg-white">
                    <div className="container">
                        <JoinSection />
                    </div>
                </div>

                <div className="bg-purple">
                    <div className="container">
                        <HelpSection />
                    </div>
                </div>
            </Main>
        </AppLayout>
    );
};

export { Home };
