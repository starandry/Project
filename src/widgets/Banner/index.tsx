import React from 'react';
import { useBanner } from './model/useBanner';
import { Banner } from './UI/Banner';

const BannerContainer: React.FC = () => {
    const { userType, handleUserTypeChange } = useBanner();

    return (
        <Banner
            title="Твой мастер маникюра"
            subtitle="Онлайн-запись, напоминания клиентам и ведение клиентской базы для профессионалов индустрии красоты"
            description="один сервис - много возможностей"
            activeUserType={userType}
            onUserTypeChange={handleUserTypeChange}
        />
    );
};

export { BannerContainer };
