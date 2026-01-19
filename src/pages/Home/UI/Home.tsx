import React, { useState } from 'react';
import { SearchPanel } from '@/features/search';
import {
    AppLayout,
    Main,
    MastersToolbar,
    MasterList,
    MastersMap,
    Slider,
    JoinSection,
    HelpSection,
    BannerContainer,
} from '@/widgets';
import type { ViewMode } from '@/widgets';
import styles from './index.module.scss';
import type { HomeProps } from '@/pages/Home/index.model.ts';

const Home: React.FC<HomeProps> = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <AppLayout showAuthButtons={true}>
            <Main className="main">
                <div className={styles.hero}>
                    <div className="container _h-100">
                        <BannerContainer />
                    </div>
                </div>
                <SearchPanel title="Найди своего мастера ногтевого сервиса максимально быстро и удобно." />
                <div className="bg-white">
                    <div className="container">
                        <MastersToolbar viewMode={viewMode} onViewModeChange={setViewMode} />
                    </div>
                    <div className="container">
                        {viewMode === 'list' ? <MasterList /> : <MastersMap />}
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
